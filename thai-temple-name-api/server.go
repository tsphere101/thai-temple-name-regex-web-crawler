package main

import (
	"fmt"
	"os"
	"os/exec"

	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()

	r.GET("/", func(ctx *gin.Context) {
		ctx.String(200, `visit /temples to get data <a href="/temples"></a>`)
	})

	r.GET("/temples", func(ctx *gin.Context) {
		// Run crawler python script
		output, err := exec.Command("python", "..\\crawler\\main.py").Output()
		if err != nil {
			fmt.Println(err)
		}
		fmt.Println(string(output))

		// Read csv file
		raw_data, err := os.ReadFile("../temples.csv")
		if err != nil {
			fmt.Println(err)
		}

		ctx.String(200, string(raw_data))

	})
	fmt.Println("Server is running on http://localhost:8080")
	r.Run(":8080") // listen and serve on
}
