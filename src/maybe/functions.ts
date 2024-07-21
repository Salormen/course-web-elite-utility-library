import { buildMaybe } from './factory';
import { type Maybe, type Nothing } from './typing';

function isNothingTypeGuard<T> (value: T | Nothing): value is Nothing {
    return value === null || value === undefined;
}

function isValueTypeGuard<T> (value: T | Nothing): value is T {
    return !isNothingTypeGuard(value);
}

export function isValue<T> (maybe: Maybe<T>): boolean {
    return isValueTypeGuard(maybe.value);
}

export function isNothing<T> (maybe: Maybe<T>): boolean {
    return isNothingTypeGuard(maybe.value);
}

export function evaluate<T> (maybe: Maybe<T>, defaultValue: T): T {
    if (isValueTypeGuard(maybe.value)) {
        return maybe.value;
    }
    return defaultValue;
}

export function map<T, U> (maybe: Maybe<T>, mapper: (value: T) => U): Maybe<U> {
    if (isValueTypeGuard(maybe.value)) {
        return buildMaybe(mapper(maybe.value));
    }
    return buildMaybe();
}
