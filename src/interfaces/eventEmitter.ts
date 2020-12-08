export interface IEventEmitter {
    on(event, listener);
    once(event, listener);
    emit(event, ...args);
    off(event, listener);
}
