import { describe, expect, it } from 'vitest';

import { buildMaybe } from '../factory';
import { map } from '../functions';
import { type Maybe } from '../typing';

describe('map', () => {
    const mapper = (value: number): number => value + 1;

    it.each([
        [null, undefined],
        [undefined, undefined],
        [1, mapper(1)],
    ])('if it is %s should return %s', (value, expectedResult) => {
        const maybe: Maybe<number> = buildMaybe<number>(value);
        expect(map(maybe, mapper)).toEqual(buildMaybe<number>(expectedResult));
    });
});
