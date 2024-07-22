import { afterEach, describe, expect, it, vi } from 'vitest';

import { buildMaybe } from '../factory';
import { isNothing, reduce } from '../functions';
import { type Maybe, type MaybeFunction } from '../typing';

describe('reduce', () => {
    const mockFn1 = vi.fn((value) => buildMaybe(value + 1));
    const mockFn2 = vi.fn((value) => buildMaybe(value * 2));
    const mockFn3 = vi.fn((value) => buildMaybe(value - 3));

    it.each([
        { initialValue: null, functions: [mockFn1, mockFn2], expectedResult: buildMaybe() },
        { initialValue: undefined, functions: [mockFn1, mockFn2], expectedResult: buildMaybe() },
        { initialValue: 1, functions: [mockFn1], expectedResult: buildMaybe(2) },
        { initialValue: 1, functions: [mockFn1, mockFn2], expectedResult: buildMaybe(4) },
        { initialValue: 1, functions: [mockFn1, mockFn2, mockFn3], expectedResult: buildMaybe(1) },
        { initialValue: 0, functions: [], expectedResult: buildMaybe(0) },
    ])('should return $expectedResult when initialValue is $initialValue and functions are $functions', ({
        initialValue, functions, expectedResult,
    }) => {
        const maybeInitial: Maybe<number> = buildMaybe(initialValue);
        const maybeResult = reduce(maybeInitial, functions as MaybeFunction<number>[]);
        expect(maybeResult).toEqual(expectedResult);

        if (isNothing(maybeInitial)) {
            expect(mockFn1).not.toHaveBeenCalled();
            expect(mockFn2).not.toHaveBeenCalled();
            expect(mockFn3).not.toHaveBeenCalled();
        } else {
            let acc = maybeInitial;
            functions.forEach((fn) => {
                expect(fn).toHaveBeenCalledWith(acc.value);
                acc = fn(acc.value);
            });
        }
    });

    afterEach(() => {
        mockFn1.mockClear();
        mockFn2.mockClear();
        mockFn3.mockClear();
    });
});
