import { StatusCodes } from 'http-status-codes';

import { RouteBuilderFunction } from '@interfaces/route';
import { emit } from '@loaders/events';
import { ServerRouterType } from '@localtypes/injectionAliases';
import { zalgoOnEventKey } from '@strings/keys';

export const zalgoRoute: RouteBuilderFunction = (app: ServerRouterType) => {
    app.use('/zalgo', (_, res) => {
        emit(zalgoOnEventKey);
        res.status(StatusCodes.OK).send("You've unleashed zalgo");
    });
};
