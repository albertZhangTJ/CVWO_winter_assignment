package main

import (
	"bytes"
	"net/http"
	"strings"
)

//This function is called when a user adds an event
//http request body: session_id,VCALENDAR
//http response body: Number of events added
func create_event(w http.ResponseWriter, req *http.Request) {
	w.Header().Set("Content-Type", "text/plain; charset=UTF-8")

	buf := new(bytes.Buffer)
	buf.ReadFrom(req.Body)
	var content string = buf.String()

	data := strings.SplitAfter(content, ",")

	var ssid string = data[0]
	var payload string = data[1]
	ssid = ssid[:len(ssid)-1]

	var username string = ""
	lck.Lock()
	for i := 0; i < len(logged_users); i++ {
		if logged_users[i].session_id == ssid {
			username = logged_users[i].username
			break
		}
	}
	lck.Unlock()

	if username == "" {
		w.WriteHeader(http.StatusForbidden)
		w.Write([]byte("User appears to be not logged in"))
		return
	}

	var parsed_payload [][]string = vcalendar_parser(payload)
	for i := 0; i < len(parsed_payload); i++ {
		execute_sql("INSERT INTO events (username, eventname, dtstamp, dtstart, dtend, organizer, mailto, memo) VALUES ('"+username+"','"+parsed_payload[i][2]+"','"+parsed_payload[i][3]+"','"+parsed_payload[i][4]+"','"+parsed_payload[i][5]+"','"+parsed_payload[i][6]+"','"+parsed_payload[i][7]+"','"+parsed_payload[i][8]+"');", 0, false)

	}

	w.WriteHeader(http.StatusOK)
	w.Write([]byte(string(len(parsed_payload)) + " events added"))
}
