const turmasService = require('../services/turmas.service')

async function getTurmas(req, res) {
    const dados = await turmasService.getTurmas();
    res.status(200).json(dados);
}

async function postTurma(req, res) {
    await turmasService.postTurma(req.body);
    res.sendStatus(201);
}

module.exports = {
    getTurmas,
    postTurma,
}