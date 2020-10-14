import { Container } from 'typedi';

import { winston as log } from '@loaders/logger';
import { loggerDIKey } from '@strings/keys';
import { getDependencyOrDefault } from '@utils/';

/**
 * Supporting class of the loader layer. Provides an entrypoint, and
 * ensures a promise comes back for chaining. Comes with logging helpers.
 */
export abstract class AbstractLoader<T = void> {
    public loaderName: string;
    protected log;

    constructor(public loadAsync = true) {
        this.loaderName = this.constructor['name'];
    }

    protected abstract async load(): Promise<T>;

    protected inject() {
        this.log = getDependencyOrDefault(
            loggerDIKey,
            import('@loaders/logger'),
        );
    }

    public start(): Promise<T> {
        log.info(`Loading ${this.loaderName}...`);
        this.inject();
        return this.load();
    }

    protected done() {
        log.info(`${this.loaderName} done`);
    }

    protected failed(err) {
        log.error(`${this.loaderName} failed: \n${err}`);
    }
}
