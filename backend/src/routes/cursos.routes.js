const { Router } = require('express');
const cursosController = require('../controllers/cursos.controller');
const routerCursos = Router();

routerCursos.get('/', cursosController.getCursos);

module.exports = routerCursos;
