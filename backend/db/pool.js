const mysql2 = require("mysql2")

console.log("MYSQLHOST =", process.env.MYSQLHOST)
console.log("MYSQLUSER =", process.env.MYSQLUSER)
console.log("MYSQLDATABASE =", process.env.MYSQLDATABASE)
console.log("MYSQLPORT =", process.env.MYSQLPORT)

const pool = mysql2.createPool({
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  port: Number(process.env.MYSQLPORT),
  waitForConnections: true,
  connectionLimit: 10
})

module.exports = pool