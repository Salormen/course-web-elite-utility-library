import { evaluate } from '@/maybe/functions';
import { type Maybe } from '@/maybe/typing';

describe('evaluate', () => {
    it('should return the value if it is not nothing', () => {
        const maybe: Maybe<number> = { value: 1 };
        const defaultValue = 2;
        expect(evaluate(maybe, defaultValue)).toBe(maybe.value);
    });

    it.each([
        { value: null },
        { value: undefined },
    ])('should return the default value if the value is $value', ({ value }) => {
        const maybe: Maybe<number> = { value };
        const defaultValue = 2;
        expect(evaluate(maybe, defaultValue)).toBe(defaultValue);
    });
});
