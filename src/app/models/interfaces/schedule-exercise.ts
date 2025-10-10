import {WeightUnit} from '../enums';

export interface ScheduleExercise {
  name: string;
  sets: number;
  reps: number;
  weight: number;
  weight_unit: WeightUnit;
}
