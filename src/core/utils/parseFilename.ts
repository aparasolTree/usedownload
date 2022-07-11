import { genRandomName } from './genRandomName';

export interface Options {
    defaultFilename: string;
    autoGenFilename: boolean;
    extension: string;
}

export function parseFilename(
    url: string,
    { defaultFilename, autoGenFilename, extension }: Options,
) {
    return (
        decodeURIComponent(url.split(/(\/|\\)/).pop()!)
        || (autoGenFilename ? `${genRandomName()}.${extension}` : defaultFilename)
    );
}
