const mysql = require("mysql2/promise");
const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "full_stack01",
  port: 3306,
  connectionLimit: 10,
  namedPlaceholders: true,
});

module.exports = db;
