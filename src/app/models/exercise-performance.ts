import {SetPerformance} from './set-performance';
import {Exercise} from './exercise';

export interface ExercisePerformance {
  exercise?: Exercise;
  sets: SetPerformance[];
}
