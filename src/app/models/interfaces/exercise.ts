export interface Exercise {
  id: string;
  name: string;
}

export interface ExerciseSearchParams {
  query?: string;
  page: number;
  limit: number;
}

export interface CreateExerciseParams {
  name: string;
}

export interface UpdateExerciseParams {
  id: string;
  name?: string;
}

export interface DeleteExerciseParams {
  id: string;
}
