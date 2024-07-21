import { describe, expect, it } from 'vitest';

import { isNothing } from '../functions';

describe('isNothing', () => {
    it.each([
        [null, true],
        [undefined, true],
        [1, false],
        ['', false],
        [false, false],
        [{}, false],
        [[], false],
    ])('if the value is %s should return %s', (value, expectedValue) => {
        expect(isNothing({ value })).toBe(expectedValue);
    });
});
