const mysql = require('mysql2/promise');
require('dotenv').config();

// configuracao do pool de conexao com banco de dados
const connection = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  connectionLimit: process.env.MAX_CONNECTIONS
});

module.exports = connection;