import { log } from '@loaders/logger';

export abstract class AbstractLoader<T = void> {
    public loaderName: string;

    constructor() {
        this.loaderName = this.constructor['name'];
    }

    abstract async load(): Promise<T>;

    protected start(): Promise<T> {
        log.debug(`Loading ${this.loaderName}...`);
        return this.load();
    }

    protected done() {
        log.debug(`Finished loading ${this.loaderName}`);
    }

    protected failed(err) {
        log.error(`Failed to load ${this.loaderName}: ${err}`);
    }
}
