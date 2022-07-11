import * as React from 'react';

export const useLatest = <T>(value: T) => {
    const latest = React.useRef(value);
    React.useEffect(() => {
        latest.current = value;
    }, [value]);

    return latest;
};
