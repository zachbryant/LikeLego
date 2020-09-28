import express from 'express';

import { isDevelopment } from '@config/';
import { AbstractLoader } from '@models/interfaces/loaderInterface';

const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');

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
    ];

    constructor(app: express.Application) {
        super();
        this.app = app;
    }

    init(): Promise<void> {
        return new Promise(() => {
            this.middlewares.forEach((mw) => this.app.use(mw));
        }).then(() => this.done());
    }

    corsOriginCheck(origin, callback) {
        // allow requests with no origin
        // (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (this.allowedOrigins.indexOf(origin) === -1) {
            var msg =
                'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    }
}
