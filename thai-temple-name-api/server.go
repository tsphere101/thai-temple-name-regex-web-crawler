package main

import (
	"fmt"
	"net/http"
	"os"
	"os/exec"

	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()

	r.GET("/", func(ctx *gin.Context) {
		ctx.String(200, `
visit /temples to get data
Example: /temples?province=kalasin&province=kamphaengphet		

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
	fmt.Println("Server is running on http://localhost:8080")
	r.Run(":8080") // listen and serve on
}
