import { isDayOfWeek } from './is-day-of-week';

describe('isDayOfWeek', () => {
  it('should return true for valid days of the week', () => {
    expect(isDayOfWeek('monday')).toBeTrue();
    expect(isDayOfWeek('tuesday')).toBeTrue();
    expect(isDayOfWeek('wednesday')).toBeTrue();
    expect(isDayOfWeek('thursday')).toBeTrue();
    expect(isDayOfWeek('friday')).toBeTrue();
    expect(isDayOfWeek('saturday')).toBeTrue();
    expect(isDayOfWeek('sunday')).toBeTrue();
  });

  it('should return false for invalid strings', () => {
    expect(isDayOfWeek('funday')).toBeFalse();
    expect(isDayOfWeek('mon')).toBeFalse();
  });

  it('should return false for non-string inputs', () => {
    expect(isDayOfWeek(null)).toBeFalse();
    expect(isDayOfWeek(12)).toBeFalse();
    expect(isDayOfWeek({})).toBeFalse();
  });
});
