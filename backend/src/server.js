const express = require('express');
const cors = require('cors');
const routerAlunos = require('./routes/alunos.routes');
require('dotenv').config();

const app = express();

// habilita cors e leitura json
app.use(cors());
app.use(express.json());

// rota principal de alunos
app.use('/api/gerenciar-alunos', routerAlunos);

const PORT = process.env.PORT || 5000;

// inicia o servidor
app.listen(PORT);