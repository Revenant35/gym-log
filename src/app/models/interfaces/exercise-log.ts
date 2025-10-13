import {ScheduleExercise} from './schedule-exercise';
import {WorkoutSet} from './workout-set';

// TODO: Create validator
export interface ExerciseLog {
  exercise: ScheduleExercise;
  sets: WorkoutSet[];
  currentSetIndex: number;
}
