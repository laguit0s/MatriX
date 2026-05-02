const cursosService = require('../services/cursos.service')

async function getCursos(req, res) {
    const cursos = await cursosService.getCursos();
    res.status(200).json(cursos);
}

module.exports = {
    getCursos
}