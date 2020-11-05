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

export function getDependencyOrDefault<T = any>(id, defaultValue): T {
    if (Container.has(id)) return Container.get<T>(id);
    return defaultValue;
}

export function getDependency<T = any>(id): T {
    return Container.get<T>(id);
}

export function setDependency(key, value) {
    Container.set(key, value);
}

export function toArray(obj: Object) {
    return Object.keys(obj).map((key) => obj[key]);
}

export function getClassName(obj: any): string {
    return obj.constructor['name'];
}
