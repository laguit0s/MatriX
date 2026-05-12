const { Router } = require('express');
const classesController = require('../controllers/classes.controller');
const classesRouter = Router();
const asyncHandler = require('../utils/asyncHandler');

// concentra os endpoints de turmas usados pela area administrativa
classesRouter.get('/', asyncHandler(classesController.listClasses));
classesRouter.get('/:id', asyncHandler(classesController.getClassProfile));
classesRouter.post('/', asyncHandler(classesController.createClass));
classesRouter.delete('/:id', asyncHandler(classesController.deleteClass));
classesRouter.patch('/:id', asyncHandler(classesController.updateClass));

module.exports = classesRouter;
