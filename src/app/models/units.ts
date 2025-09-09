export type WeightUnit = 'kg' | 'lb';
export const DEFAULT_WEIGHT_UNIT: WeightUnit = 'lb';
export function isWeightUnit(v: unknown): v is WeightUnit {
  return v === 'kg' || v === 'lb';
}

export type HeightUnit = 'feet-inches' | 'centimeters';
export const DEFAULT_HEIGHT_UNIT: HeightUnit = 'feet-inches';
export function isHeightUnit(v: unknown): v is HeightUnit {
  return v === 'feet-inches' || v === 'centimeters';
}

export type ClockUnit = '12-hour' | '24-hour';
export const DEFAULT_CLOCK_UNIT: ClockUnit = '12-hour';
export function isClockUnit(v: unknown): v is ClockUnit {
  return v === '12-hour' || v === '24-hour';
}
