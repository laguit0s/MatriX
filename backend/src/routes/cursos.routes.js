const { Router } = require('express');
const cursosController = require('../controllers/cursos.controller');
const routerCursos = Router();

routerCursos.get('/', cursosController.getCursos);
routerCursos.post('/', cursosController.postCurso);
routerCursos.delete('/:id', cursosController.deleteCurso);

module.exports = routerCursos;
