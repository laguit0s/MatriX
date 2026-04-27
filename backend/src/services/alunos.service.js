const conn = require('../config/db');
const format = require('../utils/format.data');

function buscarAlunos() {
  return new Promise((resolve, reject) => {
    conn.query('SELECT * FROM alunos', (error, rows) => {
      if (error) {
        return reject(error);
      }

      rows.forEach(row => {
        row.cpf = format.CPF(row.cpf);
        row.data_nascimento = format.date(row.data_nascimento);
        row.data_matricula = format.date(row.data_matricula);
        row.telefone = format.phone(row.telefone);
      })

      resolve(rows);
    })
  })
}

module.exports = buscarAlunos;