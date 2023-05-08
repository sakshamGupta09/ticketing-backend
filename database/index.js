const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "",
  port: "",
  database: "",
  user: "",
  password: "",
});

module.exports = pool.promise();
