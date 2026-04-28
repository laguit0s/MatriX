const mysql = require('mysql2/promise');
require('dotenv').config();

// Conexão única com o banco usando variáveis de ambiente.
const connection = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  connectionLimit: process.env.MAX_CONNECTIONS
});

module.exports = connection;