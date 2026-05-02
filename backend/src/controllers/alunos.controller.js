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

async function deleteAluno(req, res) {
  await alunosService.deleteAluno(req.params.id);
  res.sendStatus(204);
}

async function patchAluno(req, res) {
  const result = await alunosService.patchAluno(req.body, req.params.id);
  result ? res.status(400).json({ message: result }) : res.sendStatus(200);
}

module.exports = {
  getAlunos,
  postAluno,
  getAlunoProfile,
  deleteAluno,
  patchAluno
};