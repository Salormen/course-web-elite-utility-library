import * as Index from '@/index';
import { type Maybe } from '@/maybe/typing';

describe('Maybe', () => {
    it.each([
        { functionName: 'buildMaybe' },
        { functionName: 'evaluate' },
        { functionName: 'filter' },
        { functionName: 'map' },
        { functionName: 'reduce' },
        { functionName: 'toMaybeFunction' },
    ])('should expose function $functionName', ({ functionName }) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        expect(Index).toHaveProperty(functionName);
    });

    it('should expose 6 functions', () => {
        expect(Object.keys(Index)).toHaveLength(6);
    });

    // Shallow test to ensure that the functions are exported

    it('should expose buildMaybe', () => {
        const value = 1;
        expect(Index.buildMaybe(value)).toEqual({ value });
    });

    it('should expose evaluate', () => {
        const maybe = Index.buildMaybe(1);
        const defaultValue = 2;
        expect(Index.evaluate(maybe, defaultValue)).toEqual(1);
    });

    it('should expose filter', () => {
        const maybe = Index.buildMaybe(1);
        const predicate = (value: number): boolean => value === 1;
        expect(Index.filter(maybe, predicate)).toEqual(maybe);
    });

    it('should expose map', () => {
        const maybe = Index.buildMaybe(1);
        const mapper = (value: number): number => value + 1;
        expect(Index.map(maybe, mapper)).toEqual({ value: 2 });
    });

    it('should expose reduce', () => {
        const maybe = Index.buildMaybe(1);
        const reducer = (value: number): Maybe<number> => Index.buildMaybe(value + 1);
        expect(Index.reduce(maybe, [reducer])).toEqual(Index.buildMaybe(2));
    });

    it('should expose toMaybeFunction', () => {
        const fn = (value: number): number => value + 1;
        const maybeFn = Index.toMaybeFunction(fn);

        expect(maybeFn(1)).toEqual(Index.buildMaybe(2));
    });
});
