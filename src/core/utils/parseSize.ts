const unit = ['Bytes', 'KB', 'MB', 'GB'];

export const parseSize = (size: number) => {
    for (let i = 0; i < unit.length; i += 1) {
        if (size < 1024 ** (i + 1)) {
            return `${Math.floor(size / 1024 ** i)}${unit[i]}`;
        }
    }
    return size;
};
