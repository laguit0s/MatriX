const { Router } = require('express');
const classesController = require('../controllers/classes.controller');
const classesRouter = Router();

classesRouter.get('/', classesController.listClasses);
classesRouter.get('/:id', classesController.listClass);
classesRouter.post('/', classesController.createClass);
classesRouter.delete('/:id', classesController.deleteClass);
classesRouter.patch('/:id', classesController.updateClass);

module.exports = classesRouter;
