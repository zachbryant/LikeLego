import express from 'express';

import { log } from '@loaders/logger';
import { AbstractLoader } from '@models/interfaces/loaderInterface';
import { debugStrings } from '@strings/';

import { ExpressLoader } from './express';

export class AppLoader extends AbstractLoader<void | any> {
    private app: express.Application = express();
    private loaders;

    constructor() {
        super();
        this.loaders = [new ExpressLoader(this.app)];
    }

    init(): Promise<void | any> {
        log.debug(debugStrings.initAllLoaders);
        return new Promise((resolve, reject) => {
            for (let loader of this.loaders) {
                loader.init().catch((onRejected) => {
                    reject(onRejected);
                });
            }
            log.debug(debugStrings.doneAllLoaders);
            resolve(this.app);
        });
    }
}
