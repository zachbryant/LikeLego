import * as express from 'express';

import { API } from '@api/';
import { api as configApi, isDevelopment } from '@config/';
import { AbstractLoader } from '@models/interfaces/loaderInterface';
import { debugStrings, strings } from '@strings/';

import { log } from './logger';

const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const compression = require('compression');

export class ExpressLoader extends AbstractLoader<void> {
    private app;
    private allowedOrigins = [
        process.env.HOST,
        `https://localhost:${process.env.SSL_PORT}`,
    ];
    private middlewares = [
        helmet(),
        cors({ origin: process.env.HOST }),
        bodyParser.json({
            limit: process.env.BODY_PARSER_SIZE_LIMIT,
            extended: true,
        }),
        bodyParser.urlencoded({
            limit: process.env.BODY_PARSER_SIZE_LIMIT,
            extended: true,
        }),
        morgan(isDevelopment ? 'dev' : 'common'),
        compression(),
    ];

    constructor(app: express.Application) {
        super();
        this.app = app;
    }

    init() {
        return new Promise<void>(() => {
            this.loadMiddlewares().then(this.loadRoutes);
        })
            .catch(() => log.error(debugStrings.errorGeneric))
            .then(this.done);
    }

    // Load all specified middlewares
    loadMiddlewares() {
        log.debug(debugStrings.initMiddleware);
        return new Promise<void>(() => {
            this.middlewares.forEach((mw) => this.app.use(mw));
        })
            .then(() => log.debug(debugStrings.doneInitMiddleware))
            .catch(() => log.error(debugStrings.initMiddlewareFailed));
    }

    // Load our API and app routes using the API prefix
    loadRoutes() {
        log.debug(debugStrings.initRoutes);
        return new Promise<void>(() => {
            this.app.use(configApi.prefix, API());
        })
            .then(() => log.debug(debugStrings.doneInitRoutes))
            .catch(() => log.error(debugStrings.initRoutesFailed));
    }

    // Ensure the origin is in the allowlist, otherwise deny
    corsOriginCheck(origin, callback) {
        // allow requests with no origin
        // (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (this.allowedOrigins.indexOf(origin) === -1) {
            return callback(new Error(strings.corsPolicy), false);
        }
        return callback(null, true);
    }
}
