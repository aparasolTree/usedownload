export interface UseDownloadOptions {
    immediate?: boolean;
    max?: number;
    autoSave?: boolean;
    // eslint-disable-next-line no-undef
    fetchInit?: RequestInit;
    defaultFilename?: string;
    autoGenFilename?: boolean;

    onError?: (errorMessage: string) => void;
    onSave?: (blob: Blob, info: { filename: string; extension: string; type: string }) => void;
}

export interface DownloadState {
    total: number;
    loaded: number;

    filename?: string;
    extension?: string;
    type?: string;
    url?: string;
    blob?: Blob;
    errorMessage?: string;

    isError?: boolean;
    isDownloading?: boolean;
    isFinished?: boolean;
}

export type Action<D> = Partial<D> | ((prev: D) => Partial<D>);
