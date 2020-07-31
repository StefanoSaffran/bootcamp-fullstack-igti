import {promises as fs} from "fs";
const { readFile } = fs;
import winston from 'winston';

import app from './app.js';

global.fileName = 'grades.json';

const { combine, timestamp, label, printf } = winston.format;
const myFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
});

global.logger = winston.createLogger({
    level: 'silly',
    transports: [
        new (winston.transports.Console)(),
        new (winston.transports.File)({ filename: 'grades-control.log' })
    ],
    format: combine(
        label({ label: 'grades-control'}),
        timestamp(),
        myFormat
    )
});

app.listen(3333, async () => {    
  try {
    await readFile(global.fileName);
    console.log(`🚀 Server running on port 3333!`);
    logger.info("🚀 Server running on port 3333!");
  } catch (err) {
    logger.error(err);
  };
});
