import { isNumber } from './is-number';

describe('isNumber', () => {
  it('should return true for number values', () => {
    expect(isNumber(0)).toBeTrue();
    expect(isNumber(42)).toBeTrue();
    expect(isNumber(-10.5)).toBeTrue();
    expect(isNumber(NaN)).toBeTrue();
  });

  it('should return false for non-number values', () => {
    expect(isNumber('123')).toBeFalse();
    expect(isNumber(true)).toBeFalse();
    expect(isNumber(null)).toBeFalse();
    expect(isNumber(undefined)).toBeFalse();
  });
});
