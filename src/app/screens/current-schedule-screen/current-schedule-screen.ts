import { Component, computed, signal, OnInit, inject } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { RouterLink } from '@angular/router';
import { Schedule, ScheduleDay, DayOfWeek, DAYS_OF_WEEK } from '../../models';
import { TitleCasePipe } from '@angular/common';
import { ScheduleService } from '../../services/schedule.service';
import {ScheduleDayOfWeekPicker} from '../../components/day-of-week-picker/schedule-day-of-week-picker.component';
import {DateProvider} from '../../services/date-provider';

@Component({
  selector: 'app-current-schedule-screen',
  imports: [IonicModule, RouterLink, TitleCasePipe, ScheduleDayOfWeekPicker],
  templateUrl: './current-schedule-screen.html',
  styleUrl: './current-schedule-screen.scss',
})
export class CurrentScheduleScreen implements OnInit {
  private readonly scheduleService = inject(ScheduleService);
  private readonly dateProvider = inject(DateProvider);

  // Mock data - current active schedule (fallback)
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
  readonly selectedDay = signal<DayOfWeek>(this.dateProvider.dayOfWeek());
  readonly isLoading = signal<boolean>(true);

  async ngOnInit(): Promise<void> {
    await this.loadActiveSchedule();
  }

  private async loadActiveSchedule(): Promise<void> {
    this.isLoading.set(true);
    try {
      const activeSchedule = await this.scheduleService.getActiveSchedule();

      if (activeSchedule) {
        const schedule = this.scheduleService.convertToSchedule(activeSchedule);
        this.schedule.set(schedule);
      } else {
        // Use mock data if no active schedule
        this.schedule.set(this.mockSchedule);
      }
    } catch (error) {
      console.error('Error loading active schedule:', error);
      // Fallback to mock data on error
      this.schedule.set(this.mockSchedule);
    } finally {
      this.isLoading.set(false);
    }
  }

  readonly selectedDayWorkout = computed<ScheduleDay | undefined>(() => {
    return this.schedule().days[this.selectedDay()];
  });

  previousDay(): void {
    switch (this.selectedDay()) {
      case "monday":
        this.selectedDay.set("sunday");
        break;
      case "tuesday":
        this.selectedDay.set("monday");
        break;
      case "wednesday":
        this.selectedDay.set("tuesday");
        break;
      case "thursday":
        this.selectedDay.set("wednesday");
        break;
      case "friday":
        this.selectedDay.set("thursday");
        break;
      case "saturday":
        this.selectedDay.set("friday");
        break;
      case "sunday":
        this.selectedDay.set("saturday");
        break;

    }
  }

  nextDay(): void {
    switch (this.selectedDay()) {
      case "monday":
        this.selectedDay.set("tuesday");
        break;
      case "tuesday":
        this.selectedDay.set("wednesday");
        break;
      case "wednesday":
        this.selectedDay.set("thursday");
        break;
      case "thursday":
        this.selectedDay.set("friday");
        break;
      case "friday":
        this.selectedDay.set("saturday");
        break;
      case "saturday":
        this.selectedDay.set("sunday");
        break;
      case "sunday":
        this.selectedDay.set("monday");
        break;

    }
  }

  formatExerciseDetails(sets: number, reps: number, weight: number, unit: string): string {
    const weightStr = weight > 0 ? ` @ ${weight} ${unit}` : '';
    return `${sets} × ${reps}${weightStr}`;
  }
}
