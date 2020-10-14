import { modeTag } from '@config/';
import { AbstractLoader } from '@interfaces/loader';
import { winston as log } from '@loaders/logger/winston';
import { logStrings } from '@strings/';

/**
 * This is the main loader, which loads all other loaders.
 * Loaders marked synchronous will be loaded as such, and others
 * will be loaded concurrently.
 */
type VoidAny = void | any;
export class AppLoader extends AbstractLoader<VoidAny> {
    private asyncLoaders;
    private syncLoaders;

    constructor(loaders: AbstractLoader<VoidAny>[]) {
        super();
        loaders = loaders.filter(Boolean);
        this.syncLoaders = loaders.filter((l) => !l.loadAsync);
        this.asyncLoaders = loaders.filter((l) => l.loadAsync);
    }

    async load() {
        log.info(`Server is running in ${modeTag} mode`);
        log.info(logStrings.initAllLoaders);

        await this.loadSynchronous();

        const loaderPromises = this.asyncLoaders.map((loader) =>
            loader.start(),
        );
        return Promise.all(loaderPromises)
            .then(() => {
                log.info(logStrings.doneAllLoaders);
            })
            .catch(this.failed);
    }

    async loadSynchronous() {
        await this.syncLoaders.reduce(
            (
                prevPromise: Promise<VoidAny>,
                curLoader: AbstractLoader<VoidAny>,
            ) => {
                return prevPromise.then(() => curLoader.start());
            },
            Promise.resolve(),
        );
    }

    protected inject() {
        super.inject();
    }
}
