export const fileDownload = (blob: Blob, filename: string) => Promise.resolve().then(() => {
    const a = document.createElement('a');
    try {
        const url = URL.createObjectURL(blob);
        a.href = url;
        a.download = filename;
        document.body.append(a);
        a.click();
        document.body.removeChild(a);
        setTimeout(() => URL.revokeObjectURL(url));
    } catch (error) {
        throw new Error(`[useDownload]: ${(error as Error).message}`);
    }
});
