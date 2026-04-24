const connection = require('../config/db');

// Service: isola o acesso ao banco para manter a regra de negócio fora da rota/controller.
function buscarTodosOsAlunos() {
  // Adapta o callback do mysql2 para Promise, permitindo uso com async/await.
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM alunos', (error, rows) => {
      if (error) {
        return reject(error);
      }

      resolve(rows);
    });
  });
}

module.exports = { buscarTodosOsAlunos };