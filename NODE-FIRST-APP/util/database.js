const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'node-course',
    password: 'Kkk0567109909'
});

module.exports = pool.promise();