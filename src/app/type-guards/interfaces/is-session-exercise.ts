import { SessionExercise } from '../../models';
import { isRecord, isDate, isArray, isString, isUUID } from '../primitives';
import { hasKeys } from '../helpers';
import { isSessionSet } from './is-session-set';

export function isSessionExercise(v: unknown): v is SessionExercise {
  if (!isRecord(v)) {
    return false;
  }

  const requiredKeys = ['id', 'name', 'sets', 'created_at'] as const;
  if (!hasKeys(v, requiredKeys)) {
    return false;
  }

  const { id, name, sets, created_at } = v;

  return (
    isUUID(id) &&
    isString(name) &&
    isArray(sets) &&
    sets.every((set) => isSessionSet(set)) &&
    isDate(created_at)
  );
}
