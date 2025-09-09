import {WeightUnit} from './units';
import {SetGoal} from './set-goal';

export interface SetPerformance {
  goal?: SetGoal;
  reps: number;
  weight: number;
  unit: WeightUnit;
}
