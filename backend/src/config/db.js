const mysql = require('mysql2');
require('dotenv').config();

// Conexão única com o banco usando variáveis de ambiente.
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

// Faz a conexão no bootstrap da API para falhar cedo se houver problema de credenciais/rede.
connection.connect((error) => {
  if (error) {
    throw error;
  }

  // console.log('Conectado ao banco de Dados MySQL.');
});

module.exports = connection;