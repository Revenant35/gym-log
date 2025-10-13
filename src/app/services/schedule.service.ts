import { Injectable, inject, signal } from '@angular/core';
import { SupabaseClient } from '@supabase/supabase-js';
import { Schedule, ScheduleDay, ScheduleExercise, DayOfWeek } from '../models';
import { SUPABASE } from '../injection-tokens';
import { Database } from '../util/database';

interface ScheduleRow {
  id: string;
  created_at: string;
  updated_at: string;
  user_id: string;
  name: string;
  is_active: boolean;
}

interface ScheduleDayRow {
  id: string;
  created_at: string;
  schedule_id: string;
  day_of_week: DayOfWeek;
  name: string;
}

interface ScheduleExerciseRow {
  id: string;
  created_at: string;
  schedule_day_id: string;
  exercise_id: string;
  exercise_index: number;
  sets: number;
  reps: number;
  weight: number;
  weight_unit: 'LB' | 'KG';
  exercise: {
    id: string;
    name: string;
  };
}

export interface ScheduleWithDetails extends ScheduleRow {
  days: Array<ScheduleDayRow & {
    exercises: ScheduleExerciseRow[];
  }>;
}

@Injectable({
  providedIn: 'root',
})
export class ScheduleService {
  private readonly supabase = inject(SUPABASE);

  readonly activeSchedule = signal<ScheduleWithDetails | null>(null);
  readonly schedules = signal<ScheduleWithDetails[]>([]);

  /**
   * Load all schedules for the current user
   */
  async loadSchedules(): Promise<void> {
    const { data, error } = await this.supabase
      .from('schedule')
      .select(`
        *,
        days:schedule_day(
          *,
          exercises:schedule_exercise(
            *,
            exercise:exercise_id(id, name)
          )
        )
      `)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error loading schedules:', error);
      throw error;
    }

    this.schedules.set(data as ScheduleWithDetails[]);

