import { DayOfWeek } from '../../models';

export function isDayOfWeek(v: unknown): v is DayOfWeek {
  return (
    v === 'monday' ||
    v === 'tuesday' ||
    v === 'wednesday' ||
    v === 'thursday' ||
    v === 'friday' ||
    v === 'saturday' ||
    v === 'sunday'
  );
}
