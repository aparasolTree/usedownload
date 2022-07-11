import * as React from 'react';
import Progress from '../Progress';
// eslint-disable-next-line import/no-relative-packages
import { useDownload } from '../../../../src/core/useDownload';
import { Button } from '../common/Button';

export interface DownloadProps {
    url: string;
}

export default function Download({ url }: DownloadProps) {
    const [state, { download, abort }] = useDownload(url);
    const DownloadOrAbort = () => {
        if (state.isDownloading) abort();
        else download();
    };

    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
                marginTop: '30px',
            }}
        >
            <Progress width={Math.floor((state.loaded / state.total) * 100)} />
            <Button onClick={() => DownloadOrAbort()} style={{ marginTop: '20px' }}>
                {state.isDownloading ? 'Abort' : 'Download'}
            </Button>
        </div>
    );
}
