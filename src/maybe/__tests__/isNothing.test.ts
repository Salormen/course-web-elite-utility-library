import { isNothing } from '../functions';

describe('isNothing', () => {
    it.each([
        { value: null, expectedResult: true },
        { value: undefined, expectedResult: true },
        { value: 1, expectedResult: false },
        { value: '', expectedResult: false },
        { value: false, expectedResult: false },
        { value: {}, expectedResult: false },
        { value: [], expectedResult: false },
    ])('if the value is $value should return $expectedResult', ({ value, expectedResult }) => {
        expect(isNothing({ value })).toBe(expectedResult);
    });
});
