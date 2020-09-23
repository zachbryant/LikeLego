import log from '@loaders/logger';
import 'reflect-metadata';
import { isDevelopment, port, ssl } from '@config';
const http = require('http');
const https = require('https');
const express = require('express');

async function start() {
    const modeTag = `[${isDevelopment ? 'DEVELOPMENT' : 'PRODUCTION'}]`;

    const app = express();
    const credentials = ssl.credentials;

    let httpServer = http.createServer(app);
    httpServer.listen(port);
    log.info(`
        ################${modeTag}################
            Server is running on port ${port}
        ###########################################
    `);
    if (credentials.key && credentials.cert) {
        let httpsServer = https.createServer(ssl.credentials, app);
        httpsServer.listen(ssl.port);
        log.info(`
        ################${modeTag}################
            SSL is available on port ${port}
        ###########################################
        `);
    }
}

start();
