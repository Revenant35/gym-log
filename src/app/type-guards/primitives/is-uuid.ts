import {isString} from './is-string';

export function isUUID(v: unknown): v is string {
  if (!isString(v)) {
    return false;
  }

  const regExp = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

  return regExp.test(v);
}
