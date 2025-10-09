import { isString } from './is-string';

describe('isString', () => {
  it('should return true for string values', () => {
    expect(isString('')).toBeTrue();
    expect(isString('hello')).toBeTrue();
    expect(isString('123')).toBeTrue();
  });

  it('should return false for non-string values', () => {
    expect(isString(123)).toBeFalse();
    expect(isString(true)).toBeFalse();
    expect(isString(null)).toBeFalse();
    expect(isString([])).toBeFalse();
  });
});
