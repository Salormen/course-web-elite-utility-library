import * as Index from '../index';

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
});
