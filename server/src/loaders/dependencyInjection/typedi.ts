import { Container } from 'typedi';

import { AbstractLoader } from '@interfaces/loader';
import { TypeDIDependency } from '@interfaces/typediDependency';
import { setDependency } from '@utils/';

/**
 * This is the main dependency injection loader I'm going with for the project.
 * Unfortunately, DI libs don't seem to have a standardized API, so special wiring
 * may need maintained in the event that another DI lib is in use.a1
 *
 * Be careful not to introduce circular dependencies, of course.
 *
 * NOTE: whe  using with routing-controllers or TypeORM, you MUST tell these libs
 * to use the typeDI container.
 */
export class TypeDILoader extends AbstractLoader {
    constructor(private deps: TypeDIDependency[]) {
        super();
    }

    load(): Promise<void> {
        return Promise.resolve();
    }

    protected inject() {
        super.inject();
        return new Promise((resolve) => {
            this.deps.forEach((dependency) => {
                setDependency(dependency.key, dependency.value);
            });
            resolve();
        });
    }
}
