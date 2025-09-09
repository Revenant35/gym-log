import {ExercisePerformance} from './exercise-performance';

export interface SessionPerformance {
  name: string;
  date: Date;
  exercises: ExercisePerformance[];
}
