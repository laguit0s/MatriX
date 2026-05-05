const prisma = require('../config/db');

async function getTurmas() {
    const turmas = await prisma.turma.findMany();
    return turmas;
}

module.exports = {
    getTurmas
}