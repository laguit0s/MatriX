const conn = require('../config/db');

function buscarAlunos() {
  return new Promise((resolve, reject) => {
    conn.query('SELECT * FROM alunos', (error, rows) => {
      if (error) {
        return reject(error);
      }
      resolve(rows);
    })
  })
}

module.exports = buscarAlunos;