import {ScheduleDay} from '../../models';
import {isRecord, isArray, isString} from '../primitives';
import {hasKeys} from '../helpers';
import {isScheduleExercise} from './is-schedule-exercise';

export function isScheduleDay(v: unknown): v is ScheduleDay {
  if (!isRecord(v)) {
    return false;
  }

  const requiredKeys = ["name", "exercises"] as const;
  if (!hasKeys(v, requiredKeys)) {
    return false;
  }

  const {name, exercises} = v;

  return (
    isString(name) &&
    isArray(exercises) &&
    exercises.every(isScheduleExercise)
  );
}
