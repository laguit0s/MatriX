const buscarAlunos = require('../services/alunos.service');

async function listarAlunos(req, res) {
  const alunos = await buscarAlunos();
  res.status(200).json(alunos);
}

module.exports = listarAlunos;