import express from 'express';

// import gradesRouter from './grades.routes.js';
import accountsRouter from './accounts.routes.js';

const { Router } = express;

const routes = Router();

routes.use('/accounts', accountsRouter);

export default routes;
