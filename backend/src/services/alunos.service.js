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

async function createMatricula(alunoId, cursoId, turmaId) {
  let nomeTurma = await prisma.turma.findUnique({
    where: { id: Number(turmaId) },
    select: { nome: true }
  }); nomeTurma = nomeTurma.nome;

  let numeroMatriculas = await prisma.matricula.count({
    where: {
      IdTurma: Number(turmaId)
    }
  }); 
  
  if (numeroMatriculas <= 0) {
    numeroMatriculas = 1;
  } else {
    ++numeroMatriculas;
  }

  const nomeMatricula = `${nomeTurma}.${String(numeroMatriculas).padStart(3, "0")}`;

  await prisma.matricula.create({
    data: {
      alunoId: Number(alunoId),
      cursoId: Number(cursoId),
      turmaId: Number(turmaId),
      nome: nomeMatricula
    }
  })
}

// insere novo aluno no banco de dados com parametros seguros
async function postAluno(body) {
  const partesData = body.data_nascimento.split('/'); // ["24", "05", "2007"]
  const dataNascimentoIso = new Date(`${partesData[2]}-${partesData[1]}-${partesData[0]}T12:00:00Z`);
  
  const aluno = await prisma.aluno.create({
    data: {
      nome: body.nome,
      cpf: body.cpf,
      data_nascimento: dataNascimentoIso,
      email: body.email,
      telefone: body.telefone
    }
  });

  if (body.curso && body.turma) {
    createMatricula(aluno.id, body.curso, body.turma);
  }
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