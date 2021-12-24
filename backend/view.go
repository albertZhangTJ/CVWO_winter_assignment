package main

import (
	"bytes"
	"net/http"
	"strings"
)

//This function handles view requests for a whole month
//http request body: session_id,<RFC3339 format string || mmyyyy>
//http response body: A series of VEVENT objects (as defined in ics format), separated by empty lines
func view_month(w http.ResponseWriter, req *http.Request) {
	w.Header().Set("Content-Type", "text/plain; charset=UTF-8")

	buf := new(bytes.Buffer)
	buf.ReadFrom(req.Body)
	var content string = buf.String()

	data := strings.SplitAfter(content, ",")
	var ssid string = data[0]
	var time string = data[1] //notice this is asserted to be a hashed string
	time = time[:len(time)-1]

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
}
