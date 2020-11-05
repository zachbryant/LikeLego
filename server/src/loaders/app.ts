import { modeTag } from '@config/';
import { AbstractLoader } from '@interfaces/loader';
import { logStrings } from '@strings/';
import { appLoadWelcome } from '@strings/logging';

type VoidAny = void | any;

/**
 * @deprecated
 * This is the main loader, which loads all other loaders.
 * Loaders marked synchronous will be loaded as such, and others
 * will be loaded concurrently.
 */
export class AppLoader extends AbstractLoader<VoidAny> {
    private asyncLoaders;
    private syncLoaders;

    constructor(loaders: AbstractLoader<VoidAny>[]) {
        super();
        loaders = loaders.filter(Boolean);
        //this.syncLoaders = loaders.filter((l) => !l.loadAsync);
        //this.asyncLoaders = loaders.filter((l) => l.loadAsync);
    }

    async load() {
        this.welcome();
        this.log.info(`Running in ${modeTag} mode`);
        this.log.info(logStrings.initAllLoaders);

        await this.loadSynchronous();

        const loaderPromises = this.asyncLoaders.map((loader) =>
            loader.start(),
        );
        return Promise.all(loaderPromises)
            .then(() => {
                this.log.info(logStrings.doneAllLoaders);
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

    private welcome() {
        this.log.info(appLoadWelcome);
    }
}
