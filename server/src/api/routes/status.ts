import { ReasonPhrases, StatusCodes } from 'http-status-codes';

import { RouteBuilderFunction } from '@interfaces/route';
import { ServerRouterType } from '@localtypes/injectionAliases';

export const statusRoute: RouteBuilderFunction = (app: ServerRouterType) => {
    app.get('/status', (_, res) => {
        res.status(StatusCodes.OK).send(ReasonPhrases.OK);
    });
};
