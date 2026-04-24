const { Router } = require('express');
const listarAlunos = require('../controllers/alunos.controller');

const routerAlunos = Router();

routerAlunos.get('/', listarAlunos);

module.exports = routerAlunos;