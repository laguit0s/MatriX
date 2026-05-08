const prisma = require('../config/db');
const formatter = require('../utils/formatters');
const { deleteStudent } = require('./students.service');

// lista cursos com preco formatado para exibicao direta no frontend
async function listCourses() {
    const courses = await prisma.course.findMany({ orderBy: { name: 'asc' } });
    courses.forEach(course => {
        course.price = formatter.formatCurrency(course.price);
    });
    return courses;
}

// salva curso padronizando campos textuais em caixa alta
async function createCourse(body) {
    await prisma.course.create({
        data: {
            name: body.name.toUpperCase(),
            code: body.code.toUpperCase(),
            price: body.price,
            billingCycle: body.billingCycle.toUpperCase()
        }
    });
}

// remove curso pelo identificador recebido, bem como as matriculas e turmas associadas
async function deleteCourse(id) {
    await prisma.$transaction(async (tx) => {
        const classGroups = await tx.classGroup.findMany({
            where: { courseId: Number(id) },
            select: {
                id: true,
                enrollments: {
                    where: { courseId: Number(id) },
                    select: {
                        studentId: true,
                    },
                },
            },
        })

        for (const c of classGroups) {
            for (const e of c.enrollments) {
                const student = await tx.student.findUnique({ 
                    where: { id: e.studentId },
                    select: { enrollmentCount: true, enrollmentStatus: true }, 
                })

                const newEnrollmentCount = Number(student.enrollmentCount) - 1;

                await tx.student.update({
                    where: { id: e.studentId },
                    data: {
                        enrollmentCount: Number(newEnrollmentCount),
                        enrollmentStatus: newEnrollmentCount <= 0 ? "PENDENTE" : student.enrollmentStatus
                    },
                })
            }
            await tx.enrollment.deleteMany({ where: { classGroupId: c.id } });
        }

        await tx.classGroup.deleteMany({ where: { courseId: Number(id) }})
        await tx.course.delete( { where: { id: Number(id) } } )
    })
}

// retorna curso individual ja com valor monetario formatado
async function getCourse(id) {
    const course = await prisma.course.findUnique({
        where: { id: Number(id) }
    });
    course.price = formatter.formatCurrency(course.price);
    return course;
}

// atualiza somente campos enviados e avisa quando nada foi alterado
async function updateCourse(body, id) {
    const data = {};

    if (body.name !== undefined) {
        data.name = body.name;
    }
    if (body.code !== undefined) {
        data.code = body.code;
    }
    if (body.price !== undefined) {
        data.price = body.price;
    }
    if (body.billingCycle !== undefined) {
        data.billingCycle = body.billingCycle;
    }

  if (Object.keys(data).length === 0) {
    return "Nenhum campo foi modificado.";
  }

  return await prisma.course.update({
    where: { id: Number(id) },
    data
  });
}

module.exports = {
    listCourses,
    createCourse,
    deleteCourse,
    getCourse,
    updateCourse,
};
