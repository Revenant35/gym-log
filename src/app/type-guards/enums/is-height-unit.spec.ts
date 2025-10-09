import { isHeightUnit } from './is-height-unit';

describe('isHeightUnit', () => {
  it('should return true for valid height units', () => {
    expect(isHeightUnit('feet-inches')).toBeTrue();
    expect(isHeightUnit('centimeters')).toBeTrue();
  });

  it('should return false for invalid strings', () => {
    expect(isHeightUnit('meters')).toBeFalse();
  });

  it('should return false for non-string inputs', () => {
    expect(isHeightUnit(null)).toBeFalse();
    expect(isHeightUnit(180)).toBeFalse();
    expect(isHeightUnit([])).toBeFalse();
  });
});
