import { Router } from 'express';
import Container from 'typedi';

import { loggerDIKey } from '@strings/keys';

//import agendash from './routes/agendash';

export const API = () => {
    const log: any = Container.get(loggerDIKey);
    log.debug('Loading API');
    const app = Router();
    //agendash(app);

    return app;
};
