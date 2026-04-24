const { buscarTodosOsAlunos } = require('../services/alunos.service');

// Controller: orquestra a chamada de serviço e padroniza a resposta HTTP.
async function listarAlunos(req, res) {
  try {
    const alunos = await buscarTodosOsAlunos();
    // Retorna os dados brutos do serviço em JSON.
    return res.status(200).json(alunos);
  } catch (error) {
    // Erro genérico de infraestrutura/consulta.
    return res.status(500).json({ error: 'Erro ao listar alunos' });
  }
}

module.exports = listarAlunos;