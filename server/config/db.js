const mysql = require('mysql');

const pool = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  connectionLimit: 10
});
pool.connect(function (err) {
  if (err) throw err;
  console.log("Database connected ✔️");
});

module.exports = pool;