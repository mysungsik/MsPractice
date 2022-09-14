const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: '127.0.0.1',
  database: 'security',
  user: 'root',
  password: '3307',
  multipleStatements: true
})

module.exports = pool;