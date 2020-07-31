import express from 'express';
import 'express-async-errors';
import cors from 'cors';

import AppError from './errors/AppError.js';
import routes from './routes/index.js';

const app = express();

app.use(express.json());
app.use(cors());

app.use((request, _response, next) => {
  const {method, url } = request;

  const logLabel = `[${method.toUpperCase()}] ${url}`

  logger.info(logLabel);
  console.time(logLabel);
  
  next();

  console.timeEnd(logLabel);
})

app.use(routes);

app.use((err, request, response, _next) => {
  if (err instanceof AppError) {
    logger.error(`${request.method} ${request.originalUrl} - ${err.message}`)
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.log(err);

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

export default app;