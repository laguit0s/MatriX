const prisma = require('../config/db');
const formatter = require('../utils/formatters');

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

async function createEnrollment(studentId, courseId, classGroupId) {
  const classGroup = await prisma.classGroup.findUnique({
    where: { id: Number(classGroupId) },
    select: { name: true, studentCount: true, maxSeats: true }
  });

  if (classGroup.studentCount >= classGroup.maxSeats) {
    return;
  }

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

async function createStudent(body) {
  const dateParts = body.birthDate.split('/');
  const birthDateIso = new Date(`${dateParts[2]}-${dateParts[1]}-${dateParts[0]}T12:00:00Z`);

  const student = await prisma.student.create({
    data: {
      fullName: body.fullName.toUpperCase(),
      cpf: body.cpf,
      birthDate: birthDateIso,
      email: body.email,
      phone: body.phone
    }
  });

  if (body.courseId && body.classGroupId) {
    await createEnrollment(student.id, body.courseId, body.classGroupId);
  }
}

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

async function updateStudent(body, id) {
  const data = {};

  if (body.fullName !== undefined) {
    data.fullName = body.fullName;
  }

  if (body.cpf !== undefined) {
    data.cpf = body.cpf;
  }

  if (body.birthDate !== undefined) {
    const [day, month, year] = body.birthDate.split('/');
    data.birthDate = new Date(`${year}-${month}-${day}T12:00:00Z`);
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
