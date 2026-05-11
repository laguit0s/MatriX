const studentsService = require('../services/students.service');

// cria novo aluno a partir dos dados enviados no formulario
async function createStudent(req, res, next) {
  try {
    await studentsService.createStudent(req.validatedData.body);
    res.sendStatus(201);
  } catch (err) {
    next(err);
  }
}

// bloqueia update vazio para evitar chamada sem efeito no banco
async function updateStudent(req, res) {
  const result = await studentsService.updateStudent(req.validatedData.body, req.params.id);

  if (result === 'Nenhum campo foi modificado.') {
    res.status(400).json({ message: result });
  } else {
    res.status(200).json(result);
  }
}

// lista alunos e normaliza nome em caixa alta para manter padrao da tela
async function listStudents(req, res) {
  const students = await studentsService.listStudents();
  students.forEach(student => {
    student.fullName = student.fullName.toUpperCase();
  });
  res.status(200).json(students);
}

// retorna os dados completos de um aluno para a tela de perfil
async function getStudentProfile(req, res) {
  const studentProfile = await studentsService.getStudentProfile(req.params.id);
  res.status(200).json(studentProfile);
}

// remove aluno e dependencias de matricula
async function deleteStudent(req, res) {
  await studentsService.deleteStudent(req.params.id);
  res.sendStatus(204);
}

module.exports = {
  listStudents,
  createStudent,
  getStudentProfile,
  deleteStudent,
  updateStudent
};
