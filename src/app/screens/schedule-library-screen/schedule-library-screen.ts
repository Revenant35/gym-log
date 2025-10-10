import { Component, signal } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { RouterLink } from '@angular/router';
import { Schedule } from '../../models';

interface ScheduleItem {
  id: string;
  name: string;
  schedule: Schedule;
  isActive: boolean;
  createdAt: Date;
  lastUsed?: Date;
}

@Component({
  selector: 'app-schedule-library-screen',
  imports: [IonicModule, RouterLink],
  templateUrl: './schedule-library-screen.html',
  styleUrl: './schedule-library-screen.scss',
})
export class ScheduleLibraryScreen {
  // Mock data - list of schedules
  readonly schedules = signal<ScheduleItem[]>([
    {
      id: '1',
      name: 'Push Pull Legs',
      schedule: {
        days: {
          monday: {
            name: 'Push Day',
            exercises: [
              { name: 'Bench Press', sets: 4, reps: 8, weight: 185, weight_unit: 'LB' },
              { name: 'Overhead Press', sets: 3, reps: 10, weight: 95, weight_unit: 'LB' },
              { name: 'Incline Dumbbell Press', sets: 3, reps: 12, weight: 60, weight_unit: 'LB' },
              { name: 'Tricep Dips', sets: 3, reps: 12, weight: 0, weight_unit: 'LB' },
            ],
          },
          wednesday: {
            name: 'Pull Day',
            exercises: [
              { name: 'Deadlift', sets: 4, reps: 6, weight: 275, weight_unit: 'LB' },
              { name: 'Pull-ups', sets: 3, reps: 10, weight: 0, weight_unit: 'LB' },
              { name: 'Barbell Rows', sets: 3, reps: 10, weight: 135, weight_unit: 'LB' },
              { name: 'Face Pulls', sets: 3, reps: 15, weight: 40, weight_unit: 'LB' },
            ],
          },
          friday: {
            name: 'Leg Day',
            exercises: [
              { name: 'Squat', sets: 4, reps: 8, weight: 225, weight_unit: 'LB' },
              { name: 'Romanian Deadlift', sets: 3, reps: 10, weight: 185, weight_unit: 'LB' },
              { name: 'Leg Press', sets: 3, reps: 12, weight: 360, weight_unit: 'LB' },
              { name: 'Leg Curls', sets: 3, reps: 12, weight: 90, weight_unit: 'LB' },
            ],
          },
        },
      },
      isActive: true,
      createdAt: new Date('2025-10-01'),
      lastUsed: new Date('2025-10-10'),
    },
    {
      id: '2',
      name: 'Upper Lower Split',
      schedule: {
        days: {
          monday: {
            name: 'Upper Body',
            exercises: [
              { name: 'Bench Press', sets: 4, reps: 8, weight: 185, weight_unit: 'LB' },
              { name: 'Barbell Rows', sets: 4, reps: 8, weight: 135, weight_unit: 'LB' },
              { name: 'Overhead Press', sets: 3, reps: 10, weight: 95, weight_unit: 'LB' },
            ],
          },
          thursday: {
            name: 'Lower Body',
            exercises: [
              { name: 'Squat', sets: 4, reps: 8, weight: 225, weight_unit: 'LB' },
              { name: 'Romanian Deadlift', sets: 3, reps: 10, weight: 185, weight_unit: 'LB' },
              { name: 'Leg Press', sets: 3, reps: 12, weight: 360, weight_unit: 'LB' },
            ],
          },
        },
      },
      isActive: false,
      createdAt: new Date('2025-09-15'),
      lastUsed: new Date('2025-09-30'),
    },
    {
      id: '3',
      name: 'Full Body 3x/Week',
      schedule: {
        days: {
          monday: {
            name: 'Full Body A',
            exercises: [
              { name: 'Squat', sets: 3, reps: 8, weight: 225, weight_unit: 'LB' },
              { name: 'Bench Press', sets: 3, reps: 8, weight: 185, weight_unit: 'LB' },
              { name: 'Barbell Rows', sets: 3, reps: 8, weight: 135, weight_unit: 'LB' },
            ],
          },
          wednesday: {
            name: 'Full Body B',
            exercises: [
              { name: 'Deadlift', sets: 3, reps: 6, weight: 275, weight_unit: 'LB' },
              { name: 'Overhead Press', sets: 3, reps: 8, weight: 95, weight_unit: 'LB' },
              { name: 'Pull-ups', sets: 3, reps: 10, weight: 0, weight_unit: 'LB' },
            ],
          },
          friday: {
            name: 'Full Body C',
            exercises: [
              { name: 'Front Squat', sets: 3, reps: 8, weight: 185, weight_unit: 'LB' },
              { name: 'Incline Press', sets: 3, reps: 8, weight: 155, weight_unit: 'LB' },
              { name: 'Romanian Deadlift', sets: 3, reps: 10, weight: 185, weight_unit: 'LB' },
            ],
          },
        },
      },
      isActive: false,
      createdAt: new Date('2025-08-20'),
      lastUsed: new Date('2025-09-10'),
    },
  ]);

  getWorkoutDaysCount(schedule: Schedule): number {
    return Object.keys(schedule.days).length;
  }

  getAverageExerciseCount(schedule: Schedule): number {
    const days = Object.values(schedule.days);
    if (days.length === 0) return 0;
    const total = days.reduce((sum, day) => sum + day.exercises.length, 0);
    return Math.round(total / days.length);
  }

  formatDate(date: Date): string {
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }

  setActive(scheduleId: string): void {
    this.schedules.update((schedules) =>
      schedules.map((s) => ({
        ...s,
        isActive: s.id === scheduleId,
      }))
    );
  }

  duplicateSchedule(scheduleId: string): void {
    const schedule = this.schedules().find((s) => s.id === scheduleId);
    if (!schedule) return;

    const newSchedule: ScheduleItem = {
      ...schedule,
      id: Date.now().toString(),
      name: `${schedule.name} (Copy)`,
      isActive: false,
      createdAt: new Date(),
      lastUsed: undefined,
    };

    this.schedules.update((schedules) => [newSchedule, ...schedules]);
  }

  deleteSchedule(scheduleId: string): void {
    this.schedules.update((schedules) => schedules.filter((s) => s.id !== scheduleId));
  }
}
