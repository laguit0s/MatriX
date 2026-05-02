const cursosService = require('../services/cursos.service')

async function getCursos(req, res) {
    const cursos = await cursosService.getCursos();
    res.status(200).json(cursos);
}

async function postCurso(req, res) {
    await cursosService.postCurso(req.body);
    res.sendStatus(201);
}

async function deleteCurso(req, res) {
    await cursosService.deleteCurso(req.params.id);
    res.sendStatus(204);
}

async function getCurso(req, res) {
    const dados = await cursosService.getCurso(req.params.id);
    res.status(200).json(dados);
}

async function patchCurso(req, res) {
    const result = await cursosService.patchCurso(req.body, req.params.id);
    result ? res.status(400).json({ message: result }) : res.sendStatus(200);
}

module.exports = {
    getCursos,
    postCurso,
    deleteCurso,
    getCurso,
    patchCurso
}