import express from 'express';
const { Router } = express;

import GradesController from '../controllers/GradesController.js';
import AverageGradeController from '../controllers/AverageGradeController.js';
import TopGradesController from '../controllers/TopGradesController.js';

const gradesRouter = Router();

gradesRouter.get('/average', AverageGradeController.index);

gradesRouter.get('/top-grades', TopGradesController.index);

gradesRouter.post('/', GradesController.create);
gradesRouter.get('/:id', GradesController.show);
gradesRouter.put('/:id', GradesController.update);
gradesRouter.delete('/:id', GradesController.delete);


export default gradesRouter;