export type Effort =
  | { kind: 'reps'; value: number }
  | { kind: 'RPE'; value: number }
  | { kind: 'AMRAP'; minReps?: number; };
