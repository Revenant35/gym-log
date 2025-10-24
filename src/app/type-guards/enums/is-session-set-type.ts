import { SetType } from '../../models';

export function isSessionSetType(v: unknown): v is SetType {
  return v === 'WARMUP' || v === 'WORK' || v === 'DROP';
}
