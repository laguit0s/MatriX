// importacoes de banco de dados e formatacao
const prisma = require('../config/db');
const format = require('../utils/format.data');

// busca todos os alunos e formata os dados principais
async function getAlunos() {
  let rows = await prisma.Aluno.findMany();
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
  // const anoAtual = new Date().getFullYear();

  // const [rowTurmas] = await conn.execute('SELECT numero FROM turmas WHERE id = ?', [body.turma]);
  // const [rowAlunos] = await conn.execute('SELECT COUNT(*) AS total FROM matriculas WHERE id_turma = ?', [body.turma]);
  // const [rowSigla] = await conn.execute('SELECT cod FROM cursos WHERE id = ?', [body.curso]);

  // const numeroTurma = rowTurmas[0].numero;
  // let totalAlunos = rowAlunos[0].total + 1;
  // const sigla = rowSigla[0].cod;
  
  // if (totalAlunos <= 0) {
  //   totalAlunos = 1;
  // }

  // const nomeMatricula = `${anoAtual}.${String(numeroTurma).padStart(2, '0')}.${sigla}.${String(totalAlunos).padStart(3, '0')}`;

  // const [result] = await conn.execute(`INSERT INTO alunos (nome, cpf, data_nascimento, email, telefone) VALUES (?, ?, STR_TO_DATE(?, '%d/%m/%Y'), ?, ?)`, [body.nome, body.cpf, body.data_nascimento, body.email, body.telefone]);
  // const id = result.insertId;

  const partesData = body.data_nascimento.split('/'); // ["24", "05", "2007"]
  const dataNascimentoIso = new Date(`${partesData[2]}-${partesData[1]}-${partesData[0]}T12:00:00Z`);
  
  await prisma.aluno.create({
    data: {
      nome: body.nome,
      cpf: body.cpf,
      data_nascimento: dataNascimentoIso,
      email: body.email,
      telefone: body.telefone
    }
  });
}

// busca aluno por id e formata os dados principais
async function getAlunoProfile(id) {
  const row = await prisma.aluno.findUnique({
    where: {
      id: Number(id)
    }
  });

  row.telefone = format.phone(row.telefone);
  row.cpf = format.CPF(row.cpf);
  row.data_nascimento = format.date(row.data_nascimento);
  row.data_matricula = format.date(row.data_matricula);

  return row;
}

async function deleteAluno (id) {
  await prisma.aluno.delete({
    where: { id: Number(id) }
  })
}

async function patchAluno(body, id) {
  const data = {};

  if (body.nome !== undefined) {
    data.nome = body.nome;
  }

  if (body.cpf !== undefined) {
    data.cpf = body.cpf;
  }

  if (body.data_nascimento !== undefined) {
    const [dia, mes, ano] = body.data_nascimento.split('/');
    data.data_nascimento = new Date(`${ano}-${mes}-${dia}T12:00:00Z`);
  }

  if (body.email !== undefined) {
    data.email = body.email;
  }

  if (body.telefone !== undefined) {
    data.telefone = body.telefone;
  }

  if (Object.keys(data).length === 0) {
    return 'Nenhum campo foi modificado.';
  }

  return await prisma.aluno.update({
    where: { id: Number(id) },
    data
  });
}

// exporta funcoes do servico de alunos
module.exports = {
  getAlunos,
  postAluno,
  getAlunoProfile,
  deleteAluno,
  patchAluno
};