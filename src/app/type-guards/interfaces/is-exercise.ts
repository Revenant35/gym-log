import {isRecord, isString, isUUID} from '../primitives';
import {hasKeys} from '../helpers';
import {Exercise} from '../../models';

export function isExercise(v: unknown): v is Exercise {
  if (!isRecord(v)) {
    return false;
  }

  const requiredKeys = ["id", "name"] as const;
  if (!hasKeys(v, requiredKeys)) {
    return false;
  }

  const {id, name} = v;

  return isUUID(id) && isString(name);
}
