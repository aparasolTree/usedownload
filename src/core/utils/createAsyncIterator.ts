export const createAsyncIterator = <T>(func: () => T) => ({
    [Symbol.asyncIterator]() {
        return {
            next() {
                return func();
            },
        };
    },
});
