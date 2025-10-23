import { Injectable, inject } from '@angular/core';
import { SUPABASE } from '../injection-tokens';

export interface WorkoutSessionData {
  workoutName: string;
  scheduleId?: string;
  scheduleDayId?: string;
  startTime: Date;
  endTime: Date;
  duration: number; // in minutes
  exercises: Array<{
    name: string;
    sets: Array<{
      reps: number;
      weight: number;
      weight_unit: 'LB' | 'KG';
      completed: boolean;
      type?: 'WARMUP' | 'WORK' | 'DROP';
      did_fail?: boolean;
    }>;
  }>;
}

@Injectable({
  providedIn: 'root',
})
export class WorkoutSessionService {
  private readonly supabase = inject(SUPABASE);

  /**
   * Save a completed workout session
   */
  async saveWorkoutSession(sessionData: WorkoutSessionData): Promise<string> {
    // Create the session record
    const { data: session, error: sessionError } = await this.supabase
      .from('session')
      .insert({
        schedule_id: sessionData.scheduleId,
        schedule_day_id: sessionData.scheduleDayId,
        workout_name: sessionData.workoutName,
        started_at: sessionData.startTime.toISOString(),
        completed_at: sessionData.endTime.toISOString(),
        duration_minutes: sessionData.duration,
      })
      .select()
      .single();

    if (sessionError) {
      console.error('Error creating session:', sessionError);
      throw sessionError;
    }

    // Save each exercise and its sets
    for (let exerciseIndex = 0; exerciseIndex < sessionData.exercises.length; exerciseIndex++) {
      const exercise = sessionData.exercises[exerciseIndex];

      // Get or create the exercise
      const { data: exerciseData } = await this.supabase
        .from('exercise')
        .select('id')
        .eq('name', exercise.name)
        .maybeSingle();

      let exerciseId: string;

      if (!exerciseData) {
        const { data: newExercise, error: createError } = await this.supabase
          .from('exercise')
          .insert({ name: exercise.name })
          .select()
          .single();

        if (createError) {
          console.error('Error creating exercise:', createError);
          throw createError;
        }

        exerciseId = newExercise.id;
      } else {
        exerciseId = exerciseData.id;
      }

      // Create session_exercise record
      const { error: sessionExerciseError } = await this.supabase.from('session_exercise').insert({
        session_id: session.id,
        session_index: exerciseIndex,
        exercise_id: exerciseId,
      });

      if (sessionExerciseError) {
        console.error('Error creating session exercise:', sessionExerciseError);
        throw sessionExerciseError;
      }

      // Save all sets for this exercise (including incomplete ones)
      for (let setIndex = 0; setIndex < exercise.sets.length; setIndex++) {
        const set = exercise.sets[setIndex];

        // Only save completed sets
        if (!set.completed) continue;

        const { error: setError } = await this.supabase.from('session_set').insert({
          session_id: session.id,
          session_index: exerciseIndex,
          exercise_index: setIndex,
          reps: set.reps,
          weight: set.weight,
          weight_unit: set.weight_unit,
          type: set.type || 'WORK',
          did_fail: set.did_fail || false,
        });

        if (setError) {
          console.error('Error creating session set:', setError);
          throw setError;
        }
      }
    }

    return session.id;
  }
}
