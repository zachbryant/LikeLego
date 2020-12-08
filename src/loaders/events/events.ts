import { EventEmitter } from 'events';

export type NodeEventEmitterType = EventEmitter;
export const emitter = new EventEmitter();

export const emit = emitter.emit;
export const on = emitter.on;
export const off = emitter.off;
export const offAll = emitter.removeAllListeners;
