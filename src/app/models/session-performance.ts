import {ExercisePerformance} from './exercise-performance';

export interface SessionPerformance {
  date: Date;
  exercises: ExercisePerformance[];
}
