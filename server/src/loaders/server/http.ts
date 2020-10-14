import http from 'http';

import { httpPort } from '@config/';
import { AbstractLoader } from '@interfaces/loader';
import { serverAppDIKey } from '@strings/keys';
import { getDependency } from '@utils/';

export class HttpLoader extends AbstractLoader<http.Server> {
    private app;

    constructor(public port = httpPort, loadAsync = true) {
        super(loadAsync);
    }

    load(): Promise<http.Server> {
        return new Promise((resolve) => {
            let httpServer = http.createServer(this.app);
            httpServer.listen(this.port);
            this.done();
            resolve(httpServer);
        });
    }

    protected inject() {
        super.inject();
        this.app = getDependency(serverAppDIKey);
    }

    protected done() {
        super.done();
        this.log.info(`HTTP (insecure) is available on port ${this.port}`);
    }
}
