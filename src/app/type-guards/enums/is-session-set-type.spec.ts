import { isSessionSetType } from './is-session-set-type';

describe('isSessionSetType', () => {
  it('should return true for valid session set types', () => {
    expect(isSessionSetType('WARMUP')).toBeTrue();
    expect(isSessionSetType('WORK')).toBeTrue();
    expect(isSessionSetType('DROP')).toBeTrue();
  });

  it('should return false for invalid strings', () => {
    expect(isSessionSetType('COOL_DOWN')).toBeFalse();
  });

  it('should return false for non-string inputs', () => {
    expect(isSessionSetType(undefined)).toBeFalse();
    expect(isSessionSetType(0)).toBeFalse();
    expect(isSessionSetType({ type: 'WORK' })).toBeFalse();
  });
});
