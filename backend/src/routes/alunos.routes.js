const { Router } = require('express');
const alunosController = require('../controllers/alunos.controller');

const routerAlunos = Router();

// define rotas de alunos
routerAlunos.get('/:id', alunosController.getAlunoProfile);
routerAlunos.get('/', alunosController.getAlunos);
routerAlunos.post('/', alunosController.postAluno);
routerAlunos.delete('/:id', alunosController.deleteAluno);

module.exports = routerAlunos;