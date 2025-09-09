import {WeightUnit} from './units';
import {SetKind} from './set-kind';

export interface SetPerformance {
  kind?: SetKind;
  reps: number;
  weight: number;
  unit: WeightUnit;
}
