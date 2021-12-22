package main

func remove_user(s []user, i int) []user {
	s[i] = s[len(s)-1]
	return s[:len(s)-1]
}
