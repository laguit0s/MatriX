const { Router } = require('express');
const coursesController = require('../controllers/courses.controller');
const coursesRouter = Router();

// concentra os endpoints de cursos usados pela area administrativa
coursesRouter.get('/', coursesController.listCourses);
coursesRouter.get('/:id', coursesController.getCourse);
coursesRouter.post('/', coursesController.createCourse);
coursesRouter.delete('/:id', coursesController.deleteCourse);
coursesRouter.patch('/:id', coursesController.updateCourse);

module.exports = coursesRouter;
