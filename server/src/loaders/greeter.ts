import { modeTag } from '@config/';
import { AbstractLoader } from '@interfaces/loader';
import { appLoadWelcome, initAllLoaders } from '@strings/logging';

/**
 * This loader is used as a jumping-off point for the rest of the app.
 */
export class GreeterLoader extends AbstractLoader {
    constructor() {
        super();
    }

    async load() {
        this.log.info(appLoadWelcome);
        this.log.info(`Running in ${modeTag} mode`);
        this.log.info(initAllLoaders);
    }
}
