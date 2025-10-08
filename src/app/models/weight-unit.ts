export type WeightUnit = 'KG' | 'LB';
export const DEFAULT_WEIGHT_UNIT: WeightUnit = 'LB';
export function isWeightUnit(v: unknown): v is WeightUnit {
  return v === 'KG' || v === 'LB';
}
