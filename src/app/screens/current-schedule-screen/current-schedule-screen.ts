import { Component, computed, signal } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { RouterLink } from '@angular/router';
import { Schedule, ScheduleDay, DayOfWeek, DAYS_OF_WEEK } from '../../models';
import {TitleCasePipe} from '@angular/common';

@Component({
  selector: 'app-current-schedule-screen',
  imports: [IonicModule, RouterLink, TitleCasePipe],
  templateUrl: './current-schedule-screen.html',
  styleUrl: './current-schedule-screen.scss',
})
export class CurrentScheduleScreen {
  // Mock data - current active schedule
  private readonly mockSchedule: Schedule = {
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
  };

  readonly schedule = signal<Schedule>(this.mockSchedule);
  readonly selectedDayIndex = signal<number>(this.getTodayIndex());

  readonly daysOfWeek = DAYS_OF_WEEK;

  readonly selectedDay = computed<DayOfWeek>(() => {
    return this.daysOfWeek[this.selectedDayIndex()];
  });

  readonly selectedDayWorkout = computed<ScheduleDay | undefined>(() => {
    return this.schedule().days[this.selectedDay()];
  });

  readonly dayIndicators = computed(() => {
    return this.daysOfWeek.map((day, index) => ({
      day,
      label: day.substring(0, 1).toUpperCase(),
      hasWorkout: !!this.schedule().days[day],
      isToday: index === this.getTodayIndex(),
      isSelected: index === this.selectedDayIndex(),
    }));
  });

  selectDay(index: number): void {
    this.selectedDayIndex.set(index);
  }

  previousDay(): void {
    const current = this.selectedDayIndex();
    this.selectedDayIndex.set(current === 0 ? 6 : current - 1);
  }

  nextDay(): void {
    const current = this.selectedDayIndex();
    this.selectedDayIndex.set(current === 6 ? 0 : current + 1);
  }

  private getTodayIndex(): number {
    const today = new Date().getDay();
    // Convert Sunday (0) to 6, and shift others down by 1
    return today === 0 ? 6 : today - 1;
  }

  formatExerciseDetails(sets: number, reps: number, weight: number, unit: string): string {
    const weightStr = weight > 0 ? ` @ ${weight} ${unit}` : '';
    return `${sets} × ${reps}${weightStr}`;
  }
}
