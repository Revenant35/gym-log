import { WeightUnit } from '../../models';

export function isWeightUnit(v: unknown): v is WeightUnit {
  return v === 'KG' || v === 'LB';
}
