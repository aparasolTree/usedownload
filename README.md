<div>
    <h1 align="center">usedownload</h1>
</div>

<p align="center">
    <span style="font-size: 30px;">🐱</span> React hook - ⚡ Track file download progress
</p>

## 🐹 Reference

```tsx
import { useDownload } from 'usedownload';

const Demo = () => {
    const [state, { download, abort }] = useDownload('/src/assets/video/姜子牙.map4');
    const handleDownloadOrAbort = () => {
        if (state.isDownloading) abort();
        else download();
    };

    return (
        <div>
            <div>
                {state.loaded}/{state.total}
            </div>
            <button onClick={() => handleDownloadOrAbort()}>Download</button>
        </div>
    );
};
```

## 🐶 Usage

```
pnpm install usedownload
```
