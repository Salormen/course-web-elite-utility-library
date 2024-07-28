import * as Index from '@/index';

describe('Maybe', () => {
    it.each([
        { functionName: 'buildMaybe' },
        { functionName: 'evaluate' },
        { functionName: 'filter' },
        { functionName: 'map' },
        { functionName: 'reduce' },
    ])('should expose function $functionName', ({ functionName }) => {
        expect(Index).toHaveProperty(functionName);
    });

    it('should expose 5 functions', () => {
        expect(Object.keys(Index)).toHaveLength(5);
    });
});
