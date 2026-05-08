const prisma = require('../config/db');
const formatter = require('../utils/formatters');

// busca alunos ordenados e entrega campos prontos para exibicao na tabela
async function listStudents() {
  const rows = await prisma.student.findMany({ orderBy: { fullName: 'asc' } });
  rows.forEach(row => {
    row.phone = formatter.formatPhone(row.phone);
    row.cpf = formatter.formatCpf(row.cpf);
    row.birthDate = formatter.formatDate(row.birthDate);
    row.enrollmentDate = formatter.formatDate(row.enrollmentDate);
  });
  return rows;
}

// cria matricula do aluno e sincroniza contadores de aluno e turma
async function createEnrollment(studentId, courseId, classGroupId) {
  const classGroup = await prisma.classGroup.findUnique({
    where: { id: Number(classGroupId) },
    select: { name: true, studentCount: true, maxSeats: true }
  });

  if (classGroup.studentCount >= classGroup.maxSeats) {
    return;
  }

  // gera nome sequencial da matricula para manter identificacao unica por turma
  const enrollmentName = `${classGroup.name}.${String(classGroup.studentCount + 1).padStart(4, '0')}`;

  await prisma.enrollment.create({
    data: {
      studentId: Number(studentId),
      courseId: Number(courseId),
      classGroupId: Number(classGroupId),
      name: enrollmentName
    }
  });

  await prisma.student.update({ 
    where: { id: Number(studentId) }, 
    data: { 
      enrollmentStatus: 'ATIVA', 
      enrollmentCount: {increment: 1}
    } 
  });

  await prisma.classGroup.update({
    where: { id: Number(classGroupId) },
    data: {
      studentCount: {increment: 1},
      availableSeats: {decrement: 1}
    }
  });
}

// cria aluno e, quando informado, ja vincula ao curso/turma selecionados
async function createStudent(body) {

  const student = await prisma.student.create({
    data: {
      fullName: body.fullName.toUpperCase(),
      cpf: body.cpf,
      birthDate: body.birthDate,
      email: body.email,
      phone: body.phone
    }
  });

  if (body.courseId && body.classGroupId) {
    await createEnrollment(student.id, body.courseId, body.classGroupId);
  }
}

// retorna perfil individual com mascaras aplicadas para a interface
async function getStudentProfile(id) {
  const row = await prisma.student.findUnique({
    where: {
      id: Number(id)
    }
  });

  row.phone = formatter.formatPhone(row.phone);
  row.cpf = formatter.formatCpf(row.cpf);
  row.birthDate = formatter.formatDate(row.birthDate);
  row.enrollmentDate = formatter.formatDate(row.enrollmentDate);

  return row;
}

// remove matriculas antes de excluir aluno para manter contagem de vagas correta
async function deleteStudent(id) {
  const enrollments = await prisma.enrollment.findMany({
    where: { studentId: Number(id) }
  });
  for (const enrollment of enrollments) {
    const classGroup = await prisma.classGroup.findUnique({
      where: { id: Number(enrollment.classGroupId) }
    });
    await prisma.classGroup.update({
      where: { id: classGroup.id },
      data: {
        studentCount: { decrement: 1 },
        availableSeats: { increment: 1 }
      }
    });
  }
  await prisma.enrollment.deleteMany({
    where: { studentId: Number(id) }
  });
  await prisma.student.delete({
    where: { id: Number(id) }
  });
}

// monta update parcial apenas com os campos realmente enviados
async function updateStudent(body, id) {
  const data = {};

  if (body.fullName !== undefined) {
    data.fullName = body.fullName;
  }

  if (body.cpf !== undefined) {
    data.cpf = body.cpf;
  }

  if (body.birthDate !== undefined) {
    data.birthDate = body.birthDate;
  }

  if (body.email !== undefined) {
    data.email = body.email;
  }

  if (body.phone !== undefined) {
    data.phone = body.phone;
  }

  if (Object.keys(data).length === 0) {
    return 'Nenhum campo foi modificado.';
  }

  return await prisma.student.update({
    where: { id: Number(id) },
    data
  });
}

module.exports = {
  listStudents,
  createStudent,
  getStudentProfile,
  deleteStudent,
  updateStudent
};
