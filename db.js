// Database connection to the legacy parts database at NIU
// Uses SSL since we're connecting from outside the NIU network

const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'blitz.cs.niu.edu',
  port: 3306,
  user: 'student',
  password: 'student',
  database: 'csci467',
  ssl: { rejectUnauthorized: false }, // required for external access
  waitForConnections: true,
  connectionLimit: 10,
});

module.exports = pool;
