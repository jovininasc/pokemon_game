const myslq = require('mysql2/promise');

require('dotenv').config();

const connection = myslq.createPool({
    port: process.env.PORT,
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB
});

module.exports = connection;