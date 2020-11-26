import 'reflect-metadata'; // before any other dependency

import { enableHTTP, enableSSL } from '@config';
import { AbstractLoader } from '@interfaces/loader';
import { DatabaseLoaders, DependencyInjectorLoaders, JobsLoaders, ServerLoaders } from '@loaders/';
import { emitter } from '@loaders/events';
import { GreeterLoader } from '@loaders/greeter';
import { default as defaultLogger } from '@loaders/logger';
import { eventsDIKey, loggerDIKey, zalgoOnEventKey } from '@strings/keys';

import { getDependencyOrDefault } from './utils';

let log = defaultLogger;

async function loadDependencies() {
    await new DependencyInjectorLoaders.TypeDILoader([
        { key: eventsDIKey, value: emitter },
        { key: loggerDIKey, value: defaultLogger },
    ]).start();
}

async function start() {
    loadDependencies();
    log = getDependencyOrDefault(loggerDIKey, defaultLogger);
    new GreeterLoader()
        .concurrentlyAfter(
            new JobsLoaders.AgendaLoader(),
            //new DatabaseLoaders.KnexLoader(),
            new ServerLoaders.ExpressLoader().concurrentlyAfter(
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

start();
