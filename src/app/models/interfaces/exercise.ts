export interface Exercise {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ExerciseSearchParams {
  query?: string;
  page: number;
  limit: number;
}

export type CreateExercise = {
  name: string;
};

export type UpdateExercise = Partial<Exercise>;
