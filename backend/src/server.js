const express = require('express');
const cors = require('cors');
const studentsRouter = require('./routes/students.routes');
const coursesRouter = require('./routes/courses.routes');
const classesRouter = require('./routes/classes.routes');
const errorHandler = require('./middlewares/error.middleware');
require('dotenv').config();

const app = express();

// middlewares globais
app.use(cors());
app.use(express.json());

// registra os modulos principais da api por contexto de negocio
app.use('/api/manage-students', studentsRouter);
app.use('/api/manage-courses', coursesRouter);
app.use('/api/manage-classes', classesRouter);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// sobe o servidor na porta configurada no ambiente
app.listen(PORT);