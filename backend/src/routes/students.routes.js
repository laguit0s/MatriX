const { Router } = require('express');
const studentsController = require('../controllers/students.controller');
const createStudentSchema = require('../schemas/students/createStudent.schema');
const updateStudentSchema = require('../schemas/students/updateStudent.schema');
const validate = require('../middlewares/validateSchema.middleware');
const asyncHandler = require('../utils/asyncHandler');

const studentsRouter = Router();

// concentra os endpoints de alunos usados pela area administrativa
studentsRouter.get('/:id', asyncHandler(studentsController.getStudentProfile));
studentsRouter.patch('/:id', validate(updateStudentSchema), asyncHandler(studentsController.updateStudent));
studentsRouter.get('/', asyncHandler(studentsController.listStudents));
studentsRouter.post('/', validate(createStudentSchema), asyncHandler(studentsController.createStudent));
studentsRouter.delete('/:id', asyncHandler(studentsController.deleteStudent));

module.exports = studentsRouter;
