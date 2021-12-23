package main

import (
	"database/sql"

	_ "github.com/go-sql-driver/mysql"
)

func execute_sql(cmd string, res_col int, is_query bool) string {

	//In actual engineering setup this should not be hard-coded
	//But I really don't wanna go through the trouble of having this thing setup in a separate config file
	db, err := sql.Open("mysql", "CVWO:cvwo_winter_assignment@/cvwo_winter_assignment")

	if is_query {
		rows, _ := db.Query(cmd)
		var ans string = ""
		for rows.Next() {
			var row_content []string
			rows.Scan(&row_content)

			for i := 0; i < len(row_content); i++ {
				ans = ans + row_content[i] + "|"
			}
			ans = ans + "\n"
		}
		return ans
	}

	res, err := db.Exec(cmd)
	if err != nil {
		res.LastInsertId() //dummy
		return err.Error()
	}
	return "OK"
}
