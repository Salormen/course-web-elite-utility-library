import { type Maybe, type Nothing } from './typing';

function isNothingTypeGuard<T> (value: T | Nothing): value is Nothing {
    return value === null || value === undefined;
}

function isValueTypeGuard<T> (value: T | Nothing): value is T {
    return !isNothingTypeGuard(value);
}

export function evaluate<T> (maybe: Maybe<T>, defaultValue: T): T {
    if (isValueTypeGuard(maybe.value)) {
        return maybe.value;
    }
    return defaultValue;
}
