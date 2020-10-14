import https from 'https';

import { ssl } from '@config/';
import { AbstractLoader } from '@interfaces/loader';
import { serverAppDIKey } from '@strings/keys';
import { badSSLConfig } from '@strings/logging';
import { getDependency } from '@utils/';

export class SslLoader extends AbstractLoader<https.Server> {
    private app;

    constructor(public port = ssl.port, loadAsync = true) {
        super(loadAsync);
    }

    async load() {
        const { key, cert, passphrase } = ssl.credentials;
        if (key && cert && passphrase) {
            let sslServer = https.createServer(ssl.credentials, this.app);
            sslServer.listen(this.port);
            this.done();
            return sslServer;
        } else {
            return Promise.reject(badSSLConfig);
        }
    }

    protected inject() {
        super.inject();
        this.app = getDependency(serverAppDIKey);
    }

    protected done() {
        super.done();
        this.log.info(`SSL is available on port ${this.port}`);
    }
}
