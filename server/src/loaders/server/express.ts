import express, { Router } from 'express';

import { Middlewares, Routes } from '@api';
import { api as configApi, hasCompression, hasCors, isDevelopment } from '@config';
import { AbstractLoader } from '@interfaces/loader';
import { logStrings, strings } from '@strings';
import { serverAppDIKey, serverRouterDIKey } from '@strings/keys';
import { setDependency } from '@utils/';

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
export type ExpressServerType = express.Application;
export type ExpressRouterType = express.Router;
export class ExpressLoader extends AbstractLoader<express.Application> {
    private allowedOrigins = [
        process.env.HOST,
        `https://localhost:${process.env.SSL_PORT}`,
    ];
    private app: ExpressServerType;
    private router: ExpressRouterType;

    constructor() {
        super();
        this.app = express();
        this.router = Router();
    }

    async load() {
        setDependency(serverAppDIKey, this.app);
        setDependency(serverRouterDIKey, this.router);
        this.loadMiddlewares();
        this.loadRoutes();
        return this.app;
    }

    // Load all specified middlewares
    loadMiddlewares() {
        this.log.debug(logStrings.initMiddleware);
        this.getMiddlewares().forEach((mw) => this.app.use(mw));
        this.log.debug(logStrings.doneInitMiddleware);
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
            ...Middlewares,
        ].filter(Boolean);
    }

    // Load our API and app routes using the API prefix
    loadRoutes() {
        this.log.debug(logStrings.initRoutes);
        for (const routeBuilderFunc of Routes) {
            routeBuilderFunc(this.router);
            this.log.debug(
                `${routeBuilderFunc.name || 'Anonymous'} route ready`,
            );
        }
        this.app.use(configApi.prefix, this.router);
        this.log.debug(logStrings.doneInitRoutes);
    }

    // Ensure the origin is in the allowlist, otherwise deny
    corsOriginCheck(origin, callback) {
        // allow requests with no origin
        // (like mobile apps or curl requests)
        // TODO translate
        if (!origin) return callback(null, true);
        if (this.allowedOrigins.indexOf(origin) === -1) {
            return callback(new Error(strings.EN.corsPolicy), false);
        }
        return callback(null, true);
    }
}
