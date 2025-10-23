import { ClockUnit } from '../../models';

export function isClockUnit(v: unknown): v is ClockUnit {
  return v === '12-hour' || v === '24-hour';
}
