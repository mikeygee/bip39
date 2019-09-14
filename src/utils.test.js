import {
    zeroFill
} from './utils';

describe('zeroFill', () => {
    test('no inputs', () => {
        expect(zeroFill()).toBe('');
    });
    test('string only', () => {
        expect(zeroFill('111')).toBe('111');
    });
    test('normal use case', () => {
        expect(zeroFill('111', 6)).toBe('000111');
    });
});