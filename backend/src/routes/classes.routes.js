const { Router } = require('express');
const classesController = require('../controllers/classes.controller');
const classesRouter = Router();

classesRouter.get('/', classesController.listClasses);
classesRouter.post('/', classesController.createClass);
classesRouter.delete('/:id', classesController.deleteClass);

module.exports = classesRouter;
