import agendash from 'agendash';
import { Router } from 'express';
import basicAuth from 'express-basic-auth';

import { RouteBuilderFunction } from '@interfaces/route';
import { jobHandlerDIKey } from '@strings/keys';
import { getDependency } from '@utils/';

import { agendash as agendashConfig } from '../../config';

export const agendashRoute: RouteBuilderFunction = (app: Router) => {
    const agendaInstance = getDependency(jobHandlerDIKey);

    const { user, pass } = agendashConfig;
    if (user && pass) {
        app.use(
            '/dash',
            basicAuth({
                users: {
                    [user]: pass,
                },
                challenge: true,
            }),
            agendash(agendaInstance),
        );
    }
};
