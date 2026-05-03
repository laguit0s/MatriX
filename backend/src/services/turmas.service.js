const conn = require('../config/db');

async function getTurmas() {
    const [dados] = await conn.query('SELECT * FROM turmas');
    return dados;
}

module.exports = {
    getTurmas
}