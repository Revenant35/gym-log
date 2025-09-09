import {WeightUnit} from './units';

export type Load =
  | { kind: 'absolute'; value: number; unit: WeightUnit; }
  | { kind: '%1RM'; value: number; }
  | { kind: '%BW'; value: number; };
