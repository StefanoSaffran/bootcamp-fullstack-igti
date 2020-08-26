import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import 'express-async-errors';

import AppErrors from './errors/AppErrors.js';
import routes from './routes/index.js';

dotenv.config();

const app = express();

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    global.logger.info('connected to MongoDB');
  })
  .catch(error => {
    global.logger.error('error connection to MongoDB:', error.message);
  });

app.use(express.json());

app.use((request, _response, next) => {
  const { method, url } = request;

  const logLabel = `[${method.toUpperCase()}] ${url}`;

  global.logger.info(logLabel);
  console.time(logLabel);

  next();

  console.timeEnd(logLabel);
});

app.use(routes);

app.use((err, request, response, _next) => {
  if (err instanceof AppErrors) {
    global.logger.error(
      `${request.method} ${request.originalUrl} - ${err.message}`,
    );
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
