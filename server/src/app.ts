import 'reflect-metadata'; // before any other dependency

import { enableHTTP, enableSSL } from '@config';
import { modeTag } from '@config/';
import { AbstractLoader } from '@interfaces/loader';
import { DependencyInjectorLoaders, JobsLoaders, ServerLoaders } from '@loaders/';
import { AppLoader } from '@loaders/app';
import { emitter } from '@loaders/events';
import { default as defaultLogger } from '@loaders/logger';
import { eventsDIKey, loggerDIKey, zalgoOnEventKey } from '@strings/keys';
import { appLoadWelcome, initAllLoaders } from '@strings/logging';

function welcome() {
    defaultLogger.info(appLoadWelcome);
    defaultLogger.info(`Running in ${modeTag} mode`);
    defaultLogger.info(initAllLoaders);
}

async function start() {
    new DependencyInjectorLoaders.TypeDILoader([
        { key: eventsDIKey, value: emitter },
        { key: loggerDIKey, value: defaultLogger },
    ])
        .concurrently(
            new JobsLoaders.AgendaLoader(),
            new ServerLoaders.ExpressLoader().concurrently(
                ...getHttpSSLServers(),
            ),
        )
        .start()
        .then(() => {
            emitter.emit(zalgoOnEventKey);
        })
        .catch((err) => {
            defaultLogger.error(`App loader failed: \n\n${err.stack}`);
        });
}

function getHttpSSLServers() {
    const servers: AbstractLoader<void | any>[] = [];
    if (enableHTTP) servers.push(new ServerLoaders.HttpLoader());
    if (enableSSL) servers.push(new ServerLoaders.SslLoader());
    return servers;
}

welcome();
start();
