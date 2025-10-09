import { isArray } from './is-array';

describe('isArray', () => {
  it('should return true for arrays', () => {
    expect(isArray([])).toBeTrue();
    expect(isArray([1, 2, 3])).toBeTrue();
    expect(isArray(['a', 'b'])).toBeTrue();
  });

  it('should return false for non-arrays', () => {
    expect(isArray('not an array')).toBeFalse();
    expect(isArray(123)).toBeFalse();
    expect(isArray({})).toBeFalse();
    expect(isArray(null)).toBeFalse();
  });
});
