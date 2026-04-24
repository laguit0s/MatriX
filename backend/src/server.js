const express = require('express');
const cors = require('cors');
const alunosRouter = require('./routes/alunos.routes');
require('dotenv').config();

const app = express();

// Habilita CORS e leitura de JSON no corpo das requests.
app.use(cors());
app.use(express.json());

// Prefixo base do recurso de alunos.
app.use('/api/gerenciar-alunos', alunosRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});