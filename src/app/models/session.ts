import {SessionExercise} from './session-exercise';

export interface Session {
  id: string;
  exercises: SessionExercise[];
  user_id: string;
  created_at: string;
}

export interface CreateSessionParams {
  user_id: string;
}

export interface DeleteSessionParams {
  id: string;
}
