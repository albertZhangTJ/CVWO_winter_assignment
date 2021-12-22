package main

import (
	"database/sql"

	_ "github.com/go-sql-driver/mysql"
)

func execute_sql(cmd string) string {

	//In actual engineering setup this should not be hard-coded
	//But I really don't wanna go through the trouble of having this thing setup in a separate config file
	db, err := sql.Open("mysql", "CVWO:cvwo_winter_assignment@/cvwo_winter_assignment")

	return ""
}
