const express = require('express')
const app = express()
const mysql = require('mysql')
require("dotenv").config();

app.use(express.json())

const port = process.env.PORT || 4000;


app.listen(port, () => {
  console.log("server running on PORT :", port + ' 🛠');
});