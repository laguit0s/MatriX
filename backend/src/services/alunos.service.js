// importacoes de banco de dados e formatacao
const conn = require('../config/db');
const format = require('../utils/format.data');

// busca todos os alunos e formata os dados principais
async function getAlunos() {
  let [rows] = await conn.query('SELECT * FROM alunos ORDER BY nome ASC');
  rows.forEach(row => {
    row.telefone = format.phone(row.telefone);
    row.cpf = format.CPF(row.cpf);
    row.data_nascimento = format.date(row.data_nascimento);
    row.data_matricula = format.date(row.data_matricula);
  })
  return rows;
}

// insere novo aluno no banco de dados com parametros seguros
async function postAluno(body) {
  console.log(body);

  const anoAtual = new Date().getFullYear();

  const [rowTurmas] = await conn.execute('SELECT numero FROM turmas WHERE id = ?', [body.turma]);
  const [rowAlunos] = await conn.execute('SELECT COUNT(*) AS total FROM matriculas WHERE id_turma = ?', [body.turma]);
  const [rowSigla] = await conn.execute('SELECT cod FROM cursos WHERE id = ?', [body.curso]);

  const numeroTurma = rowTurmas[0].numero;
  let totalAlunos = rowAlunos[0].total + 1;
  const sigla = rowSigla[0].cod;
  
  if (totalAlunos <= 0) {
    totalAlunos = 1;
  }

  const nomeMatricula = `${anoAtual}.${String(numeroTurma).padStart(2, '0')}.${sigla}.${String(totalAlunos).padStart(3, '0')}`;

  const [result] = await conn.execute(`INSERT INTO alunos (nome, cpf, data_nascimento, email, telefone) VALUES (?, ?, STR_TO_DATE(?, '%d/%m/%Y'), ?, ?)`, [body.nome, body.cpf, body.data_nascimento, body.email, body.telefone]);
  const id = result.insertId;
  
  await conn.execute('INSERT INTO matriculas (id_aluno, id_curso, id_turma, nome) VALUES (?, ?, ?, ?)', [id, body.curso, body.turma, nomeMatricula]);
}

// busca aluno por id e formata os dados principais
async function getAlunoProfile(id) {
  const [rows] = await conn.execute('SELECT * FROM alunos WHERE ID = ?', [id]);
  if (!rows || rows.length === 0) return null;
  const row = rows[0];

  row.telefone = format.phone(row.telefone);
  row.cpf = format.CPF(row.cpf);
  row.data_nascimento = format.date(row.data_nascimento);
  row.data_matricula = format.date(row.data_matricula);

  return row;
}

async function deleteAluno (id) {
  await conn.execute('DELETE FROM alunos WHERE ID = ?', [id]);
}

async function patchAluno(body, id) {
  const campos = [];
  const valores = [];

  if (body.nome !== undefined) {
    campos.push('nome = ?');
    valores.push(body.nome);
  }
  if (body.cpf !== undefined) {
    campos.push('cpf = ?');
    valores.push(body.cpf);
  }
  if (body.data_nascimento !== undefined) {
    campos.push('data_nascimento = STR_TO_DATE(?, "%d/%m/%Y")');
    valores.push(body.data_nascimento);
  }
  if (body.email !== undefined) {
    campos.push('email = ?');
    valores.push(body.email);
  }
  if (body.telefone !== undefined) {
    campos.push('telefone = ?');
    valores.push(body.telefone);
  }

  valores.push(id);

  if (campos.length > 0) {
    await conn.execute(`UPDATE alunos SET ${campos.join(', ')} WHERE id = ?`, valores);
  } else {
    return 'Nenhum campo foi modificado.';
  }

}

// exporta funcoes do servico de alunos
module.exports = {
  getAlunos,
  postAluno,
  getAlunoProfile,
  deleteAluno,
  patchAluno
};