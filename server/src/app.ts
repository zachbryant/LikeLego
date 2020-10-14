import 'reflect-metadata'; // before any other dependency

import { enableHTTP, enableSSL } from '@config';
import { AbstractLoader } from '@interfaces/loader';
import { DependencyInjectorLoaders, ServerLoaders } from '@loaders/';
import { AppLoader } from '@loaders/app';
import { emitter } from '@loaders/events';
import { winston as log } from '@loaders/logger';
import { eventsDIKey, loggerDIKey } from '@strings/keys';

async function start() {
    process.on('unhandledRejection', (error) => {
        log.error('Unhandled promise rejection:', error);
        console.error(error);
    });
    process.on('warning', (e) => log.warn(e.stack));

    new AppLoader([
        new DependencyInjectorLoaders.TypeDILoader(
            [
                { key: eventsDIKey, value: emitter },
                { key: loggerDIKey, value: log },
            ],
            false,
        ),
        new ServerLoaders.ExpressLoader(false),
        ...getHttpSSLServers(),
    ])
        .load()
        .then((results) => {
            // TODO something with results?
        })
        .catch((err) => {
            log.error(`App loader failed: \n\n${err.stack}`);
        });
}

function getHttpSSLServers() {
    const servers: AbstractLoader<void | any>[] = [];
    if (enableHTTP) servers.push(new ServerLoaders.HttpLoader());
    if (enableSSL) servers.push(new ServerLoaders.SslLoader());
    return servers;
}

start();
