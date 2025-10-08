import {SessionSet} from './session-set';
import {Exercise} from './exercise';

export interface SessionExercise {
  exercise: Exercise;
  sets: SessionSet[];
  created_at: string;
}

export interface CreateSessionExerciseParams {
  session_id: string;
  session_index: number;
  exercise_id: string;
}

export interface DeleteSessionExerciseParams {
  session_id: string;
  session_index: number;
}
