import { type Mock } from 'vitest';

import { buildMaybe } from '@/maybe/factory';
import { isValueType, map } from '@/maybe/functions';
import { type Maybe } from '@/maybe/typing';

describe('map', () => {
    const mockMapper: Mock<(value: number) => number> = vi.fn((value) => value + 1);
    const someValue = 1;

    it.each([
        { value: null, expectedResult: undefined },
        { value: undefined, expectedResult: undefined },
        { value: someValue, expectedResult: mockMapper(someValue) },
    ])('if Maybe\'s value is $value should return a Maybe object with $expectedResult as value', ({ value, expectedResult }) => {
        const maybe: Maybe<number> = buildMaybe(value);
        expect(map(maybe, mockMapper)).toEqual(buildMaybe(expectedResult));

        if (isValueType(value)) {
            expect(mockMapper).toHaveBeenCalledWith(value);
        }
    });
});
