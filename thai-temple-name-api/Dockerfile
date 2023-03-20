FROM golang:1.20.2-alpine3.17

WORKDIR /app

COPY go.mod .
COPY go.sum .

RUN go mod download

COPY . .

RUN go build -o ./out/dist .

CMD [ "./out/dist" ]