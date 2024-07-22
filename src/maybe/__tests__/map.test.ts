import { describe, expect, it, vi } from 'vitest';

import { buildMaybe } from '../factory';
import { isValueTypeGuard, map } from '../functions';
import { type Maybe } from '../typing';

describe('map', () => {
    const mockMapper = vi.fn((value) => value + 1);
    const someValue = 1;

    it.each([
        { value: null, expectedResult: undefined },
        { value: undefined, expectedResult: undefined },
        { value: someValue, expectedResult: mockMapper(someValue) },
    ])('if Maybe\'s value is $value should return a Maybe object with $expectedResult as value', ({ value, expectedResult }) => {
        const maybe: Maybe<number> = buildMaybe(value);
        expect(map(maybe, mockMapper)).toEqual(buildMaybe(expectedResult));

        if (isValueTypeGuard(value)) {
            expect(mockMapper).toHaveBeenCalledWith(value);
        }
    });
});
