export type WeightUnit = 'kg' | 'lb';
export const DEFAULT_WEIGHT_UNIT: WeightUnit = 'kg';
export function isWeightUnit(v: unknown): v is WeightUnit {
  return v === 'kg' || v === 'lb';
}
