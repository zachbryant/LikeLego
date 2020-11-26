import * as pinoLib from 'pino';

export const pino = pinoLib.default();
// TODO transports
export type PinoLoggerType = pinoLib.Logger;
