import {HeightUnit} from '../../models';

export function isHeightUnit(v: unknown): v is HeightUnit {
  return v === 'feet-inches' || v === 'centimeters';
}
