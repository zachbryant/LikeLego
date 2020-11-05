import { AbstractLoader } from '@interfaces/loader';

export class FeathersLoader extends AbstractLoader<void> {
    constructor() {
        super();
    }

    async load() {
        throw new Error('Method not implemented.');
        this.done();
    }
}
