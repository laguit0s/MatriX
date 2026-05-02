const { Router } = require('express');
const cursosController = require('../controllers/cursos.controller');
const routerCursos = Router();

routerCursos.get('/', cursosController.getCursos);
routerCursos.get('/:id', cursosController.getCurso);
routerCursos.post('/', cursosController.postCurso);
routerCursos.delete('/:id', cursosController.deleteCurso);
routerCursos.patch('/:id', cursosController.patchCurso);

module.exports = routerCursos;
