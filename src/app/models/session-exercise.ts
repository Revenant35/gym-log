export interface SessionExercise {
  session_id: string;
  session_index: number;
  exercise_id: string;
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
