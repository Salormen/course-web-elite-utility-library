# Maybe Library

A TypeScript library for working with Maybe types, providing utilities for handling optional values.

## Installation

To install the library, use npm or yarn:

```bash
npm install juan-ignacio-acosta-rios-maybe-utility-library
```
or

```bash
yarn add juan-ignacio-acosta-rios-maybe-utility-library
```

## Importing

To use the library, import the necessary functions and types:

```typescript

import { buildMaybe } from '@/maybe/factory';
import { type Maybe, type MaybeFunction, type Nothing } from '@/maybe/typing';
```

## Functions

### isNothingType

Checks if a value is Nothing (null or undefined).

```typescript
export function isNothingType<T> (value: T | Nothing): value is Nothing {
    return value === null || value === undefined;
}
```

### isValueType

Checks if a value is not Nothing.

```typescript
export function isValueType<T> (value: T | Nothing): value is T {
    return !isNothingType(value);
}
```

### isValue

Checks if a Maybe contains a value.

```typescript
export function isValue<T> (maybe: Maybe<T>): boolean {
    return isValueType(maybe.value);
}
```

### isNothing

Checks if a Maybe is Nothing.

```typescript
export function isNothing<T> (maybe: Maybe<T>): boolean {
    return isNothingType(maybe.value);
}
```

### evaluate

Returns the value of a Maybe if it exists, otherwise returns a default value.

```typescript
export function evaluate<T> (maybe: Maybe<T>, defaultValue: T): T {
    if (isValueType(maybe.value)) {
        return maybe.value;
    }
    return defaultValue;
}
```

### map

Maps a Maybe value using a mapper function, returning a new Maybe.

```typescript
export function map<T, U> (maybe: Maybe<T>, mapper: (value: T) => U): Maybe<U> {
    if (isValueType(maybe.value)) {
        return buildMaybe(mapper(maybe.value));
    }
    return buildMaybe();
}
```

### reduce

Reduces a series of Maybe functions starting with an initial Maybe value.

```typescript
export function reduce<T> (initialValue: Maybe<T>, fns: MaybeFunction<T>[]): Maybe<T> {
    return fns.reduce((acc, fn) => {
        if (isNothingType(acc.value)) {
            return buildMaybe();
        }
        return fn(acc.value);
    }, initialValue);
}
```

### filter

Filters a Maybe value based on a predicate function.

```typescript
export function filter<T> (maybe: Maybe<T>, predicate: (value: T) => boolean): Maybe<T> {
    if (isValueType(maybe.value) && predicate(maybe.value)) {
        return maybe;
    }
    return buildMaybe();
}
```

## Example Usage

```typescript

import { buildMaybe, isNothing, isValue, evaluate, map, reduce, filter } from '@/maybe';

// Example usage of the Maybe library
const maybeValue = buildMaybe(5);

if (isValue(maybeValue)) {
    console.log('Value exists:', maybeValue.value);
}

const defaultValue = 10;
const evaluatedValue = evaluate(maybeValue, defaultValue);
console.log('Evaluated value:', evaluatedValue);

const mappedValue = map(maybeValue, x => x * 2);
console.log('Mapped value:', mappedValue);

const reducedValue = reduce(maybeValue, [x => buildMaybe(x + 1), x => buildMaybe(x * 3)]);
console.log('Reduced value:', reducedValue);

const filteredValue = filter(maybeValue, x => x > 3);
console.log('Filtered value:', filteredValue);
```

## License

This library is licensed under the MIT License.