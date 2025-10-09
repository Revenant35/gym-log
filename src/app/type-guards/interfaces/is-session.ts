import {Session} from '../../models';
import {isRecord, isDate, isArray, isUUID} from '../primitives';
import {hasKeys} from '../helpers';
import {isSessionExercise} from './is-session-exercise';

export function isSession(v: unknown): v is Session {
  if (!isRecord(v)) {
    return false;
  }

  const requiredKeys = ["id", "exercises", "user_id", "created_at"] as const;
  if (!hasKeys(v, requiredKeys)) {
    return false;
  }


  return (
    isUUID(v["id"]) &&
    isArray(v["exercises"]) &&
    v["exercises"].every((set) => isSessionExercise(set)) &&
    isUUID(v["user_id"]) &&
    isDate(v["created_at"])
  );
}
