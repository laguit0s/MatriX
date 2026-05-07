const studentsService = require('../services/students.service');

async function listStudents(req, res) {
  const students = await studentsService.listStudents();
  students.forEach(student => {
    student.fullName = student.fullName.toUpperCase();
  });
  res.status(200).json(students);
}

async function createStudent(req, res) {
  await studentsService.createStudent(req.body);
  res.sendStatus(201);
}

async function getStudentProfile(req, res) {
  const studentProfile = await studentsService.getStudentProfile(req.params.id);
  res.status(200).json(studentProfile);
}

async function deleteStudent(req, res) {
  await studentsService.deleteStudent(req.params.id);
  res.sendStatus(204);
}

async function updateStudent(req, res) {
  const result = await studentsService.updateStudent(req.body, req.params.id);

  if (result === 'Nenhum campo foi modificado.') {
    res.status(400).json({ message: result });
  } else {
    res.status(200).json(result);
  }
}

module.exports = {
  listStudents,
  createStudent,
  getStudentProfile,
  deleteStudent,
  updateStudent
};
