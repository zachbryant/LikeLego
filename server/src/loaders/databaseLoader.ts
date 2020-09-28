import { AbstractLoader } from '@models/interfaces/loaderInterface';

export class DatabaseLoader extends AbstractLoader<void> {
    init(): Promise<void> {
        throw new Error('Method not implemented.');
        this.done();
    }
}
