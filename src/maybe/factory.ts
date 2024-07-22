import { type Maybe, type Nothing } from '@/maybe/typing';

const DEFAULT_VALUE = undefined;

export function buildMaybe<T> (value?: T | Nothing): Maybe<T> {
    if (value === undefined || value === null) {
        return { value: DEFAULT_VALUE };
    }
    return { value };
};
