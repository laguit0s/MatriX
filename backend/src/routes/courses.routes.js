const { Router } = require('express');
const coursesController = require('../controllers/courses.controller');
const coursesRouter = Router();
const asyncHandler = require('../utils/asyncHandler');

// concentra os endpoints de cursos usados pela area administrativa
coursesRouter.get('/', asyncHandler(coursesController.listCourses));
coursesRouter.get('/:id', asyncHandler(coursesController.getCourse));
coursesRouter.post('/', asyncHandler(coursesController.createCourse));
coursesRouter.delete('/:id', asyncHandler(coursesController.deleteCourse));
coursesRouter.patch('/:id', asyncHandler(coursesController.updateCourse));

module.exports = coursesRouter;
