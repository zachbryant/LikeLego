import glob from 'glob';
import path from 'path';
import Container from 'typedi';

export function ensureStartSlash(string: string) {
    return string.startsWith('/') ? string : `/${string}`;
}

export function ensureEndSlash(string: string) {
    return string.endsWith('/') ? string : `${string}/`;
}

export function boolValue(string) {
    return string === 'true' ? true : false;
}

/** Provide a default value if the dependency isn't set */
export function getDependencyOrDefault<T = any>(id, defaultValue): T {
    if (Container.has(id)) return Container.get<T>(id);
    return defaultValue;
}

/** Wrapper for TypeDI lib get dependency */
export function getDependency<T = any>(id): T {
    return Container.get<T>(id);
}

/** Wrapper for TypeDI lib set dependency */
export function setDependency(key, value) {
    Container.set(key, value);
}

export function toArray(obj: Object) {
    return Object.keys(obj).map((key) => obj[key]);
}

export function getClassName(obj: any): string {
    return obj.constructor['name'];
}

export function getAllExportsFromDir(
    basePath: string,
    recursive = true,
    index = false,
    fileType = '.ts',
): any[] {
    let globRegex = recursive ? '**/*' : '/*';
    let files = glob.sync(path.normalize(basePath + globRegex + fileType));
    let modules = [];
    for (let file of files) {
        let fileName = path.basename(file);
        if (index || !fileName.startsWith('index')) {
            const req = require(path.resolve(file));
            modules = modules.concat(Object.values(req));
        }
    }
    return modules;
}
