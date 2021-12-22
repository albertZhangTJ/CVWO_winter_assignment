package main

import (
	"fmt"
	"sync"
)

var lck sync.Mutex
var min_since_start int = 0 //application-wide clock, used for handling timeout etc.
var logged_users []user

func main() {
	fmt.Println("Starting backend for CVWO winter assignment")
	//go printer()
	for true {
		if len(events) != 0 {
			fmt.Println(events[0])
			events = events[1:]
		}
	}
}
