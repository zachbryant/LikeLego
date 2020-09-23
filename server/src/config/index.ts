import dotenv from 'dotenv';

const envFound = dotenv.config();
if (envFound.error) {
    throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

import { default as db } from './db.conf';
import { default as mail } from './mail.conf';
import { default as ssl } from './ssl.conf';
import { default as agenda } from './agenda.conf';
import { default as agendash } from './agendash.conf';
import { default as logs } from './logs.conf';

export const isDevelopment = process.env.NODE_ENV || 'development';
export const host = process.env.host || 'localhost';
export const port = process.env.port || 8080;
export { db, mail, ssl, agenda, agendash, logs };
