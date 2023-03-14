package main

import (
	"encoding/csv"
	"fmt"
	"net/http"
	"os"
	"os/exec"
	"strings"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()

	config := cors.DefaultConfig()
	config.AllowAllOrigins = true
	r.Use(cors.New(config))

	ALL_PROVINCE := []string{"kalasin", "kamphaengphet", "jantaburi", "khonkaen"}

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
		fmt.Println("queryProvinces:", queryProvinces)

		if len(queryProvinces) == 0 {
			queryProvinces = ALL_PROVINCE
		}

		// Run crawler python script
		crawlerScriptPath := "../crawler/main.py"
		arg := []string{crawlerScriptPath, "-p", strings.Join(queryProvinces, ",")}
		out, err := exec.Command("python", arg...).Output()
		if err != nil {
			fmt.Println(err)
		}
		fmt.Println(string(out))

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

		names := strings.Split(payload, "\n")
		names = names[:len(names)-1]

		ctx.JSON(http.StatusOK, names)

	})

	// Download csv file
	r.GET("/download", func(ctx *gin.Context) {
		// TODO: join the query provinces csv file into one file
		// response the file to download, and delete the file
		// after download

		// Get query params
		queryProvinces := ctx.QueryArray("province")
		fmt.Println("queryProvinces are ", queryProvinces)

		// Join csv files
		filename := strings.Join(queryProvinces, "-") + "-export" + ".csv"

		// if the query is empty, export all provinces
		if len(queryProvinces) == 0 {
			filename = "all-temples-export.csv"
			queryProvinces = ALL_PROVINCE
		}

		fmt.Println("Requesting for download : ", queryProvinces)

		// Call python script to generate each province csv files
		crawlerScriptPath := "../crawler/main.py"
		arg := []string{crawlerScriptPath, "-p", strings.Join(queryProvinces, ",")}
		out, err := exec.Command("python", arg...).Output()
		if err != nil {
			fmt.Println("err:", err)
		}
		fmt.Println("out:", string(out))

		output, err := os.Create("../" + filename)
		if err != nil {
			fmt.Println(err)
		}
		writer := csv.NewWriter(output)
		writer.UseCRLF = true
		writer.Write([]string{string('\uFEFF')}) // Write the UTF-8 BOM to the beginning of the file to help with Excel compatibility
		for _, province := range queryProvinces {
			file, err := os.Open(fmt.Sprintf("../%s.csv", province))
			if err != nil {
				fmt.Println(err)
			}
			reader := csv.NewReader(file)
			reader.Comma = ';'
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

		// Response download, with filename and UTF-8 encoding
		ctx.Header("Content-Type", "text/csv; charset=utf-8")
		ctx.Header("Content-Disposition", "attachment; filename="+filename)

		// Response file
		// if len(queryProvinces) != 0 {
		// 	ctx.File("../" + filename)
		// } else {
		// If the query is empty, return all data
		// ctx.File("../temples.csv")
		// }
		ctx.File("../" + filename)

	})

	fmt.Println("Server is running on http://localhost:3000")
	r.Run(":3000") // listen and serve on
}
