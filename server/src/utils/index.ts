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

export function getDependencyOrDefault<T = any>(id, defaultValue) {
    if (Container.has(id)) return Container.get<T>(id);
    return defaultValue;
}

export function getDependency<T = any>(id) {
    return Container.get<T>(id);
}
