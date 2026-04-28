const conn = require('../config/db');
const format = require('../utils/format.data');

function getAlunos() {
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

async function postAluno(body) {
  new Promise((resolve, reject) => {
    conn.query(`INSERT INTO alunos (nome, cpf, data_nascimento, email, telefone) VALUES ('${body.nome}', '${body.cpf}', '${body.data_nascimento}', '${body.email}', '${body.telefone}')`, (error, rows) => {
      if (error) {
        return reject(error);
      }
      resolve();
    });
  }) 
}

module.exports = {
  getAlunos,
  postAluno
};