const conn = require('../config/db');

async function getCursos() {
    const [cursos] = await conn.query('SELECT * FROM cursos ORDER BY nome ASC');
    return cursos;
}

async function postCurso(body) {
    await conn.execute('INSERT INTO cursos (nome, cod, valor, cobranca) VALUES (?, ?, ?, ?)', [body.nome, body.cod, body.valor, body.cobranca]);
}

async function deleteCurso(id) {
    await conn.execute('DELETE FROM cursos WHERE id = ?', [id]);
}

module.exports = {
    getCursos,
    postCurso,
    deleteCurso
}