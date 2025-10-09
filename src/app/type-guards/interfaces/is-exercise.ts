import {isRecord, isNumber} from '../primitives';
import {hasKeys} from '../helpers';
import {isWeightUnit} from '../enums';
import {Exercise} from '../../models';

export function isExercise(v: unknown): v is Exercise {
  if (!isRecord(v)) {
    return false;
  }

  const requiredKeys = ["id", "name"] as const;
  if (!hasKeys(v, requiredKeys)) {
    return false;
  }

  const {value, unit} = v;

  return isNumber(value) && isFinite(value) && value >= 0 && isWeightUnit(unit);
}
