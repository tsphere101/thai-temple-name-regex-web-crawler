package main

import (
	"fmt"
	"os"
	"os/exec"

	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()

	r.GET("/", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "homepage",
		})
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
	r.Run(":8080") // listen and serve on
}
