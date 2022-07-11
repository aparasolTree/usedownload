import * as React from 'react';
import { useLatest } from '../hooks/useLatest';
import { useSetState } from '../hooks/useSetState';
import { initialState } from '../initial';
import type { UseDownloadOptions } from '../types';
import { createAsyncIterator } from '../utils/createAsyncIterator';
import { fileDownload } from '../utils/fileDownload';
import { parseFilename } from '../utils/parseFilename';
import { parseSize } from '../utils/parseSize';

let isDownloading: boolean = false;
const noop = () => {};

export function useDownload(src: string, options: UseDownloadOptions = {}) {
    const {
        immediate = false,
        max,
        onError = noop,
        autoSave = true,
        onSave = noop,
        fetchInit,
        autoGenFilename = true,
        defaultFilename = 'default.txt',
    } = options;

    const abortRef = React.useRef<AbortController>();
    const [state, dispatch] = useSetState(initialState);
    const actions = useLatest({ onError, onSave, fetchInit });

    const download = React.useCallback(() => {
        let filename: string;
        let extension: string;
        let type: string;
        let totalLength: number = 0;
        let loaded: number = 0;
        abortRef.current = new AbortController();

        if (isDownloading) return;
        isDownloading = true;

        dispatch({
            isDownloading,
            errorMessage: '',
            isError: false,
            isFinished: false,
        });

        fetch(src, { ...(actions.current.fetchInit || {}), signal: abortRef.current.signal })
            .then((response) => {
                type = response.headers.get('Content-Type') || 'text/plain';
                const ext = type.split('/').pop()!;
                extension = ext === 'plain' ? 'txt' : ext;
                filename = parseFilename(response.url, {
                    extension,
                    defaultFilename,
                    autoGenFilename,
                });

                const total = Number(response.headers.get('Content-Length') || 0.01);
                if (!total) throw new Error('[useDownload]: Content length does not exist');
                totalLength = total;

                if (max && total > max * 1024 ** 2) {
                    throw new Error(
                        `[useDownload]: ${filename} size exceeds the maximum value of ${parseSize(
                            total - max * 1024 ** 2,
                        )}`,
                    );
                }

                dispatch({
                    total,
                    filename,
                    extension,
                    url: response.url,
                    type,
                });

                const reader = response.body!.getReader();
                const asyncIterator = createAsyncIterator(() => reader.read());

                return new ReadableStream({
                    async start(controller) {
                        try {
                            // eslint-disable-next-line no-restricted-syntax
                            for await (const chunk of asyncIterator) {
                                controller.enqueue(chunk);
                                loaded += chunk.byteLength;
                                dispatch({ loaded });
                            }
                        } catch (error) {
                            const errorMessage = (error as Error).message;
                            dispatch({ isError: true, errorMessage });
                        } finally {
                            controller.close();
                            reader.releaseLock();
                        }
                    },
                });
            })
            .then((stream) => new Response(stream, { statusText: 'OK', status: 200 }))
            .then(async (res) => {
                const blob = await res.blob();
                dispatch({ blob });
                if (totalLength === loaded) {
                    autoSave
                        ? fileDownload(blob, filename)
                        : actions.current.onSave(blob, { filename, extension, type });
                    dispatch({ isFinished: true });
                }
            })
            .catch((error) => {
                const errorMessage = (error as Error).message;
                dispatch({ isError: true, errorMessage });
                actions.current.onError(errorMessage);
            })
            .finally(() => {
                isDownloading = false;
                dispatch({ isDownloading });
            });
    }, [src, max, autoSave, autoGenFilename, defaultFilename]);

    React.useEffect(() => {
        if (immediate) download();
        return () => {
            abortRef.current?.abort();
        };
    }, [immediate, src]);

    return [
        state,
        {
            download,
            abort: () => {
                abortRef.current?.abort();
            },
        },
    ] as const;
}
