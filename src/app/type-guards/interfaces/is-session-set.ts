import { SessionSet } from '../../models';
import { isRecord, isNumber, isBoolean, isDate } from '../primitives';
import { isSessionSetType, isWeightUnit } from '../enums';
import { hasKeys } from '../helpers';

export function isSessionSet(v: unknown): v is SessionSet {
  if (!isRecord(v)) {
    return false;
  }

  const requiredKeys = ['weight', 'weight_unit', 'reps', 'type', 'did_fail', 'created_at'] as const;
  if (!hasKeys(v, requiredKeys)) {
    return false;
  }

  const { weight, weight_unit, reps, type, did_fail, created_at } = v;

  return (
    isNumber(weight) &&
    isFinite(weight) &&
    weight >= 0 &&
    isWeightUnit(weight_unit) &&
    isNumber(reps) &&
    Number.isInteger(reps) &&
    reps > 0 &&
    isSessionSetType(type) &&
    isBoolean(did_fail) &&
    isDate(created_at)
  );
}
