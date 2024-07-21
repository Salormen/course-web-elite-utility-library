import { describe, expect, it } from 'vitest';

import { buildMaybe } from '../factory';
import { map } from '../functions';
import { type Maybe } from '../typing';

describe('map', () => {
    const mapper = (value: number): number => value + 1;

    it.each([
        { value: null, expectedResult: undefined },
        { value: undefined, expectedResult: undefined },
        { value: 1, expectedResult: mapper(1) },
    ])('if Maybe\'s value is $value should return a Maybe object with $expectedResult as value', ({ value, expectedResult }) => {
        const maybe: Maybe<number> = buildMaybe<number>(value);
        expect(map(maybe, mapper)).toEqual(buildMaybe<number>(expectedResult));
    });
});
