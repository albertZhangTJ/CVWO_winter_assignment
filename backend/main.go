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
	var wg sync.WaitGroup

	wg.Add(1)
	go time_flow(&wg)

	wg.Add(1)
	go expirer(&wg)

	wg.Add(1)
	go init_listener(&wg, 8080)

	wg.Wait()

}
