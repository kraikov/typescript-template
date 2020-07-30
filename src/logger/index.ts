import { transports, createLogger } from 'winston';
import { Config, consoleFormat, fileFormat } from './config';

const logger = createLogger({
    exitOnError: false,
    levels: Config.levels,
    transports: [
        new transports.Console({ format: consoleFormat }),

        new transports.File({ filename: `${__dirname}/../../logs/combined.log`, format: fileFormat }),

        new transports.File({ filename: `${__dirname}/../../logs/error.log`, format: fileFormat, level: 'error' }),
    ],
});

export default logger;
