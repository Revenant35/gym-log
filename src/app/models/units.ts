export type WeightUnit = 'kg' | 'lb';
export const DEFAULT_WEIGHT_UNIT: WeightUnit = 'kg';
export const isWeightUnit = (v: unknown): v is WeightUnit =>
  v === 'kg' || v === 'lb';
