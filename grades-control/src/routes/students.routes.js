import express from 'express';
const { Router } = express;

import StudentController from '../controllers/StudentController.js';

const studentsRouter = Router();

studentsRouter.get('/', StudentController.show);

export default studentsRouter;