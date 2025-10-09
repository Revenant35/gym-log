import { isClockUnit } from './is-clock-unit';

describe('isClockUnit', () => {
  it('should return true for valid clock units', () => {
    expect(isClockUnit('12-hour')).toBeTrue();
    expect(isClockUnit('24-hour')).toBeTrue();
  });

  it('should return false for invalid strings', () => {
    expect(isClockUnit('hour-12')).toBeFalse();
  });

  it('should return false for non-string inputs', () => {
    expect(isClockUnit(null)).toBeFalse();
    expect(isClockUnit(12)).toBeFalse();
    expect(isClockUnit({})).toBeFalse();
  });
});
