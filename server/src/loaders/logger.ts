import path from 'path';
import winston from 'winston';

import { isDevelopment } from '@config';

const DailyRotateFile = require('winston-daily-rotate-file');

const logDir = 'logs';
const format = (() => {
    let formats = [
        winston.format.splat(),
        winston.format.errors({ stack: true }),
        winston.format.timestamp(),
    ];
    if (isDevelopment) {
        formats = formats.concat([
            winston.format.prettyPrint({ colorize: true }),
        ]);
    } else {
        formats = formats.concat([winston.format.cli()]);
    }
    return {
        format: winston.format.combine(...formats),
    };
})();

const dailyRotateFileTransport = (filename: string, level?: string) =>
    new DailyRotateFile({
        filename: `${logDir}/%DATE%-${filename}.log`,
        maxSize: '1g',
        maxDays: '3d',
        zippedArchive: true,
        datePattern: 'YYYY-MM-DD',
        level,
    });

const transports: winston.transport[] = [
    dailyRotateFileTransport('combined', 'info'),
    dailyRotateFileTransport('error', 'error'),
    new winston.transports.Console(format),
];

export const log = winston.createLogger({
    levels: winston.config.syslog.levels,
    transports,
});
