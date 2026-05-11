const { Router } = require('express');
const studentsController = require('../controllers/students.controller');
const createStudentSchema = require('../schemas/students/createStudent.schema');
const updateStudentSchema = require('../schemas/students/updateStudent.schema');
const validate = require('../middlewares/validateSchema.middleware');

const studentsRouter = Router();

// concentra os endpoints de alunos usados pela area administrativa
studentsRouter.get('/:id', studentsController.getStudentProfile);
studentsRouter.patch('/:id', validate(updateStudentSchema),studentsController.updateStudent);
studentsRouter.get('/', studentsController.listStudents);
studentsRouter.post('/', validate(createStudentSchema), studentsController.createStudent);
studentsRouter.delete('/:id', studentsController.deleteStudent);

module.exports = studentsRouter;
