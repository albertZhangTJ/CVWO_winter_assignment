package main

import (
	"fmt"
	"strconv"
	"strings"
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
	fmt.Println("parse to line: " + inp)
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

func vcalendar_parser(inp string) [][]string {
	var ans [][]string
	var lines []string = parse_to_line(inp)
	fmt.Println("vcalendar_parser lines length: " + strconv.Itoa(len(lines)))
	for i := 0; i < len(lines); i++ {
		fmt.Println("vcalendar_parser: i line " + strconv.Itoa(i) + "  " + lines[i])
		if lines[i] == "BEGIN: VEVENT" || lines[i] == "BEGIN:VEVENT" {
			var line_content [9]string
			for j := i + 1; j < len(lines); j++ {
				fmt.Println("vcalendar_parser: j line " + strconv.Itoa(j) + "  " + lines[j])
				if len(lines[j]) > 8 && strings.ToUpper(lines[j][0:8]) == "SUMMARY:" {
					line_content[2] = lines[j][8:]
				}
				if len(lines[j]) > 8 && strings.ToUpper(lines[j][0:8]) == "DTSTAMP:" {
					line_content[3] = lines[j][8:]
				}
				if len(lines[j]) > 8 && strings.ToUpper(lines[j][0:8]) == "DTSTART:" {
					line_content[4] = lines[j][8:]
				}
				if len(lines[j]) > 6 && strings.ToUpper(lines[j][0:6]) == "DTEND:" {
					line_content[5] = lines[j][6:]
				}
				if len(lines[j]) > 10 && strings.ToUpper(lines[j][0:10]) == "ORGANIZER:" {
					line_content[6] = lines[j][10:]
				}
				if len(lines[j]) > 7 && strings.ToUpper(lines[j][0:7]) == "MAILTO:" {
					line_content[7] = lines[j][7:]
				}
				if len(lines[j]) > 12 && strings.ToUpper(lines[j][0:12]) == "DESCRIPTION:" {
					line_content[8] = lines[j][12:]
				}
				if lines[j] == "END: VEVENT" || lines[j] == "END:VEVENT" {
					ans = append(ans, line_content[:])
					i = j
					break
				}
			}
		}
	}
	return ans
}

func split_after_first_comma(inp string) []string {
	var ans []string
	var splited bool = false
	var temp string = ""
	for i := 0; i < len(inp); i++ {
		if !splited && inp[i] == ',' {
			fmt.Print("split after first comma: " + temp)
			ans = append(ans, temp)
			temp = ""
			splited = true
		} else {
			temp = temp + string(inp[i])
		}
	}
	fmt.Println("," + temp)
	ans = append(ans, temp)
	return ans
}

func parsed_vcalendar_to_string(parsed [][]string) string {
	var ans string = ""
	for i := 0; i < len(parsed); i++ {
		for j := 0; j < len(parsed[i]); j++ {
			ans = ans + parsed[i][j] + "|"
		}
		ans = ans + "\n"
	}
	return ans
}

func contains_only_valid(inp string) bool {
	for i := 0; i < len(inp); i++ {
		if !(inp[i] > 'a' && inp[i] < 'z') && !(inp[i] > 'A' && inp[i] < 'Z') && !(inp[i] > '0' && inp[i] < '9') {
			return false
		}
	}
	return true
}
