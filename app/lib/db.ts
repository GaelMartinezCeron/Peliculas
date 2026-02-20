import mysql from "mysql2/promise"

export const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "netflix_db",
  waitForConnections: true,
  connectionLimit: 10
})