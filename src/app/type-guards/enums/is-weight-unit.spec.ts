import { isWeightUnit } from './is-weight-unit';

describe('isWeightUnit', () => {
  it('should return true for valid weight units', () => {
    expect(isWeightUnit('KG')).toBeTrue();
    expect(isWeightUnit('LB')).toBeTrue();
  });

  it('should return false for invalid strings', () => {
    expect(isWeightUnit('STONE')).toBeFalse();
  });

  it('should return false for non-string inputs', () => {
    expect(isWeightUnit(false)).toBeFalse();
    expect(isWeightUnit(100)).toBeFalse();
    expect(isWeightUnit(['KG'])).toBeFalse();
  });
});
