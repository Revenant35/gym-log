import { isUUID } from './is-uuid';

describe('isUUID', () => {
  it('should return true for valid UUIDs', () => {
    expect(isUUID('550e8400-e29b-41d4-a716-446655440000')).toBeTrue();
    expect(isUUID('6ba7b810-9dad-41d1-80b4-00c04fd430c8')).toBeTrue();
    expect(isUUID('A1B2C3D4-E5F6-4789-ABCD-EF0123456789')).toBeTrue();
  });

  it('should return false for invalid UUID formats', () => {
    expect(isUUID('not-a-uuid')).toBeFalse();
    expect(isUUID('550e8400-e29b-41d4-a716')).toBeFalse();
    expect(isUUID('550e8400-e29b-31d4-a716-446655440000')).toBeFalse(); // wrong version (3 instead of 4)
  });

  it('should return false for non-string values', () => {
    expect(isUUID(123)).toBeFalse();
    expect(isUUID(null)).toBeFalse();
    expect(isUUID({})).toBeFalse();
  });
});
