// importacoes de banco de dados e formatacao
const conn = require('../config/db');
const format = require('../utils/format.data');

async function ensureAlunoColumns() {
  // adiciona colunas curso_id e turma se nao existirem (silencioso)
  const [cursoCol] = await conn.execute(`SELECT COUNT(*) AS cnt FROM information_schema.COLUMNS WHERE TABLE_SCHEMA = ? AND TABLE_NAME = 'alunos' AND COLUMN_NAME = 'curso_id'`, [process.env.DB_NAME]);
  if (cursoCol[0].cnt === 0) {
    await conn.execute('ALTER TABLE alunos ADD COLUMN curso_id INT NULL');
  }
  const [turmaCol] = await conn.execute(`SELECT COUNT(*) AS cnt FROM information_schema.COLUMNS WHERE TABLE_SCHEMA = ? AND TABLE_NAME = 'alunos' AND COLUMN_NAME = 'turma'`, [process.env.DB_NAME]);
  if (turmaCol[0].cnt === 0) {
    await conn.execute("ALTER TABLE alunos ADD COLUMN turma VARCHAR(100) NULL");
  }
}

// busca todos os alunos e formata os dados principais
async function getAlunos() {
  // traz curso nome quando possivel
  const [rows] = await conn.query(`SELECT a.*, c.nome AS curso_nome FROM alunos a LEFT JOIN cursos c ON a.curso_id = c.id ORDER BY a.nome ASC`);
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
  await ensureAlunoColumns();
  const sql = `INSERT INTO alunos (nome, cpf, data_nascimento, email, telefone, curso_id, turma) VALUES (?, ?, STR_TO_DATE(?, '%d/%m/%Y'), ?, ?, ?, ?)`;
  const cursoVal = body.curso_id !== undefined && body.curso_id !== '' ? body.curso_id : null;
  const turmaVal = body.turma !== undefined && body.turma !== '' ? body.turma : null;
  await conn.execute(sql, [body.nome, body.cpf, body.data_nascimento, body.email, body.telefone, cursoVal, turmaVal]);
}

// busca aluno por id e formata os dados principais
async function getAlunoProfile(id) {
  const [rows] = await conn.execute('SELECT a.*, c.nome AS curso_nome FROM alunos a LEFT JOIN cursos c ON a.curso_id = c.id WHERE a.ID = ?', [id]);
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
  await ensureAlunoColumns();
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
  if (body.curso_id !== undefined) {
    campos.push('curso_id = ?');
    valores.push(body.curso_id);
  }
  if (body.turma !== undefined) {
    campos.push('turma = ?');
    valores.push(body.turma);
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