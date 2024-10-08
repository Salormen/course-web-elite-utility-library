import { buildMaybe } from '@/maybe/factory';
import { type Maybe, type MaybeFunction, type Nothing, type TypeFunction } from '@/maybe/typing';

export function isNothingType<T> (value: T | Nothing): value is Nothing {
    return value === null || value === undefined;
}

export function isValueType<T> (value: T | Nothing): value is T {
    return !isNothingType(value);
}

export function isValue<T> (maybe: Maybe<T>): boolean {
    return isValueType(maybe.value);
}

export function isNothing<T> (maybe: Maybe<T>): boolean {
    return isNothingType(maybe.value);
}

export function evaluate<T> (maybe: Maybe<T>, defaultValue: T): T {
    if (isValueType(maybe.value)) {
        return maybe.value;
    }
    return defaultValue;
}

export function map<T, U> (maybe: Maybe<T>, mapper: (value: T) => U): Maybe<U> {
    if (isValueType(maybe.value)) {
        return buildMaybe(mapper(maybe.value));
    }
    return buildMaybe();
}

export function reduce<T> (initialValue: Maybe<T>, fns: MaybeFunction<T>[]): Maybe<T> {
    return fns.reduce((acc, fn) => {
        if (isNothingType(acc.value)) {
            return buildMaybe();
        }
        return fn(acc.value);
    }, initialValue);
}

export function filter<T> (maybe: Maybe<T>, predicate: (value: T) => boolean): Maybe<T> {
    if (isValueType(maybe.value) && predicate(maybe.value)) {
        return maybe;
    }
    return buildMaybe();
}

export function toMaybeFunction<T> (fn: TypeFunction<T>): MaybeFunction<T> {
    return (value: T): Maybe<T> => {
        try {
            return buildMaybe(fn(value));
        } catch (error) {
            return buildMaybe();
        }
    };
}
