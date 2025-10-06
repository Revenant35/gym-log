
// I should be able to:
//  - Look up exercises by name
//  - Create an exercise plan
//  - Add exercises to a plan
//  - Remove exercises from a plan
//  - Update a plans metadata
//  - Delete a plan
//  - Mark a plan as active/inactive

// Stretch goal:
//  - Find exercise variants (e.g. weighted pull up is a variant of a pull up)
//  - Find exercises by muscle group
//  - RPE/AMRAP sets
//  - Bodyweight

interface AssignedExercisePlan {
  exercisePlanId: string;
  userId: string;
  startDate: Date | undefined;
  endDate: Date | undefined;
}

interface ExercisePlan {
  id: string;
  name: string;
  exerciseIds: Record<DayOfWeek, string[]>;
}

interface ExercisePlanExercise {
  id: string;
  exerciseId: string;
  name: string;
  sets: ExercisePlanExerciseSet[];
}

// interface ExercisePlanExerciseSet {
//   id: string;
//   reps: number;
//   weight: number;
//   isWarmUp: boolean;
// }

type DayOfWeek = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';

interface ExercisePlanExerciseSet {
  id: string;
  goal: SetGoal;
  resistance: SetResistance;
  kind: SetKind;
  didFail: boolean;
}

type SetGoal = {
  type: 'reps';
  reps: number;
}

type SetResistance = {
  type: 'weight';
  weight: number;
  unit: 'lbs';
}

type SetKind = 'warmup' | 'drop-set' | 'normal' ;


// 5x10 BW
// 5x10 220lbs
// 5 AMRAP BW
// 5 AMRAP 220lbs
// 5 RPE 9 BW
// 5 RPE 9 220lbs
