import express from 'express';
const { Router } = express;

import gradesRouter from './grades.routes.js';
import studentsRouter from './students.routes.js';

const routes = Router();

routes.use('/grades', gradesRouter);
routes.use('/students', studentsRouter);

export default routes;