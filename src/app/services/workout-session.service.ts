import { Injectable, inject } from '@angular/core';
import { SupabaseClient } from '@supabase/supabase-js';
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

interface SessionRow {
  id: string;
  created_at: string;
  user_id: string;
  schedule_id?: string;
  schedule_day_id?: string;
  workout_name?: string;
  started_at: string;
  completed_at?: string;
  duration_minutes?: number;
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
      const { error: sessionExerciseError } = await this.supabase
        .from('session_exercise')
        .insert({
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

        const { error: setError } = await this.supabase
          .from('session_set')
          .insert({
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

  /**
   * Get recent workout sessions
   */
  async getRecentSessions(limit: number = 10): Promise<SessionRow[]> {
    const { data, error } = await this.supabase
      .from('session')
      .select('*')
      .order('started_at', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Error fetching recent sessions:', error);
      throw error;
    }

    return data as SessionRow[];
  }

  /**
   * Get a specific workout session with all details
   */
  async getSession(sessionId: string): Promise<any> {
    const { data: session, error: sessionError } = await this.supabase
      .from('session')
      .select(`
        *,
        exercises:session_exercise(
          *,
          exercise:exercise_id(id, name),
          sets:session_set(*)
        )
      `)
      .eq('id', sessionId)
      .single();

    if (sessionError) {
      console.error('Error fetching session:', sessionError);
      throw sessionError;
    }

    return session;
  }

  /**
   * Get workout history for a specific exercise
   */
  async getExerciseHistory(exerciseName: string, limit: number = 10): Promise<any[]> {
    // First get the exercise ID
    const { data: exercise, error: exerciseError } = await this.supabase
      .from('exercise')
      .select('id')
      .eq('name', exerciseName)
      .single();

    if (exerciseError || !exercise) {
      return [];
    }

    // Get sessions with this exercise
    const { data, error } = await this.supabase
      .from('session_exercise')
      .select(`
        *,
        session:session_id(*),
        sets:session_set(*)
      `)
      .eq('exercise_id', exercise.id)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Error fetching exercise history:', error);
      throw error;
    }

    return data || [];
  }

  /**
   * Get workout statistics
   */
  async getWorkoutStats(): Promise<{
    totalWorkouts: number;
    totalSets: number;
    totalReps: number;
    averageDuration: number;
  }> {
    // Get total workouts
    const { count: totalWorkouts, error: workoutsError } = await this.supabase
      .from('session')
      .select('*', { count: 'exact', head: true });

    if (workoutsError) {
      console.error('Error fetching workout count:', workoutsError);
      throw workoutsError;
    }

    // Get total sets and reps
    const { data: setsData, error: setsError } = await this.supabase
      .from('session_set')
      .select('reps');

    if (setsError) {
      console.error('Error fetching sets data:', setsError);
      throw setsError;
    }

    const totalSets = setsData?.length || 0;
    const totalReps = setsData?.reduce((sum, set) => sum + set.reps, 0) || 0;

    // Get average duration
    const { data: sessionsData, error: durationsError } = await this.supabase
      .from('session')
      .select('duration_minutes')
      .not('duration_minutes', 'is', null);

    if (durationsError) {
      console.error('Error fetching durations:', durationsError);
      throw durationsError;
    }

    const averageDuration = sessionsData && sessionsData.length > 0
      ? sessionsData.reduce((sum, s) => sum + (s.duration_minutes || 0), 0) / sessionsData.length
      : 0;

    return {
      totalWorkouts: totalWorkouts || 0,
      totalSets,
      totalReps,
      averageDuration: Math.round(averageDuration),
    };
  }
}
