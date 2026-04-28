const conn = require('../config/db');
const format = require('../utils/format.data');

async function getAlunos() {
  let [rows] = await conn.query('SELECT * FROM alunos');
  rows.forEach(row => {
    row.telefone = format.phone(row.telefone);
    row.cpf = format.CPF(row.cpf);
    row.data_nascimento = format.date(row.data_nascimento);
    row.data_matricula = format.date(row.data_matricula);
  })
  return rows;
}

async function postAluno(body) {
  await conn.execute('INSERT INTO alunos (nome, cpf, data_nascimento, email, telefone) VALUES (?, ?, ?, ?, ?)', [body.nome, body.cpf, body.data_nascimento, body.email, body.telefone]);
}

async function getAlunoProfile(id) {
  const [rows] = await conn.execute('SELECT * FROM alunos WHERE ID = ?', [id]);
  const row = rows[0];

  row.telefone = format.phone(row.telefone);
  row.cpf = format.CPF(row.cpf);
  row.data_nascimento = format.date(row.data_nascimento);
  row.data_matricula = format.date(row.data_matricula);

  return row;
}

module.exports = {
  getAlunos,
  postAluno,
  getAlunoProfile
};