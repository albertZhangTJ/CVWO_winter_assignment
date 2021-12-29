package main

import (
	"net/http"
	"strconv"
	"sync"
)

func init_listener(wg *sync.WaitGroup, port int) {
	http.HandleFunc("/login", login)
	http.HandleFunc("/register", register)
	http.HandleFunc("/logout", logout)
	http.HandleFunc("/view_month", view_month)
	http.HandleFunc("/view_day", view_day)
	//http.HandleFunc("/create_event", create_event)

	http.ListenAndServe(":"+strconv.Itoa(port), nil)
	defer wg.Done()
}
