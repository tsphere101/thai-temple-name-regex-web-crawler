package csvjson

import (
	"encoding/csv"
	"encoding/json"
	"io"
	"strings"
)

// ConvertString converts a string to a JSON string
func ConvertString(csvString string) (string, error) {
	r := strings.NewReader(csvString)
	return Convert(r)
}

// Convert converts a CSV file to a JSON string
func Convert(r io.Reader) (string, error) {
	// Read CSV
	reader := csv.NewReader(r)
	reader.FieldsPerRecord = -1
	csvData, err := reader.ReadAll()
	if err != nil {
		return "", err
	}

	// Convert CSV to JSON
	jsonData, err := json.Marshal(csvData)
	if err != nil {
		return "", err
	}

	return string(jsonData), nil
}
