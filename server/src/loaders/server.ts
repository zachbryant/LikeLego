import { rejects } from 'assert';
import * as express from 'express';

import { API } from '@api';
import { api as configApi, hasCompression, hasCors, isDevelopment } from '@config';
import { AbstractLoader } from '@interfaces/loader';
import { debugStrings, strings } from '@strings';

import { log } from './logger';

const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const compression = require('compression');

/**
 * This is the express loader, which is in charge of setting up the express server.
 * All middlewares and routes load here.
 * It requires an express application instance, and returns a promise.
 * When resolved, the promise makes the app instance available again.
 */
export class ExpressLoader extends AbstractLoader {
    private app;
    private allowedOrigins = [
        process.env.HOST,
        `https://localhost:${process.env.SSL_PORT}`,
    ];

    constructor(app: express.Application) {
        super();
        this.app = app;
    }

    load() {
        return Promise.all([this.loadMiddlewares, this.loadRoutes]).then(() =>
            this.done(),
        );
    }

    // Load all specified middlewares
    loadMiddlewares() {
        log.debug(debugStrings.initMiddleware);

        return new Promise<void>((resolve) => {
            this.getMiddlewares().forEach((mw) => this.app.use(mw));
            resolve();
        })
            .then(() => log.debug(debugStrings.doneInitMiddleware))
            .catch((err) => {
                log.error(debugStrings.initMiddlewareFailed);
                rejects(err);
            });
    }

    getMiddlewares() {
        return [
            helmet(),
            bodyParser.json({
                limit: process.env.BODY_PARSER_SIZE_LIMIT,
                extended: true,
            }),
            bodyParser.urlencoded({
                limit: process.env.BODY_PARSER_SIZE_LIMIT,
                extended: true,
            }),
            morgan(isDevelopment ? 'dev' : 'common'),
            hasCors ? cors({ origin: this.corsOriginCheck }) : undefined,
            hasCompression ? compression() : undefined,
        ].filter(Boolean);
    }

    // Load our API and app routes using the API prefix
    loadRoutes() {
        log.debug(debugStrings.initRoutes);
        return new Promise<void>((resolve) => {
            this.app.use(configApi.prefix, API());
            resolve();
        })
            .then(() => log.debug(debugStrings.doneInitRoutes))
            .catch((err) => {
                log.error(debugStrings.initRoutesFailed);
                throw err;
            });
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
