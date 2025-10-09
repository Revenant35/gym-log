import { hasKeys } from './has-keys';

describe('hasKeys', () => {
  it('should return true when record has exactly the specified keys', () => {
    const record = { name: 'John', age: 30 } as Record<string, unknown>;
    expect(hasKeys(record, ['name', 'age'])).toBeTrue();
  });

  it('should return true for empty record with empty keys array', () => {
    const record = {} as Record<string, unknown>;
    expect(hasKeys(record, [])).toBeTrue();
  });

  it('should return false when record is missing a required key', () => {
    const record = { name: 'John' } as Record<string, unknown>;
    expect(hasKeys(record, ['name', 'age'])).toBeFalse();
  });

  it('should return false when record has extra keys', () => {
    const record = { name: 'John', age: 30, email: 'john@example.com' } as Record<string, unknown>;
    expect(hasKeys(record, ['name', 'age'])).toBeFalse();
  });

  it('should return false when record has no keys but keys are expected', () => {
    const record = {} as Record<string, unknown>;
    expect(hasKeys(record, ['name'])).toBeFalse();
  });

  it('should work with number keys', () => {
    const record = { 0: 'first', 1: 'second' } as Record<number, unknown>;
    expect(hasKeys(record, [0, 1])).toBeTrue();
  });
});
