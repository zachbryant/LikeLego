import winston, { transport } from 'winston';
import { isDevelopment, logs } from '@config';

const transports = [];
if (isDevelopment) {
    transports.push(new winston.transports.Console());
} else {
    transports.push(
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.cli(),
                winston.format.splat(),
            ),
        }),
    );
}

const log = winston.createLogger({
    level: logs.level.toString(),
    levels: winston.config.npm.levels,
    format: winston.format.combine(
        winston.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss',
        }),
        winston.format.errors({ stack: true }),
        winston.format.splat(),
        winston.format.json(),
    ),
    transports,
});

export default log;
