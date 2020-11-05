import * as CustomMiddlewares from '@api/middlewares/';
import * as RouteObjects from '@api/routes';
import { RouteBuilderFunction } from '@interfaces/route';
import { toArray } from '@utils/';

// Leaving these as lists because I don't see the benefit of obj.
export const Routes: RouteBuilderFunction[] = toArray(RouteObjects);
export const Middlewares = toArray(CustomMiddlewares);
