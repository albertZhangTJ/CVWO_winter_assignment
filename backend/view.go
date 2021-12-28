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

	var yr string = ""
	var mnth string = ""

	if len(time) == 6 {
		yr = string(time[2]) + string(time[3]) + string(time[4]) + string(time[5])
		mnth = string(time[0]) + string(time[1])
	} else {
		yr = string(time[0]) + string(time[1]) + string(time[2]) + string(time[3])
		mnth = string(time[5]) + string(time[6])
	}

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

	var query string = execute_sql("SELECT * FROM events WHERE username='"+username+"';", 10, true)

	if len(query) == 0 {
		w.WriteHeader(http.StatusOK)
		return
	}

	var resp string = ""
	var qrows []string = parse_to_line(query)

	for i := 0; i < len(qrows); i++ {
		var line []string = parse_line(qrows[i])
		var dtstart string = line[3]
		var dtend string = line[4]
		dtstart_yr := string(dtstart[0]) + string(dtstart[1]) + string(dtstart[2]) + string(dtstart[3])
		dtstart_mnth := string(dtstart[5]) + string(dtstart[6])
		dtend_yr := string(dtend[0]) + string(dtend[1]) + string(dtend[2]) + string(dtend[3])
		dtend_mnth := string(dtend[5]) + string(dtend[6])
		if (dtstart_yr == yr && dtstart_mnth == mnth) || (dtend_yr == yr && dtend_mnth == mnth) {
			if line[10] != "Y" {
				resp = resp + line_to_vevent(line) + "\n"
			}
		}

	}
	w.WriteHeader(http.StatusOK)
	w.Write([]byte(resp))
}

//This function handles view requests for a day
//http request body: session_id,<RFC3339 format string || mmddyyyy>
//http response body: A series of VEVENT objects (as defined in ics format), separated by empty lines
func view_day(w http.ResponseWriter, req *http.Request) {
	w.Header().Set("Content-Type", "text/plain; charset=UTF-8")

	buf := new(bytes.Buffer)
	buf.ReadFrom(req.Body)
	var content string = buf.String()

	data := strings.SplitAfter(content, ",")
	var ssid string = data[0]
	var time string = data[1] //notice this is asserted to be a hashed string
	time = time[:len(time)-1]

	var yr string = ""
	var mnth string = ""
	var dt string = ""

	if len(time) == 8 {
		yr = string(time[4]) + string(time[5]) + string(time[6]) + string(time[7])
		mnth = string(time[0]) + string(time[1])
		dt = string(time[2]) + string(time[3])
	} else {
		yr = string(time[0]) + string(time[1]) + string(time[2]) + string(time[3])
		mnth = string(time[5]) + string(time[6])
		dt = string(time[8]) + string(time[9])
	}

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

	var query string = execute_sql("SELECT * FROM events WHERE username='"+username+"';", 10, true)

	if len(query) == 0 {
		w.WriteHeader(http.StatusOK)
		return
	}

	var resp string = ""
	var qrows []string = parse_to_line(query)

	for i := 0; i < len(qrows); i++ {
		var line []string = parse_line(qrows[i])
		var dtstart string = line[3]
		var dtend string = line[4]
		dtstart_yr := string(dtstart[0]) + string(dtstart[1]) + string(dtstart[2]) + string(dtstart[3])
		dtstart_mnth := string(dtstart[5]) + string(dtstart[6])
		dtstart_dt := string(dtstart[7]) + string(dtstart[8])
		dtend_yr := string(dtend[0]) + string(dtend[1]) + string(dtend[2]) + string(dtend[3])
		dtend_mnth := string(dtend[5]) + string(dtend[6])
		dtend_dt := string(dtend[7]) + string(dtend[8])
		if (dtstart_yr == yr && dtstart_mnth == mnth && dtstart_dt == dt) || (dtend_yr == yr && dtend_mnth == mnth && dtend_dt == dt) {
			if line[10] != "Y" {
				resp = resp + line_to_vevent(line) + "\n"
			}
		}

	}
	w.WriteHeader(http.StatusOK)
	w.Write([]byte(resp))
}
