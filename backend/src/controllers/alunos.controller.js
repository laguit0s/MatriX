const buscarAlunos = require('../services/alunos.service');

async function listarAlunos(req, res) {
  const alunos = await buscarAlunos();
  res.status(200).json(alunos);
}

function cadastrarAlunos(req, res) {
  console.log(req.body);
}

module.exports = {
  listarAlunos,
  cadastrarAlunos
}