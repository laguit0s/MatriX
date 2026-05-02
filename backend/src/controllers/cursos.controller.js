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

module.exports = {
    getCursos,
    postCurso,
    deleteCurso
}