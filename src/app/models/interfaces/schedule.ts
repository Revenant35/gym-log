import {DayOfWeek} from '../enums';
import {ScheduleDay} from './schedule-day';

export interface Schedule {
  days: Partial<Record<DayOfWeek, ScheduleDay>>;
}

