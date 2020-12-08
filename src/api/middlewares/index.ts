import path from 'path';

import { getAllExportsFromDir } from '@utils/';

export const AllMiddlewares: Function[] = getAllExportsFromDir(
    path.resolve(__dirname),
);

console.log(AllMiddlewares);
