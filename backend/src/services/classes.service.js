const prisma = require('../config/db');

// lista turmas com nome do curso para simplificar o consumo no frontend
async function listClasses() {
    const classes = await prisma.classGroup.findMany({
        orderBy: { name: 'asc' },
        include: {
            course: {
                select: {
                    name: true,
                },
            },
        },
    });

    return classes.map(({ course, ...classGroup }) => ({
        ...classGroup,
        courseName: course?.name ?? null,
    }));
}

// busca uma turma e adapta o retorno com nome do curso associado
async function listClass(id) {
    const _class_ = await prisma.classGroup.findUnique({
        where: { id: Number(id) },
        include: {
            course: {
                select: {
                    name: true,
                },
            },
        },
    });

    formattedClass = {
        ..._class_,
        courseName: _class_.course.name
    }

    return formattedClass;
}

// gera nome sequencial da turma por curso e ano corrente
async function createClassName(courseId) {
    const currentYear = new Date().getFullYear();

    let courseCode = await prisma.course.findUnique({
        where: { id: Number(courseId) },
        select: { code: true }
    });
    courseCode = courseCode.code;

    let classNumber = await prisma.classGroup.count({
        where: { courseId: Number(courseId), year: currentYear }
    });
    classNumber++;

    const className = `${currentYear}.${String(classNumber).padStart(2, '0')}.${courseCode.toUpperCase()}`;

    return {name: className, number: classNumber, year: currentYear};
}

// cria turma com contadores iniciais de ocupacao e status informado
async function createClass(body) {
    const newClassData = await createClassName(body.courseId);
    await prisma.classGroup.create({
        data: {
            courseId: Number(body.courseId),
            name: newClassData.name,
            number: newClassData.number,
            year: newClassData.year,
            studentCount: 0,
            maxSeats: body.maxSeats,
            availableSeats: body.maxSeats,
            status: body.status.toUpperCase(),
        }
    });
}

// remove turma dentro de transacao para manter consistencia de matriculas e alunos
async function deleteClass(id) {
    const classId = Number(id);

    await prisma.$transaction(async (tx) => {
        const enrollments = await tx.enrollment.findMany({
            where: { classGroupId: classId }
        });

        await tx.enrollment.deleteMany({
            where: { classGroupId: classId }
        });

        for (const en of enrollments) {
            const student = await tx.student.findUnique({
                where: { id: Number(en.studentId) }
            });

            const newCount = student.enrollmentCount - 1;

            await tx.student.update({
                where: { id: student.id },
                data: {
                    enrollmentCount: newCount,
                    enrollmentStatus: newCount <= 0 ? "PENDENTE" : student.enrollmentStatus
                }
            });
        }

        await tx.classGroup.delete({
            where: { id: classId }
        });
    });
}

// aplica update parcial e recalcula vagas disponiveis conforme alunos matriculados
async function updateClass(body, id) {
    const data = {};

    if (body.courseId !== undefined) {
        data.courseId = body.courseId;
    }
    if (body.maxSeats !== undefined) {
        const classGroup = await prisma.classGroup.findUnique( { where: { id: Number(id) } } );
        if (body.maxSeats < classGroup.studentCount) {
            return;
        }
        data.maxSeats = body.maxSeats;
    }
    if (body.status !== undefined) {
        data.status = body.status;
    }

    await prisma.$transaction(async (tx) => {
        const classGroup = await tx.classGroup.findUnique({where:{id: Number(id)}});

        await tx.classGroup.update({
            where: { id: Number(id) },
            data: {
                ...data,
                availableSeats: data.maxSeats - classGroup.studentCount,
            }
        })

        if (data.courseId) {
            // ao trocar o curso, regenera identificacao da turma para novo contexto
            const newClassData = await createClassName(body.courseId);
            await tx.classGroup.update({
                where: {id: Number(id)},
                data: {
                    name: newClassData.name,
                    number: newClassData.number,
                    year: newClassData.year,
                }
            })
        }
    })
}

module.exports = {
    listClasses,
    createClass,
    deleteClass,
    listClass,
    updateClass,
};
