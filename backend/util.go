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

func parse_to_line(inp string) []string {
	var ans []string
	var temp string = ""
	for i := 0; i < len(inp); i++ {
		if inp[i] == '\n' {
			ans = append(ans, temp)
			temp = ""
		} else {
			temp = temp + string(inp[i])
		}
	}
	if len(temp) != 0 {
		ans = append(ans, temp)
	}
	return ans
}

func parse_line(inp string) []string {
	var ans []string
	var temp string = ""
	for i := 0; i < len(inp); i++ {
		if inp[i] == '|' {
			ans = append(ans, temp)
			temp = ""
		} else {
			temp = temp + string(inp[i])
		}
	}
	if len(temp) != 0 {
		ans = append(ans, temp)
	}
	return ans
}

func line_to_vevent(line []string) string {
	var ans string = "BEGIN: VEVENT\n"
	ans = ans + "UID: " + string(line[0]) + "\n"
	ans = ans + "SUMMARY: " + string(line[2]) + "\n"
	ans = ans + "DTSTAMP: " + string(line[3]) + "\n"
	ans = ans + "ORGANIZER: " + string(line[6]) + "\n"
	ans = ans + "MAILTO: " + string(line[7]) + "\n"
	ans = ans + "DTSTART: " + string(line[4]) + "\n"
	ans = ans + "DTEND: " + string(line[5]) + "\n"
	ans = ans + "DESCRIPTION: " + string(line[8]) + "\n"
	ans = ans + "END: VEVENT\n"
	return ans
}
