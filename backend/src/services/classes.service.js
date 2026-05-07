const prisma = require('../config/db');

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

async function createClass(body) {
    const currentYear = new Date().getFullYear();
    let courseCode = await prisma.course.findUnique({
        where: { id: Number(body.courseId) },
        select: { code: true }
    });
    courseCode = courseCode.code;
    let classNumber = await prisma.classGroup.count({
        where: { courseId: Number(body.courseId), year: currentYear }
    });
    classNumber++;

    const className = `${currentYear}.${String(classNumber).padStart(2, '0')}.${courseCode.toUpperCase()}`;

    await prisma.classGroup.create({
        data: {
            courseId: Number(body.courseId),
            name: className,
            number: classNumber,
            year: currentYear,
            studentCount: 0,
            maxSeats: body.maxSeats,
            availableSeats: body.maxSeats,
            status: body.status.toUpperCase(),
        }
    });
}

async function deleteClass(id) {
    const classId = Number(id);

    await prisma.$transaction(async (tx) => {
        await tx.enrollment.deleteMany({
            where: { classGroupId: classId }
        });

        const enrollments = await tx.enrollment.findMany({
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

module.exports = {
    listClasses,
    createClass,
    deleteClass,
};