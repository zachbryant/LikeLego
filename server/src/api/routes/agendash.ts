import { Router } from 'express';
import basicAuth from 'express-basic-auth';
import agendash from 'agendash';
import { Container } from 'typedi';
import { agendash } from '../../config';

export default (app: Router) => {
    const agendaInstance = Container.get('agendaInstance');

    app.use(
        '/dash',
        basicAuth({
            users: {
                [agendash.user]: agendash.pass,
            },
            challenge: true,
        }),
        agendash(agendaInstance),
    );
};
