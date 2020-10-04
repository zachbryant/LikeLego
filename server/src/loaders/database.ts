import { AbstractLoader } from '@interfaces/loader';

export class DatabaseLoader extends AbstractLoader<void> {
    load(): Promise<void> {
        throw new Error('Method not implemented.');
        this.done();
    }
}
