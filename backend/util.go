package main

import (
	"sync"
	"time"
)

//Notice that this does not keep the order of the rest of the list unchanged
//However, the order of the list before the point of remove is preserved
func remove_user(s []user, i int) []user {
	s[i] = s[len(s)-1]
	return s[:len(s)-1]
}

func time_flow(wg *sync.WaitGroup) {
	for true {
		time.Sleep(time.Second * 60)
		lck.Lock()
		min_since_start++
		lck.Unlock()
	}
	defer wg.Done()
}
