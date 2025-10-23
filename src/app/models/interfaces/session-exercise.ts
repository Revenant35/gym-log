import { SessionSet } from './session-set';
import { Exercise } from './exercise';

export interface SessionExercise extends Exercise {
  sets: SessionSet[];
  created_at: Date;
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
