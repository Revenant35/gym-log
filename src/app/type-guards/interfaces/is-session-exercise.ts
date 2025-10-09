import {SessionExercise} from '../../models';
import {isRecord, isDate, isArray} from '../primitives';
import {hasKeys} from '../helpers';
import {isExercise} from './is-exercise';
import {isSessionSet} from './is-session-set';

export function isSessionExercise(v: unknown): v is SessionExercise {
  if (!isRecord(v)) {
    return false;
  }

  const requiredKeys = ["exercise", "sets", "created_at"] as const;
  if (!hasKeys(v, requiredKeys)) {
    return false;
  }


  return (
    isExercise(v["exercise"]) &&
    isArray(v["sets"]) &&
    v["sets"].every((set) => isSessionSet(set)) &&
    isDate(v["created_at"])
  );
}
