import https from 'https';

import { ssl } from '@config/';
import { AbstractLoader } from '@interfaces/loader';
import { ServerAppType } from '@localtypes/injectionAliases';
import { badSSLConfig } from '@strings/logging';

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

    public async start(_prevResult: any) {
        this.app = _prevResult as ServerAppType;
        super.start();
    }

    protected inject() {
        super.inject();
        //this.app = getDependency<ServerAppType>(serverAppDIKey);
    }

    protected done() {
        super.done();
        this.log.info(`SSL is LIVE on port ${this.port}`);
    }
}
