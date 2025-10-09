import {SessionSetType} from '../../models';

export function isSessionSetType(v: unknown): v is SessionSetType {
  return v === 'WARM_UP' || v === 'NORMAL' || v === 'DROP_SET';
}
