const express = require('express');
const cors = require('cors');
const studentsRouter = require('./routes/students.routes');
const coursesRouter = require('./routes/courses.routes');
const classesRouter = require('./routes/classes.routes');
require('dotenv').config();

const app = express();

// habilita cors e leitura json
app.use(cors());
app.use(express.json());

// route handlers
app.use('/api/manage-students', studentsRouter);
app.use('/api/manage-courses', coursesRouter);
app.use('/api/manage-classes', classesRouter);

const PORT = process.env.PORT || 5000;

// inicia o servidor
app.listen(PORT);
