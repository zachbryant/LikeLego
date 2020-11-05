import Agenda from 'agenda';
import { Mongoose } from 'mongoose';

import { agenda as agendaConfig } from '@config';
import { AbstractLoader } from '@interfaces/loader';
import { jobHandlerDIKey, loggerDIKey } from '@strings/keys';
import { jobHandlerStopped } from '@strings/logging';
import { getDependency, setDependency } from '@utils/';

export type AgendaSchedulerType = Agenda;
export class AgendaLoader extends AbstractLoader<void> {
    private agendaInstance: AgendaSchedulerType;

    constructor() {
        super();
        this.agendaInstance = new Agenda({
            db: {
                address: agendaConfig.dbUrl,
                collection: agendaConfig.dbCollection,
            },
            processEvery: agendaConfig.poolTime,
            maxConcurrency: agendaConfig.concurrency,
        });
        setDependency(jobHandlerDIKey, this.agendaInstance);
    }

    async load() {
        this.agendaInstance.start();
    }

    async stop() {
        await getDependency(jobHandlerDIKey).stop();
        getDependency(loggerDIKey).info(jobHandlerStopped);
        process.exit(0);
    }
}
