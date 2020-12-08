import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

import { boolValue, ensureStartSlash } from '@utils';

const envFound = dotenv.config();
if (envFound.error) {
    throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export const db = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    pass: process.env.DB_PASS,
};

export const mail = {
    host: process.env.MAIL_HOST,
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
};

export const ssl = {
    credentials: {
        key: fs.readFileSync(path.resolve(__dirname, './ssl/key.pem'), 'utf-8'),
        cert: fs.readFileSync(
            path.resolve(__dirname, './ssl/cert.pem'),
            'utf-8',
        ),
        passphrase: process.env.SSL_PASS,
    },
    port: process.env.SSL_PORT || 8443,
};

export const agenda = {
    concurrency: Number(process.env.AGENDA_CONCURRENCY),
    poolTime: process.env.AGENDA_POOL_TIME,
    dbUrl: process.env.AGENDA_MONGO_URL,
    dbCollection: process.env.AGENDA_DB_COLLECTION,
};

export const agendash = {
    user: process.env.AGENDA_USER,
    pass: process.env.AGENDA_PASS,
};

export const api = {
    prefix: ensureStartSlash(process.env.API_PREFIX || '/api'),
};

export const isDevelopment = process.env.NODE_ENV || true;
export const modeTag = isDevelopment ? 'DEVELOPMENT' : 'PRODUCTION';

export const host = process.env.HOST || 'localhost';
export const httpPort = process.env.PORT || 8080;

export const hasCompression = boolValue(process.env.COMPRESSION);
export const hasCors = boolValue(process.env.CORS);
export const enableHTTP = boolValue(process.env.HTTP);
export const enableSSL = Object.values(ssl).every(
    (val) => val !== undefined && val !== null,
);

export const log = {
    level: isDevelopment
        ? process.env.LOG_LEVEL_DEV
        : process.env.LOG_LEVEL_PROD,
    dir: process.env.LOG_PATH || 'logs',
};
