import { AbstractLoader } from '@interfaces/loader';

export class HapiLoader extends AbstractLoader<void> {
    constructor() {
        super();
    }

    load(): Promise<void> {
        throw new Error('Method not implemented.');
        this.done();
    }
}
