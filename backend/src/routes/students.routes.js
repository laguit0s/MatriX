const { Router } = require('express');
const studentsController = require('../controllers/students.controller');

const studentsRouter = Router();

// concentra os endpoints de alunos usados pela area administrativa
studentsRouter.get('/:id', studentsController.getStudentProfile);
studentsRouter.patch('/:id', studentsController.updateStudent);
studentsRouter.get('/', studentsController.listStudents);
studentsRouter.post('/', studentsController.createStudent);
studentsRouter.delete('/:id', studentsController.deleteStudent);

module.exports = studentsRouter;
