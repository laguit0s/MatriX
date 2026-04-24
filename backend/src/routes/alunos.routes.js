const { Router } = require('express');
const listarAlunos = require('../controllers/alunos.controller');

// Router dedicado ao recurso de alunos.
const alunosRouter = Router();

// GET /api/gerenciar-alunos/
alunosRouter.get('/', listarAlunos);

module.exports = alunosRouter;