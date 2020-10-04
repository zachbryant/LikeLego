import agendash from 'agendash';
import { Router } from 'express';
import basicAuth from 'express-basic-auth';
import { Container } from 'typedi';

import { agendash as agendashConfig } from '../../config';

export default (app: Router) => {
    const agendaInstance = Container.get('agendaInstance');

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
