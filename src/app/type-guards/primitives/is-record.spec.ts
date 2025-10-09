import { isRecord } from './is-record';

describe('isRecord', () => {
  it('should return true for objects', () => {
    expect(isRecord({})).toBeTrue();
    expect(isRecord({ key: 'value' })).toBeTrue();
    expect(isRecord({ a: 1, b: 2 })).toBeTrue();
  });

  it('should return true for arrays (which are objects)', () => {
    expect(isRecord([])).toBeTrue();
    expect(isRecord([1, 2, 3])).toBeTrue();
  });

  it('should return false for null', () => {
    expect(isRecord(null)).toBeFalse();
  });

  it('should return false for primitives', () => {
    expect(isRecord('string')).toBeFalse();
    expect(isRecord(123)).toBeFalse();
    expect(isRecord(true)).toBeFalse();
    expect(isRecord(undefined)).toBeFalse();
  });
});
