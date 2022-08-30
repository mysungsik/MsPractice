// 데이터베이스에 연결  [sql2]
// 데이터베이스 주소에 정확하게
const mysql = require("mysql2/promise")

const pool = mysql.createPool({
    host : "127.0.0.1",
    port:"3306",
    database: "blog",
    user: "root",
    password: "3307"
});

module.exports = pool;
