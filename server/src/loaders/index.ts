import express from 'express';

import { AbstractLoader } from '@interfaces/loader';
import { log } from '@loaders/logger';
import { debugStrings } from '@strings/';

import { ExpressLoader } from './server';

/**
 * This is the main loader, which loads all other loaders in specified order.
 */
export class AppLoader extends AbstractLoader<void | any> {
    private app: express.Application = express();
    private loaders;

    constructor() {
        super();
        this.loaders = [new ExpressLoader(this.app)];
    }

    load(): Promise<void | any> {
        log.info(debugStrings.initAllLoaders);

        const loaderPromises = this.loaders.map((loader) => loader.start());

        return Promise.all(loaderPromises)
            .then(() => {
                log.info(debugStrings.doneAllLoaders);
            })
            .catch((onRejected) => {
                return Promise.reject(onRejected);
            });
    }
}
