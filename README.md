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

### toMaybeFunction

Converts a regular function to a MaybeFunction. The returned function, when called, will execute the original function and wrap the result in a Maybe. If the original function throws an error, the returned function will return Nothing.

```typescript
export function toMaybeFunction<T> (fn: TypeFunction<T>): MaybeFunction<T> {
    return (value: T): Maybe<T> => {
        try {
            return buildMaybe(fn(value));
        } catch (error) {
            return buildMaybe();
        }
    };
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


// A regular function that might throw an error
const riskyFunction = (value: number): number => {
    if (value < 0) {
        throw new Error('Negative value!');
    }
    return value * 2;
};

const safeFunction = toMaybeFunction(riskyFunction);

const maybeResult1 = safeFunction(5);
console.log('Result for 5:', maybeResult1);  // Outputs the Maybe with value 10

const maybeResult2 = safeFunction(-1);
console.log('Result for -1:', maybeResult2); // Outputs Nothing due to the error
```
