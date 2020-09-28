import { log } from '@loaders/logger';

export abstract class AbstractLoader<T> {
    loaderName: string;

    constructor() {
        this.loaderName = this.constructor['name'];
    }

    abstract async init(): Promise<T>;

    protected done(): void {
        log.debug(`${this.loaderName} initialized`);
    }
}
