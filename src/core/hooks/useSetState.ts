import * as React from 'react';
import { Action } from '../types';

export const reducer = <T>(state: T, action: Action<T>) => ({
    ...state,
    ...(typeof action === 'function' ? action(state) : action),
});

export function useSetState<T>(initialState: T) {
    return React.useReducer(reducer, initialState) as [T, React.Dispatch<Action<T>>];
}
