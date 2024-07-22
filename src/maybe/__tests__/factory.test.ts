import { buildMaybe } from '../factory';

describe('buildMaybe', () => {
    it.each([
        { value: 1 },
        { value: '' },
        { value: false },
        { value: {} },
        { value: [] },
    ])('should return an object with the value $value', ({ value }) => {
        expect(buildMaybe(value)).toEqual({ value });
    });

    it.each([
        { value: null },
        { value: undefined },
    ])('should return an object with the value $value', ({ value }) => {
        expect(buildMaybe(value)).toEqual({ value: undefined });
    });

    it('should return an object with the value undefined', () => {
        expect(buildMaybe()).toEqual({ value: undefined });
    });
});
