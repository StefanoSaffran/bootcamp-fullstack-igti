import winston from 'winston';

import app from './app.js';

const { combine, timestamp, label, printf } = winston.format;

const myFormat = printf(
  ({ level, message, label: labelPrintf, timestamp: timestampPrintf }) => {
    return `${timestampPrintf} [${labelPrintf}] ${level}: ${message}`;
  },
);

global.logger = winston.createLogger({
  level: 'silly',
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'grades-control.log' }),
  ],
  format: combine(label({ label: 'grades-control' }), timestamp(), myFormat),
});

app.listen(process.env.PORT || 3333, async () => {
  try {
    console.log(`🚀 Server running on port 3333!`);
    global.logger.info('🚀 Server running on port 3333!');
  } catch (err) {
    global.logger.error(err);
  }
});
