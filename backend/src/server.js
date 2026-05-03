const express = require('express');
const cors = require('cors');
const routerAlunos = require('./routes/alunos.routes');
const routerCursos = require('./routes/cursos.routes');
const routerTurmas = require('./routes/turmas.routes');
require('dotenv').config();

const app = express();

// habilita cors e leitura json
app.use(cors());
app.use(express.json());

// rota principal de alunos
app.use('/api/gerenciar-alunos', routerAlunos);
app.use('/api/gerenciar-cursos', routerCursos);
app.use('/api/gerenciar-turmas', routerTurmas);

const PORT = process.env.PORT || 5000;

// inicia o servidor
app.listen(PORT);