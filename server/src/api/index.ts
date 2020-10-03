import { Router } from 'express';

import agendash from './routes/agendash';

export const API = () => {
    const app = Router();
    agendash(app);

    return app;
};
