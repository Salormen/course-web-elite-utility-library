export type Nothing = null | undefined;

export interface Maybe<T> {
    value: T | Nothing
}

export type MaybeFunction<T> = (value: T) => Maybe<T>;
