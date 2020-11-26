//export * from './agendash';
//export * from './status';
//export * from './zalgo';

import path from 'path';

import { RouteBuilderFunction } from '@interfaces/route';
import { getAllExportsFromDir } from '@utils/';

export const AllRoutes: RouteBuilderFunction[] = getAllExportsFromDir(
    path.resolve(__dirname),
);
