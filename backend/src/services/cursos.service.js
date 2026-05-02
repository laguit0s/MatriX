const conn = require('../config/db');

async function getCursos() {
    const [cursos] = await conn.query('SELECT * FROM cursos ORDER BY nome ASC');
    return cursos;
}

module.exports = {
    getCursos
}