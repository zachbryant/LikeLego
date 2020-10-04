export function ensureStartSlash(string: string) {
    return string.startsWith('/') ? string : `/${string}`;
}

export function ensureEndSlash(string: string) {
    return string.endsWith('/') ? string : `${string}/`;
}

export function boolValue(string) {
    return string === 'true' ? true : false;
}
