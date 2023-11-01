/* eslint-disable no-undef */
const mysql = require("mysql");
const dotenv = require("dotenv");

dotenv.config();
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  // database: process.env.DB_NAME,
});

// Connettiti al database
db.connect((err) => {
  if (err) {
    console.error("Errore nella connessione al database:", err);
    return;
  }
  console.log("Connesso al database MySQL");
});

module.exports = db;
