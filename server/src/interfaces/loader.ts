import { Bag, Queue } from 'typescript-collections';

import { default as defaultLogger } from '@/loaders/logger';
import { LogHandlerType } from '@localtypes/injectionAliases';
import { loggerDIKey } from '@strings/keys';
import { getClassName, setDependency } from '@utils/';

/**
 * Supporting class of the loader layer. Provides an entrypoint, and
 * ensures a promise comes back for chaining. Comes with logging helpers.
 */
export abstract class AbstractLoader<ResultType = void> {
    public loaderName: string;

    protected log: LogHandlerType;

    private chainedLoaders: AbstractLoader[];
    private concurrentLoaders: AbstractLoader[];

    constructor() {
        this.loaderName = getClassName(this);
        this.chainedLoaders = [];
        this.concurrentLoaders = [];
    }

    protected abstract async load();

    protected loadChained(res?: ResultType) {
        this.chainedLoaders.reduce(
            (
                prevPromise: Promise<void | any>,
                currentLoader: AbstractLoader<void | any>,
            ) => {
                return prevPromise.then(() => currentLoader.start(res));
            },
            Promise.resolve(),
        );
    }

    protected loadConcurrent(res?: ResultType) {
        const promisePool = this.concurrentLoaders.map((_) => _.start(res));
        return Promise.all(promisePool);
    }

    /** Overridable stub for graceful shutdown handling */
    protected async stop() {}

    /** Prepares loaders to be run in order after `this` has finished loading. */
    public chainAfter(...loaders): AbstractLoader<ResultType> {
        loaders.forEach((_) => this.chainedLoaders.push(_));
        return this;
    }

    /** Prepares loaders to be run concurrently after `this` has finished loading. */
    public concurrentlyAfter(...loaders): AbstractLoader<ResultType> {
        loaders.forEach((_) => this.concurrentLoaders.push(_));
        return this;
    }

    protected inject() {
        setDependency(loggerDIKey, defaultLogger);
        this.log = defaultLogger;
    }

    public async start(_prevResult?: any) {
        try {
            defaultLogger.info(`Loading ${this.loaderName}...`);
            this.inject();
            const res: ResultType = await this.load();
            this.done();
            await this.loadChained(res);
            await this.loadConcurrent(res);
        } catch (err) {
            this.failed(err);
        }
    }

    protected done() {
        process.on('SIGTERM', this.stop);
        process.on('SIGINT', this.stop);
        this.log.info(`${this.loaderName} done`);
    }

    protected failed(err) {
        this.log.error(`${this.loaderName} failed: \n${err}`);
    }
}
