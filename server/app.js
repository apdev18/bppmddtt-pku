const express = require('express')
const app = express()
const mysql = require('mysql')
const fileUpload = require('express-fileupload')
require("dotenv").config()

const cors = require('cors')
const corsOptions = {
  origin: process.env.CORS_URLS,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  credentials: true,            //access-control-allow-credentials:true
  optionSuccessStatus: 200
}
app.use(cors(corsOptions))

app.use(express.json())

app.use(
  fileUpload({
    limits: {
      fileSize: 5000000,
    },
    abortOnLimit: true,
  })
)

app.use(express.static('storage/images'))

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log("server running on PORT :", port + ' 🛠')
})

