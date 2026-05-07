const prisma = require('../config/db');

async function getTurmas() {
    const turmas = await prisma.turma.findMany({
        orderBy: { nome: 'asc' },
        include: {
            curso: {
                select: {
                    nome: true,
                },
            },
        },
    });

    return turmas.map(({ curso, ...turma }) => ({
        ...turma,
        nomeCurso: curso?.nome ?? null,
    }));
}

async function postTurma(body) {
    const anoAtual = new Date().getFullYear();
    let codCurso = await prisma.curso.findUnique({
        where: { id: Number(body.curso) },
        select: { cod: true }
    }); codCurso = codCurso.cod;
    let numeroTurma = await prisma.turma.count({
        where: { cursoId: Number(body.curso), ano: anoAtual }
    }); numeroTurma++;

    const nomeTurma = `${anoAtual}.${String(numeroTurma).padStart(2, '0')}.${codCurso.toUpperCase()}`;

    await prisma.turma.create({
        data: {
            cursoId: Number(body.curso),
            nome: nomeTurma,
            numero: numeroTurma,
            ano: anoAtual,
            qtdAlunos: 0,
            vagasMax: body.vagasMax,
            vagasDisponiveis: body.vagasMax,
            status: body.status,
        }
    })
}

module.exports = {
    getTurmas,
    postTurma
}