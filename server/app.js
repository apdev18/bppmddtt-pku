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


// Migrasi tabel
const con = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  connectionLimit: 10
})


// // Tambah tabel pengguna
// con.connect(function (err) {
//   if (err) throw err;
//   console.log("Connected!");
//   const sql = "CREATE TABLE users (userId VARCHAR(255) NOT NULL PRIMARY KEY, userName VARCHAR(255), email VARCHAR(255), department VARCHAR(255), password VARCHAR(255), profileImg VARCHAR(255), status BOOLEAN NOT NULL DEFAULT true, admin BOOLEAN NOT NULL DEFAULT false, createdAt date, updatedAt date, CONSTRAINT contact_name_unique UNIQUE (email, userName))";
//   con.query(sql, function (err, result) {
//     if (err) throw err;
//     console.log("Tabel telah ditambahkan")
//   })
// })

// tambah tabel kategori
// con.connect(function (err) {
//   if (err) throw err;
//   console.log("Connected!");
//   const sql = "CREATE TABLE category (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, categoryName VARCHAR(255), status BOOLEAN NOT NULL DEFAULT 1, isPrimary BOOLEAN NOT NULL DEFAULT 0, createdAt date, updatedAt date)";
//   con.query(sql, function (err, result) {
//     if (err) throw err;
//     console.log("Tabel telah ditambahkan")
//   })
// })

// tambah tabel departemen
// con.connect(function (err) {
//   if (err) throw err;
//   console.log("Connected!");
//   const sql = "CREATE TABLE department (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, departmentName VARCHAR(255), createdAt date, updatedAt date)";
//   con.query(sql, function (err, result) {
//     if (err) throw err;
//     console.log("Tabel telah ditambahkan")
//   })
// })

// tambah tabel surat
// con.connect(function (err) {
//   if (err) throw err;
//   console.log("Connected!");
//   const sql = "CREATE TABLE letters (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, issuedDate DATE, registerPostId VARCHAR(255), letterFrom VARCHAR(255), subject VARCHAR(255), department VARCHAR(255), status VARCHAR(255), priority VARCHAR(255), description VARCHAR(255), createdAt DATE, updatedAt DATE)";
//   con.query(sql, function (err, result) {
//     if (err) throw err;
//     console.log("Tabel telah ditambahkan")
//   })
// })

// tambah tabel reply
// con.connect(function (err) {
//   if (err) throw err;
//   console.log("Connected!");
//   const sql = "CREATE TABLE replies (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, letterId INT, reply VARCHAR(255), status VARCHAR(255), user VARCHAR(255), department VARCHAR(255), createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP)";
//   con.query(sql, function (err, result) {
//     if (err) throw err;
//     console.log("Tabel telah ditambahkan")
//   })
// })

// DATA SEEDERS
// Insert data into tabel pengguna
// con.connect(function (err) {
//   if (err) throw err;
//   console.log("Connected!");
//   const sql = "INSERT INTO users (userName, email, department, password, profileImg, status, admin) VALUES ('algaprananda','apdevs@icloud.com', 'superAdmin', 'apdevs', 'https://infocliq.net/assets/img/icons/favicon.png', true, true)";
//   con.query(sql, function (err, result) {
//     if (err) throw err;
//     console.log("Data berhasil ditambahkan")
//   })
// })