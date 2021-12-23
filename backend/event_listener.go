package main

import (
	"net/http"
)

var events []string

/*
func printer() {
	for i := 0; i < 10; i++ {
		var resp string = "This is the " + strconv.Itoa(i) + " message"
		events = append(events, resp)
		time.Sleep(time.Second)
	}
}
*/

func init_listener(port int) {
	http.HandleFunc("/login", login)
	http.HandleFunc("register", register)
	http.HandleFunc("/logout", logout)
	//http.HandleFunc("/view_month", view_month)
	//http.HandleFunc("/view_day", view_day)
	//http.HandleFunc("/create_event", create_event)
}
