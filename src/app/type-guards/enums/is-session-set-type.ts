import {SessionSetType} from '../../models';

export function isSessionSetType(v: unknown): v is SessionSetType {
  return v === 'WARMUP' || v === 'WORK' || v === 'DROP';
}
