const { Router } = require('express');
const turmasController = require('../controllers/turmas.controller.js');
const routerTurmas = Router();

routerTurmas.get('/', turmasController.getTurmas);

module.exports = routerTurmas;