import {DAYS_OF_WEEK, Schedule} from '../../models';
import {isRecord} from '../primitives';
import {hasNoExtraKeys} from '../helpers/has-no-extra-keys';
import {isScheduleDay} from './is-schedule-day';
import {hasKeys} from '../helpers';

export function isSchedule(v: unknown): v is Schedule {
  if (!isRecord(v)) {
    return false;
  }

  const requiredKeys = ["days"] as const;
  if (!hasKeys(v, requiredKeys)) {
    return false;
  }

  const {days} = v;

  if (!isRecord(days)) {
    return false;
  }

  if (!hasNoExtraKeys(days, DAYS_OF_WEEK)) {
    return false;
  }

  // Check that all day values are either ScheduleDay or undefined
  for (const key in days) {
    const dayValue = days[key];
    if (dayValue !== undefined && !isScheduleDay(dayValue)) {
      return false;
    }
  }

  return true;
}
