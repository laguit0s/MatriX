const conn = require('../config/db');
const format = require('../utils/format.data');

async function getCursos() {
    const [cursos] = await conn.query('SELECT * FROM cursos ORDER BY nome ASC');
    cursos.forEach(curso => {
        curso.valor = format.valor(curso.valor);
    })
    return cursos;
}

async function postCurso(body) {
    await conn.execute('INSERT INTO cursos (nome, cod, valor, cobranca) VALUES (?, ?, ?, ?)', [body.nome, body.cod, body.valor, body.cobranca]);
}

async function deleteCurso(id) {
    await conn.execute('DELETE FROM cursos WHERE id = ?', [id]);
}

async function getCurso(id) {
    const [dados] = await conn.execute('SELECT * FROM cursos WHERE id = ?', [id]);
    dados[0].valor = format.valor(dados[0].valor);
    return dados[0];
}

async function patchCurso(body, id) {
    const campos = [];
    const valores = [];

    if (body.nome !== undefined) {
        campos.push('nome = ?');
        valores.push(body.nome);
    }
    if (body.cod !== undefined) {
        campos.push('cod = ?');
        valores.push(body.cod);
    }
    if (body.valor !== undefined) {
        campos.push('valor = ?');
        valores.push(body.valor);
    }
    if (body.cobranca !== undefined) {
        campos.push('cobranca = ?');
        valores.push(body.cobranca);
    }

  valores.push(id);

  if (campos.length > 0) {
    await conn.execute(`UPDATE cursos SET ${campos.join(', ')} WHERE id = ?`, valores);
  } else {
    return 'Nenhum campo foi modificado.';
  }
}

module.exports = {
    getCursos,
    postCurso,
    deleteCurso,
    getCurso,
    patchCurso
}