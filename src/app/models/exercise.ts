export type ExerciseCategory = 'compound' | 'accessory';

export interface Exercise {
  name: string;
  category: ExerciseCategory;
}
