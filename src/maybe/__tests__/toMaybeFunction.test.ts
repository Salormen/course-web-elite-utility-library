import { buildMaybe } from '@/maybe/factory';
import { toMaybeFunction } from '@/maybe/functions';
import { type TypeFunction } from '@/maybe/typing';

describe('toMaybeFunction', () => {
    it('should return a MaybeFunction that wraps the given function', () => {
        const fn: TypeFunction<number> = (x) => x * 2;
        const maybeFn = toMaybeFunction(fn);

        expect(maybeFn(2)).toEqual(buildMaybe(4));
    });

    it('should return a MaybeFunction that returns an empty Maybe on error', () => {
        const fn: TypeFunction<number> = () => {
            throw new Error('Test error');
        };
        const maybeFn = toMaybeFunction(fn);

        expect(maybeFn(2)).toEqual(buildMaybe());
    });

    it('should handle functions that return undefined', () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const fn: TypeFunction<number> = () => undefined as any;
        const maybeFn = toMaybeFunction(fn);

        expect(maybeFn(2)).toEqual(buildMaybe());
    });

    it('should handle functions that return null', () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const fn: TypeFunction<number> = () => null as any;
        const maybeFn = toMaybeFunction(fn);

        expect(maybeFn(2)).toEqual(buildMaybe(null));
    });

    it('should return the correct Maybe value for different input types', () => {
        const fn: TypeFunction<string> = (x) => x.toUpperCase();
        const maybeFn = toMaybeFunction(fn);

        expect(maybeFn('test')).toEqual(buildMaybe('TEST'));
    });

    it('should correctly wrap and return Maybe for complex objects', () => {
        const fn: TypeFunction<{ a: number }> = (x) => ({ a: x.a + 1 });
        const maybeFn = toMaybeFunction(fn);

        expect(maybeFn({ a: 1 })).toEqual(buildMaybe({ a: 2 }));
    });
});
