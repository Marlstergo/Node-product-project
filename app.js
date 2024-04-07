require("dotenv").config()
const express = require("express")
const notFound = require("./middleware/not-found")
const errorHandlerMiddleware = require("./middleware/error-handler")
const connectDB = require("./db/connect")

const app = express()

// routes
app.get("/", (req, res) => {
    res.send("Hello World")
})

// product routes
app.get("/api/v1/products", (req, res) => {
    res.send("Products")
})

const port = process.env.PORT || 3000

const start = async () => {
  try {
      console.log("connecting db")
      await connectDB(process.env.CONNECTION_STRING)
      app.listen(port, () => {
          console.log(`Database connected`)
          console.log(`Server is running on port ${port}`)
      })
  } catch (error) {
      console.log(error)
  }
}

start()

app.use(notFound)
app.use(errorHandlerMiddleware)
