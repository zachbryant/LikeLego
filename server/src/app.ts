import 'reflect-metadata'; // before any other dependency

import { enableHTTP, enableSSL } from '@config';
import { AbstractLoader } from '@interfaces/loader';
import { DatabaseLoaders, DependencyInjectorLoaders, JobsLoaders, ServerLoaders } from '@loaders/';
import { AppLoader } from '@loaders/app';
import { emitter } from '@loaders/events';
import { default as defaultLogger } from '@loaders/logger';
import { eventsDIKey, loggerDIKey, zalgoOnEventKey } from '@strings/keys';

async function start() {
    new AppLoader()
        .chainAfter(
            new DependencyInjectorLoaders.TypeDILoader([
                { key: eventsDIKey, value: emitter },
                { key: loggerDIKey, value: defaultLogger },
            ]).concurrentlyAfter(
                new JobsLoaders.AgendaLoader(),
                new DatabaseLoaders.KnexLoader(),
                new ServerLoaders.ExpressLoader().concurrentlyAfter(
                    ...getHttpSSLServers(),
                ),
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
