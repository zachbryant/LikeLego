import https from 'https';

import { ssl } from '@config/';
import { AbstractLoader } from '@interfaces/loader';
import { ServerAppType } from '@localtypes/injectionAliases';
import { serverAppDIKey } from '@strings/keys';
import { badSSLConfig } from '@strings/logging';
import { getDependency } from '@utils/';

export type SslServerType = https.Server;
export class SslLoader extends AbstractLoader<SslServerType> {
    private app: ServerAppType;

    constructor(public port = ssl.port) {
        super();
    }

    async load() {
        const { key, cert, passphrase } = ssl.credentials;
        if (key && cert && passphrase) {
            let sslServer = https.createServer(ssl.credentials, this.app);
            sslServer.listen(this.port);
            return sslServer;
        } else {
            return Promise.reject(badSSLConfig);
        }
    }

    protected inject() {
        super.inject();
        this.app = getDependency<ServerAppType>(serverAppDIKey);
    }

    protected done() {
        super.done();
        this.log.info(`SSL is available on port ${this.port}`);
    }
}
