// controller
const alunosService = require('../services/alunos.service');

async function getAlunos(req, res) {
  const alunos = await alunosService.getAlunos();
  res.status(200).json(alunos);
}

async function postAluno(req, res) {
  await alunosService.postAluno(req.body);
  res.sendStatus(201);
}

module.exports = {
  getAlunos,
  postAluno
};