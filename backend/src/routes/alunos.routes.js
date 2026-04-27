const { Router } = require('express');
const alunosController = require('../controllers/alunos.controller');

const routerAlunos = Router();

routerAlunos.get('/', alunosController.listarAlunos);
routerAlunos.post('/', alunosController.cadastrarAlunos);

module.exports = routerAlunos;