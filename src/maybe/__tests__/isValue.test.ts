import { describe, expect, it } from 'vitest';

import { isValue } from '../functions';

describe('isValue', () => {
    it.each([
        [1, true],
        ['', true],
        [false, true],
        [{}, true],
        [[], true],
        [null, false],
        [undefined, false],
    ])('if the value is %s should return %s', (value, expectedValue) => {
        expect(isValue({ value })).toBe(expectedValue);
    });
});
