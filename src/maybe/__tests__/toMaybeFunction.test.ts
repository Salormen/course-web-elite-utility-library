import { buildMaybe } from '@/maybe/factory';
import { toMaybeFunction } from '@/maybe/functions';
import { type TypeFunction } from '@/maybe/typing';

interface SomeObject { a: number };
type SomePrimitiveType = boolean | number | string | SomeObject;

describe('toMaybeFunction', () => {
    it.each([
        {
            fn: (x: number): number => x * 2,
            value: 2,
        },
        {
            fn: (x: string): string => x.toUpperCase(),
            value: 'test',
        },
        {
            fn: (x: boolean): boolean => !x,
            value: true,
        },
        {
            fn: (x: SomeObject): SomeObject => ({ a: x.a + 1 }),
            value: { a: 1 },
        },
    ] as {
        fn: TypeFunction<SomePrimitiveType>
        value: SomePrimitiveType
    }[])('should return a MaybeFunction that wraps the given function', ({ fn, value }) => {
        const mockFn = vi.fn(fn);
        const maybeFn = toMaybeFunction(mockFn);

        const result = maybeFn(value);
        expect(result).toEqual(buildMaybe(fn(value)));
        expect(mockFn).toHaveBeenCalledWith(value);
    });

    it('should return a MaybeFunction that returns an empty Maybe on error', () => {
        const fn = vi.fn((_: number) => {
            throw new Error('Test error');
        });
        const maybeFn = toMaybeFunction(fn);

        const result = maybeFn(2);
        expect(result).toEqual(buildMaybe());
        expect(fn).toHaveBeenCalledWith(2);
    });

    it('should handle functions that return undefined', () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const fn = vi.fn((_) => undefined as any);
        const maybeFn = toMaybeFunction(fn);

        const result = maybeFn(2);
        expect(result).toEqual(buildMaybe());
        expect(fn).toHaveBeenCalledWith(2);
    });

    it('should handle functions that return null', () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const fn = vi.fn((_) => null as any);
        const maybeFn = toMaybeFunction(fn);

        const result = maybeFn(2);
        expect(result).toEqual(buildMaybe(null));
        expect(fn).toHaveBeenCalledWith(2);
    });
});
