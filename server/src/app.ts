import 'reflect-metadata'; // before any other dependency

import { isDevelopment, ssl } from '@config';
import { AppLoader } from '@loaders';
import { log } from '@loaders/logger';

const modeTag = isDevelopment ? 'DEVELOPMENT' : 'PRODUCTION';

async function start() {
    process.on('unhandledRejection', (error) => {
        log.error('Unhandled promise rejection:', error);
    });

    new AppLoader()
        .init()
        .catch((reject) => {
            log.error(reject);
        })
        .then((app) => {
            listen(app);
        });
}

function listen(app: Express.Application) {
    /*const http = require('http');
    const port = process.env.PORT;
    let httpServer = http.createServer(app);
    httpServer.listen(port);
    log.info(`[${modeTag}]  Server is running on port ${port}`);*/

    const https = require('https');
    const credentials = ssl.credentials;
    if (credentials.key && credentials.cert) {
        let httpsServer = https.createServer(ssl.credentials, app);
        httpsServer.listen(ssl.port);
        log.info(`[${modeTag}]  SSL is available on port ${ssl.port}`);
    }
}

start();
