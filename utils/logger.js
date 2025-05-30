import { createLogger, format, transports } from 'winston';

const { combine, timestamp, printf } = format;

export const logger = createLogger({
    level: 'info',
    format: combine(
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        printf(({ level, message, timestamp }) => `[${timestamp}] ${level.toUpperCase()}: ${message}`)
    ),
    transports: [
        new transports.Console(), // Logs to console
        new transports.File({ filename: './logs/app.log' })
    ]
});

export const error = (message) => logger.error(message);
export const warn = (message) => logger.warn(message);
export const info = (message) => logger.info(message);
export const verbose = (message) => logger.verbose(message);
export const debug = (message) => logger.debug(message);
export const silly = (message) => logger.silly(message);