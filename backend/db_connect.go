package main

import (
	"database/sql"

	_ "github.com/go-sql-driver/mysql"
)

func execute_sql(cmd string, res_col int, is_query bool) string {

	//In actual engineering setup this should not be hard-coded
	//But I really don't wanna go through the trouble of having this thing setup in a separate config file
	db, err := sql.Open("mysql", "CVWO:cvwo_winter_assignment@/cvwo_winter_assignment")
	defer db.Close()

	if is_query {
		rows, _ := db.Query(cmd)
		var ans string = ""
		cols, err := rows.Columns()
		if err != nil {
			return ("Failed to get columns" + err.Error())
		}

		// Result is your slice string.
		rawResult := make([][]byte, len(cols))

		dest := make([]interface{}, len(cols)) // A temporary interface{} slice
		for i, _ := range rawResult {
			dest[i] = &rawResult[i] // Put pointers to each string in the interface slice
		}

		for rows.Next() {
			err = rows.Scan(dest...)
			if err != nil {
				return ("Failed to get columns" + err.Error())
			}

			for i, raw := range rawResult {
				i++
				if raw == nil {
					ans = ans + "NULL" + "|"
				} else {
					ans = ans + string(raw) + "|"
				}
			}
			ans = ans + "\n"
		}
		return ans
	}

	res, err := db.Exec(cmd)
	if err != nil {
		res = res //dummy
		return err.Error()
	}
	return "OK"
}
