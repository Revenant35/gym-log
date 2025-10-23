import { ScheduleExercise } from '../../models';
import { isRecord, isString, isNumber } from '../primitives';
import { hasKeys } from '../helpers';
import { isWeightUnit } from '../enums';

export function isScheduleExercise(v: unknown): v is ScheduleExercise {
  if (!isRecord(v)) {
    return false;
  }

  const requiredKeys = ['name', 'sets', 'reps', 'weight', 'weight_unit'] as const;
  if (!hasKeys(v, requiredKeys)) {
    return false;
  }

  const { name, sets, reps, weight, weight_unit } = v;

  return (
    isString(name) &&
    isNumber(sets) &&
    Number.isFinite(sets) &&
    Number.isInteger(sets) &&
    sets > 0 &&
    isNumber(reps) &&
    Number.isFinite(reps) &&
    Number.isInteger(reps) &&
    reps > 0 &&
    isNumber(weight) &&
    Number.isFinite(weight) &&
    Number.isInteger(weight) &&
    weight > 0 &&
    isWeightUnit(weight_unit)
  );
}
