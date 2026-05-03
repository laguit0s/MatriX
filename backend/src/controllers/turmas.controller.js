const turmasService = require('../services/turmas.service')

async function getTurmas(req, res) {
    const dados = await turmasService.getTurmas();
    res.status(200).json(dados);
}

module.exports = {
    getTurmas
}