    // Set active schedule
    const active = data.find(s => s.is_active);
    if (active) {
      this.activeSchedule.set(active as ScheduleWithDetails);
    }
  }

  /**
   * Get active schedule
   */
  async getActiveSchedule(): Promise<ScheduleWithDetails | null> {
    const { data, error } = await this.supabase
      .from('schedule')
      .select(`
        *,
        days:schedule_day(
          *,
          exercises:schedule_exercise(
            *,
            exercise:exercise_id(id, name)
          )
        )
      `)
      .eq('is_active', true)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        // No active schedule found
        return null;
      }
      console.error('Error getting active schedule:', error);
      throw error;
    }

    this.activeSchedule.set(data as ScheduleWithDetails);
    return data as ScheduleWithDetails;
  }

  /**
   * Get a specific schedule by ID
   */
  async getSchedule(scheduleId: string): Promise<ScheduleWithDetails> {
    const { data, error } = await this.supabase
      .from('schedule')
      .select(`
        *,
        days:schedule_day(
          *,
          exercises:schedule_exercise(
            *,
            exercise:exercise_id(id, name)
          )
        )
      `)
      .eq('id', scheduleId)
      .single();

    if (error) {
      console.error('Error getting schedule:', error);
      throw error;
    }

    return data as ScheduleWithDetails;
  }

  /**
   * Create a new schedule
   */
  async createSchedule(
    name: string,
    schedule: Schedule,
    setAsActive: boolean = false
  ): Promise<ScheduleWithDetails> {
    // If setting as active, deactivate all other schedules first
    if (setAsActive) {
      await this.deactivateAllSchedules();
    }

    // Create the schedule
    const { data: scheduleData, error: scheduleError } = await this.supabase
      .from('schedule')
      .insert({
        name,
        is_active: setAsActive,
      })
      .select()
      .single();

    if (scheduleError) {
      console.error('Error creating schedule:', scheduleError);
      throw scheduleError;
    }

    // Create schedule days and exercises
    for (const [dayOfWeek, dayData] of Object.entries(schedule.days)) {
      if (!dayData) continue;

      // Create schedule day
      const { data: dayRow, error: dayError } = await this.supabase
        .from('schedule_day')
        .insert({
          schedule_id: scheduleData.id,
          day_of_week: dayOfWeek,
          name: dayData.name,
        })
        .select()
        .single();

      if (dayError) {
        console.error('Error creating schedule day:', dayError);
        throw dayError;
      }

      // Create exercises for this day
      for (let i = 0; i < dayData.exercises.length; i++) {
        const exercise = dayData.exercises[i];

        // First, ensure the exercise exists in the exercise table
        const { data: exerciseData, error: exerciseError } = await this.supabase
          .from('exercise')
          .select('id')
          .eq('name', exercise.name)
          .maybeSingle();

        let exerciseId: string;

        if (!exerciseData) {
          // Create the exercise
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

        // Create schedule exercise
        const { error: scheduleExerciseError } = await this.supabase
          .from('schedule_exercise')
          .insert({
            schedule_day_id: dayRow.id,
            exercise_id: exerciseId,
            exercise_index: i,
            sets: exercise.sets,
            reps: exercise.reps,
            weight: exercise.weight,
            weight_unit: exercise.weight_unit,
          });

        if (scheduleExerciseError) {
          console.error('Error creating schedule exercise:', scheduleExerciseError);
          throw scheduleExerciseError;
        }
      }
    }

    // Reload and return the created schedule
    return await this.getSchedule(scheduleData.id);
  }

  /**
   * Update an existing schedule
   */
  async updateSchedule(
    scheduleId: string,
    name: string,
    schedule: Schedule
  ): Promise<ScheduleWithDetails> {
    // Update schedule name
    const { error: updateError } = await this.supabase
      .from('schedule')
      .update({ name })
      .eq('id', scheduleId);

    if (updateError) {
      console.error('Error updating schedule:', updateError);
      throw updateError;
    }

    // Delete existing days and exercises (cascade will handle exercises)
    const { error: deleteError } = await this.supabase
      .from('schedule_day')
      .delete()
      .eq('schedule_id', scheduleId);

    if (deleteError) {
      console.error('Error deleting schedule days:', deleteError);
      throw deleteError;
    }

    // Recreate days and exercises
    for (const [dayOfWeek, dayData] of Object.entries(schedule.days)) {
      if (!dayData) continue;

      const { data: dayRow, error: dayError } = await this.supabase
        .from('schedule_day')
        .insert({
          schedule_id: scheduleId,
          day_of_week: dayOfWeek,
          name: dayData.name,
        })
        .select()
        .single();

      if (dayError) {
        console.error('Error creating schedule day:', dayError);
        throw dayError;
      }

      for (let i = 0; i < dayData.exercises.length; i++) {
        const exercise = dayData.exercises[i];

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

          if (createError) throw createError;
          exerciseId = newExercise.id;
        } else {
          exerciseId = exerciseData.id;
        }

        const { error: scheduleExerciseError } = await this.supabase
          .from('schedule_exercise')
          .insert({
            schedule_day_id: dayRow.id,
            exercise_id: exerciseId,
            exercise_index: i,
            sets: exercise.sets,
            reps: exercise.reps,
            weight: exercise.weight,
            weight_unit: exercise.weight_unit,
          });

        if (scheduleExerciseError) throw scheduleExerciseError;
      }
    }

    return await this.getSchedule(scheduleId);
  }

  /**
   * Set a schedule as active
   */
  async setActiveSchedule(scheduleId: string): Promise<void> {
    // Deactivate all schedules
    await this.deactivateAllSchedules();

    // Activate the selected schedule
    const { error } = await this.supabase
      .from('schedule')
      .update({ is_active: true })
      .eq('id', scheduleId);

    if (error) {
      console.error('Error setting active schedule:', error);
      throw error;
    }

    // Reload active schedule
    await this.getActiveSchedule();
  }

  /**
   * Delete a schedule
   */
  async deleteSchedule(scheduleId: string): Promise<void> {
    const { error } = await this.supabase
      .from('schedule')
      .delete()
      .eq('id', scheduleId);

    if (error) {
      console.error('Error deleting schedule:', error);
      throw error;
    }

    // Reload schedules
    await this.loadSchedules();
  }

  /**
   * Duplicate a schedule
   */
  async duplicateSchedule(scheduleId: string, newName: string): Promise<ScheduleWithDetails> {
    const original = await this.getSchedule(scheduleId);

    // Convert to Schedule format
    const schedule: Schedule = {
      days: {},
    };

    for (const day of original.days) {
      schedule.days[day.day_of_week] = {
        name: day.name,
        exercises: day.exercises
          .sort((a, b) => a.exercise_index - b.exercise_index)
          .map(ex => ({
            name: ex.exercise.name,
            sets: ex.sets,
            reps: ex.reps,
            weight: ex.weight,
            weight_unit: ex.weight_unit,
          })),
      };
    }

    return await this.createSchedule(newName, schedule, false);
  }

  /**
   * Deactivate all schedules
   */
  private async deactivateAllSchedules(): Promise<void> {
    const { error } = await this.supabase
      .from('schedule')
      .update({ is_active: false })
      .neq('id', '00000000-0000-0000-0000-000000000000'); // Update all

    if (error) {
      console.error('Error deactivating schedules:', error);
      throw error;
    }
  }

  /**
   * Convert ScheduleWithDetails to Schedule format
   */
  convertToSchedule(scheduleWithDetails: ScheduleWithDetails): Schedule {
    const schedule: Schedule = {
      days: {},
    };

    for (const day of scheduleWithDetails.days) {
      schedule.days[day.day_of_week] = {
        name: day.name,
        exercises: day.exercises
          .sort((a, b) => a.exercise_index - b.exercise_index)
          .map(ex => ({
            name: ex.exercise.name,
            sets: ex.sets,
            reps: ex.reps,
            weight: ex.weight,
            weight_unit: ex.weight_unit,
          })),
      };
    }

    return schedule;
  }
}
