/**
 * Originally taken from 'w3tecch/express-typescript-boilerplate'
 */
import { EventDispatcher as EventDispatcherClass } from 'event-dispatcher';
import { Container } from 'typedi';

export function EventDispatcher() {
    return (object: any, propertyName: string, index?: number) => {
        const eventDispatcher = new EventDispatcherClass();
        Container.registerHandler({
            object,
            propertyName,
            index,
            value: () => eventDispatcher,
        });
    };
}

export { EventDispatcher as IEventDispatcher };
