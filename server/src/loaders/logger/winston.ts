import * as winstonLib from 'winston';

import { isDevelopment, log as logConfig } from '@config';

const DailyRotateFile = require('winston-daily-rotate-file');

const logDir = 'logs';
const formatList = (() => {
    let formats = [
        winstonLib.format.splat(),
        winstonLib.format.errors({ stack: true }),
        winstonLib.format.timestamp(),
    ];
    if (isDevelopment) {
        formats = formats.concat([
            winstonLib.format.prettyPrint({ colorize: true }),
        ]);
    } else {
        formats = formats.concat([winstonLib.format.cli()]);
    }
    return formats;
})();

const consoleFormat = winstonLib.format.printf((info) => {
    const date = new Date();
    const hour = date.getUTCHours();
    const min = date.getUTCMinutes();
    const sec = date.getUTCSeconds();
    const ms = date.getUTCMilliseconds();
    return `[${hour}:${min}:${sec}-${ms}] [${info.level.toUpperCase()}] ${
        info.message
    }`;
});

const dailyRotateFileTransport = (filename: string, level?: string) =>
    new DailyRotateFile({
        filename: `${logDir}/%DATE%-${filename}.log`,
        maxSize: '1g',
        maxDays: '3d',
        zippedArchive: true,
        datePattern: 'YYYY-MM-DD',
        level,
        format: winstonLib.format.combine(...formatList),
    });
const transports: winstonLib.transport[] = [
    dailyRotateFileTransport('combined', 'info'),
    dailyRotateFileTransport('error', 'error'),
    new winstonLib.transports.Console({
        level: logConfig.level,
        format: winstonLib.format.combine(...formatList, consoleFormat),
    }),
];

export const winston = winstonLib.createLogger({
    levels: winstonLib.config.npm.levels,
    transports,
});
