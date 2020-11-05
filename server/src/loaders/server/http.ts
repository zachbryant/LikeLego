import http from 'http';

import { httpPort } from '@config/';
import { AbstractLoader } from '@interfaces/loader';
import { ServerAppType } from '@localtypes/injectionAliases';
import { serverAppDIKey } from '@strings/keys';
import { getDependency } from '@utils/';

export type HttpServerType = http.Server;
export class HttpLoader extends AbstractLoader<HttpServerType> {
    private app: ServerAppType;

    constructor(public port = httpPort) {
        super();
    }

    load(): Promise<http.Server> {
        return new Promise((resolve) => {
            let httpServer = http.createServer(this.app);
            httpServer.listen(this.port);
            resolve(httpServer);
        });
    }

    protected inject() {
        super.inject();
        this.app = getDependency<ServerAppType>(serverAppDIKey);
    }

    protected done() {
        super.done();
        this.log.info(`HTTP (insecure) is available on port ${this.port}`);
    }
}
