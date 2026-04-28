// controlador de alunos
const alunosService = require('../services/alunos.service');

// retorna lista de alunos
async function getAlunos(req, res) {
  const alunos = await alunosService.getAlunos();
  res.status(200).json(alunos);
}

// cria novo aluno
async function postAluno(req, res) {
  await alunosService.postAluno(req.body);
  res.sendStatus(201);
}

// retorna perfil de um aluno especifico
async function getAlunoProfile(req, res) {
  const alunoProfile = await alunosService.getAlunoProfile(req.params.id);
  res.status(200).json(alunoProfile);
}

module.exports = {
  getAlunos,
  postAluno,
  getAlunoProfile
};