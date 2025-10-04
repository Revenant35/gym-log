interface Exercise {
  id: string;
  name: string;
}

interface ExerciseSearchParams {
  query?: string;
  page: number;
  limit: number;
}

interface CreateExerciseParams {
  name: string;
}

interface UpdateExerciseParams {
  id: string;
  name?: string;
}

interface DeleteExerciseParams {
  id: string;
}
