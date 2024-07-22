import { buildMaybe } from '../factory';
import { filter, isValueType } from '../functions';

describe('filter', () => {
    const mockPredicate = vi.fn((value: number): boolean => value > 0);

    it.each([
        { value: null, expectedResult: undefined },
        { value: undefined, expectedResult: undefined },
        { value: 1, expectedResult: 1 },
        { value: 0, expectedResult: undefined },
        { value: -1, expectedResult: undefined },
    ])('if Maybe\'s value is $value should return a Maybe object with $expectedResult as value', ({ value, expectedResult }) => {
        const maybe = buildMaybe(value);
        expect(filter(maybe, mockPredicate)).toEqual(buildMaybe(expectedResult));

        if (isValueType(value)) {
            expect(mockPredicate).toHaveBeenCalledWith(value);
        } else {
            expect(mockPredicate).not.toHaveBeenCalled();
        }
    });

    afterEach(() => {
        mockPredicate.mockClear();
    });
});
