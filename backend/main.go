package main

import (
	"fmt"
)

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
