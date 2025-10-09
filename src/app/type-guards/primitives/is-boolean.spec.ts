import { isBoolean } from './is-boolean';

describe('isBoolean', () => {
  it('should return true for boolean values', () => {
    expect(isBoolean(true)).toBeTrue();
    expect(isBoolean(false)).toBeTrue();
  });

  it('should return false for non-boolean values', () => {
    expect(isBoolean('true')).toBeFalse();
    expect(isBoolean(1)).toBeFalse();
    expect(isBoolean(0)).toBeFalse();
    expect(isBoolean(null)).toBeFalse();
  });
});
