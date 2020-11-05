import * as winstonLib from 'winston';

import { isDevelopment, log as logConfig } from '@config';

const DailyRotateFile = require('winston-daily-rotate-file');

const colorizer = winstonLib.format.colorize({
    all: isDevelopment ? true : undefined,
});

const formatList = (() => {
    let formats = [
        winstonLib.format.errors({ stack: true }),
        winstonLib.format.timestamp(),
    ];
    if (isDevelopment) {
        formats = formats.concat([colorizer]);
    }
    return formats;
})();

const consoleFormat = winstonLib.format.printf((info) => {
    let timestamp = info.timestamp.slice(info.timestamp.indexOf('T') + 1);
    return `${timestamp} [${info.level}] ${
        // HACK - error color around everything just to get coloring on the stack
        colorizer.colorize(
            'error',
            Boolean(info.stack) ? info.stack : info.message,
        )
    }`;
});

const dailyRotateFileTransport = (filename: string, level?: string) =>
    new DailyRotateFile({
        filename: `${logConfig.dir}/%DATE%-${filename}.log`,
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
    transports,
    exceptionHandlers: transports,
});
export type WinstonLoggerType = winstonLib.Logger;
