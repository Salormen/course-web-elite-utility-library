import { buildMaybe } from '@/maybe/factory';
import { isNothing, reduce } from '@/maybe/functions';
import { type Maybe, type MaybeFunction } from '@/maybe/typing';

describe('reduce', () => {
    const mockFn1 = vi.fn((value) => buildMaybe(value + 1));
    const mockFn2 = vi.fn((value) => buildMaybe(value * 2));
    const mockFn3 = vi.fn((value) => buildMaybe(value - 3));
    const mockFn4 = vi.fn((_value) => buildMaybe());

    it.each([
        { initialValue: null, functions: [mockFn1, mockFn2], expectedResult: buildMaybe() },
        { initialValue: undefined, functions: [mockFn1, mockFn2], expectedResult: buildMaybe() },
        { initialValue: 1, functions: [mockFn1], expectedResult: buildMaybe(2) },
        { initialValue: 1, functions: [mockFn1, mockFn2], expectedResult: buildMaybe(4) },
        { initialValue: 1, functions: [mockFn1, mockFn2, mockFn3], expectedResult: buildMaybe(1) },
        { initialValue: 1, functions: [], expectedResult: buildMaybe(1) },
        { initialValue: 1, functions: [mockFn1, mockFn4, mockFn2], expectedResult: buildMaybe() },
    ])('should return $expectedResult when initialValue is $initialValue and functions are $functions', ({
        initialValue, functions, expectedResult,
    }) => {
        const maybeInitial: Maybe<number> = buildMaybe(initialValue);
        const maybeResult = reduce(maybeInitial, functions as MaybeFunction<number>[]);
        expect(maybeResult).toEqual(expectedResult);

        let currentValue = maybeInitial;
        let i = 0;

        // validate functions are called if currentValue is not Nothing
        for (; i < functions.length; i++) {
            if (isNothing(currentValue)) break;

            expect(functions[i]).toHaveBeenCalledWith(currentValue.value);
            currentValue = functions[i](currentValue.value);
        }

        // validate the rest of the functions are not called
        for (; i < functions.length; i++) {
            expect(functions[i]).not.toHaveBeenCalled();
        }
    });

    afterEach(() => {
        mockFn1.mockClear();
        mockFn2.mockClear();
        mockFn3.mockClear();
    });
});
