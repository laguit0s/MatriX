const prisma = require('../config/db');
const format = require('../utils/format.data');

async function getCursos() {
    const cursos = await prisma.curso.findMany();
    cursos.forEach(curso => {
        curso.valor = format.valor(curso.valor);
    })
    return cursos;
}

async function postCurso(body) {
    await prisma.curso.create({
        data: {
            nome: body.nome,
            cod: body.cod,
            valor: body.valor,
            cobranca: body.cobranca
        }
    });
}

async function deleteCurso(id) {
    await prisma.curso.delete({
        where: { id: Number(id) }
    })
}

async function getCurso(id) {
    const curso = await prisma.curso.findUnique({
        where: { id: Number(id) }
    })
    curso.valor = format.valor(curso.valor);
    return curso;
}

async function patchCurso(body, id) {
    let data = {};

    if (body.nome !== undefined) {
        data.nome = body.nome;
    }
    if (body.cod !== undefined) {
        data.cod = body.cod;
    }
    if (body.valor !== undefined) {
        data.valor = body.valor
    }
    if (body.cobranca !== undefined) {
        data.cobranca = body.cobranca
    }

  if (Object.keys(data).length === 0) {
    return "Nenhum campo foi modificado.";
  }

  return await prisma.curso.update({
    where: { id: Number(id) },
    data
  })
}

module.exports = {
    getCursos,
    postCurso,
    deleteCurso,
    getCurso,
    patchCurso
}