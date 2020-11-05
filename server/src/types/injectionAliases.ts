import { NodeEventEmitterType } from '@loaders/events';
import { AgendaSchedulerType } from '@loaders/jobs';
import { WinstonLoggerType } from '@loaders/logger';
import { ExpressRouterType, ExpressServerType } from '@loaders/server';

export type ServerAppType = ExpressServerType;
export type ServerRouterType = ExpressRouterType;
export type LogHandlerType = WinstonLoggerType;
export type EventHandlerType = NodeEventEmitterType;
// TODO
export type JobHandlerType = AgendaSchedulerType;
//export type EmailHandlerType = NodemailerType;
//export type DatabaseType = KnexQueryBldrType;
