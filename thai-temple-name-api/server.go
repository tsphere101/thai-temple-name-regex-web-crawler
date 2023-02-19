package main

import (
	"encoding/csv"
	"fmt"
	"net/http"
	"os"
	"os/exec"
	"strings"

	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()

	r.GET("/", func(ctx *gin.Context) {
		ctx.String(200, `
visit /temples to get data
Example: /temples?province=kalasin&province=kamphaengphet		

visit /download to download csv file
Example: /download?province=kalasin&province=kamphaengphet
to download all data, just leave the query empty

Available provinces:
kalasin, kamphaengphet, khonkaen, jantaburi
		`)
	})

	r.GET("/temples", func(ctx *gin.Context) {
		/*
		* kalasin, kamphaengphet, khonkaen, jantaburi
		*
		 */

		// Get query params
		queryProvinces := ctx.QueryArray("province")
		fmt.Println("request for :", queryProvinces)

		// Run crawler python script
		output, err := exec.Command("python", "..\\crawler\\main.py").Output()
		if err != nil {
			fmt.Println(err)
		}
		fmt.Println(string(output))

		// Read csv file
		payload := ""
		for _, province := range queryProvinces {
			// Read province file
			raw_data, err := os.ReadFile(fmt.Sprintf("../%s.csv", province))
			if err != nil {
				fmt.Println(err)
			}

			// Append to payload
			payload += string(raw_data)
		}

		// If the query is empty, return all data
		if len(queryProvinces) == 0 {
			raw_data, err := os.ReadFile("../temples.csv")
			if err != nil {
				fmt.Println(err)
			}
			payload = string(raw_data)
		}

		ctx.String(http.StatusOK, string(payload))

	})

	// Download csv file
	r.GET("/download", func(ctx *gin.Context) {
		// TODO : join the query provinces csv file into one file
		// response the file to download, and delete the file
		// after download

		// Get query params
		queryProvinces := ctx.QueryArray("province")

		fmt.Println("Requesting for download : ", queryProvinces)

		// Join csv files
		filename := strings.Join(queryProvinces, "-") + "-export" + ".csv"
		if len(queryProvinces) == 0 {
			filename = "all-temples-export.csv"
		}
		output, err := os.Create("../" + filename)
		if err != nil {
			fmt.Println(err)
		}
		writer := csv.NewWriter(output)
		for _, province := range queryProvinces {
			file, err := os.Open(fmt.Sprintf("../%s.csv", province))
			if err != nil {
				fmt.Println(err)
			}
			reader := csv.NewReader(file)
			for {
				record, err := reader.Read()
				if err != nil {
					break
				}
				writer.Write(record)
			}
			file.Close()
		}

		output.Close()
		writer.Flush()

		// Response download, with filename
		ctx.Header("Content-Disposition", "attachment; filename="+filename)

		// Response file
		if len(queryProvinces) != 0 {
			ctx.File("../" + filename)
		} else {
			// If the query is empty, return all data
			ctx.File("../temples.csv")
		}
	})

	fmt.Println("Server is running on http://localhost:8080")
	r.Run(":8080") // listen and serve on
}
