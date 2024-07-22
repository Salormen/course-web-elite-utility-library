import { isValue } from '../functions';

describe('isValue', () => {
    it.each([
        { value: 1, expectedResult: true },
        { value: '', expectedResult: true },
        { value: false, expectedResult: true },
        { value: {}, expectedResult: true },
        { value: [], expectedResult: true },
        { value: null, expectedResult: false },
        { value: undefined, expectedResult: false },
    ])('if the value is $value should return $expectedResult', ({ value, expectedResult }) => {
        expect(isValue({ value })).toBe(expectedResult);
    });
});
