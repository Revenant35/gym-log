import { isDate } from './is-date';

describe('isDate', () => {
  it('should return true for valid Date objects', () => {
    expect(isDate(new Date())).toBeTrue();
    expect(isDate(new Date('2025-10-08'))).toBeTrue();
  });

  it('should return false for invalid Date objects', () => {
    expect(isDate(new Date('invalid'))).toBeFalse();
  });

  it('should return false for non-Date values', () => {
    expect(isDate('2025-10-08')).toBeFalse();
    expect(isDate(1728432000000)).toBeFalse();
    expect(isDate({})).toBeFalse();
    expect(isDate(null)).toBeFalse();
  });
});
