const prisma = require('../config/db');
const formatter = require('../utils/formatters');

async function listCourses() {
    const courses = await prisma.course.findMany({ orderBy: { name: 'asc' } });
    courses.forEach(course => {
        course.price = formatter.formatCurrency(course.price);
    });
    return courses;
}

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

async function deleteCourse(id) {
    await prisma.course.delete({
        where: { id: Number(id) }
    });
}

async function getCourse(id) {
    const course = await prisma.course.findUnique({
        where: { id: Number(id) }
    });
    course.price = formatter.formatCurrency(course.price);
    return course;
}

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
