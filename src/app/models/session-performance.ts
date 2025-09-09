import {ExercisePerformance} from './exercise-performance';
import {Session} from './session';

export interface SessionPerformance {
  session?: Session;
  exercises: ExercisePerformance[];
}
