import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import winston from 'winston';

import { ensureStartSlash } from '@utils/';

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
    concurrency: process.env.AGENDA_CONCURRENCY,
    poolTime: process.env.AGENDA_POOL_TIME,
    dbCollection: process.env.AGENDA_DB_COLLECTION,
};

export const agendash = {
    user: process.env.AGENDA_USER,
    pass: process.env.AGENDA_PASS,
};

export const api = {
    prefix: ensureStartSlash(process.env.API_PREFIX || '/api'),
};

export const isDevelopment = process.env.NODE_ENV || 'development';
export const host = process.env.HOST || 'localhost';
export const port = process.env.PORT || 8080;
