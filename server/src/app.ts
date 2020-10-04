import 'reflect-metadata'; // before any other dependency

import { enableHttp, isDevelopment, ssl } from '@config';
import { AppLoader } from '@loaders';
import { log } from '@loaders/logger';

const modeTag = isDevelopment ? 'DEVELOPMENT' : 'PRODUCTION';

async function start() {
    process.on('unhandledRejection', (error) => {
        log.error('Unhandled promise rejection:', error);
    });

    new AppLoader()
        .load()
        .catch((reject) => {
            log.error(reject);
        })
        .then((app) => {
            listen(app);
        });
}

function listen(app: Express.Application) {
    if (enableHttp) {
        const http = require('http');
        const port = process.env.PORT;
        let httpServer = http.createServer(app);
        httpServer.listen(port);
        log.info(`[${modeTag}] HTTP is available on port ${port}`);
    }

    const https = require('https');
    const credentials = ssl.credentials;
    if (credentials.key && credentials.cert) {
        let httpsServer = https.createServer(ssl.credentials, app);
        httpsServer.listen(ssl.port);
        log.info(`[${modeTag}] SSL is available on port ${ssl.port}`);
    }
}

start();
