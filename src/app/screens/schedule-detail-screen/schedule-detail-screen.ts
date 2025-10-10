import { Component, computed, signal } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Schedule, DayOfWeek, DAYS_OF_WEEK } from '../../models';

interface ScheduleItem {
  id: string;
  name: string;
  schedule: Schedule;
  isActive: boolean;
}

@Component({
  selector: 'app-schedule-detail-screen',
  imports: [IonicModule, RouterLink],
  templateUrl: './schedule-detail-screen.html',
  styleUrl: './schedule-detail-screen.scss',
})
export class ScheduleDetailScreen {
  private readonly route = signal(ActivatedRoute);

  // Mock data - would normally fetch based on route param
  readonly scheduleItem = signal<ScheduleItem>({
    id: '1',
    name: 'Push Pull Legs',
    isActive: true,
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
  });

  readonly expandedDays = signal<Set<DayOfWeek>>(new Set());

  readonly daysOfWeek = DAYS_OF_WEEK;

  readonly weekDays = computed(() => {
    const schedule = this.scheduleItem().schedule;
    return this.daysOfWeek.map((day) => ({
      day,
      dayName: day.charAt(0).toUpperCase() + day.slice(1),
      workout: schedule.days[day],
      isExpanded: this.expandedDays().has(day),
    }));
  });

  toggleDay(day: DayOfWeek): void {
    this.expandedDays.update((expanded) => {
      const newSet = new Set(expanded);
      if (newSet.has(day)) {
        newSet.delete(day);
      } else {
        newSet.add(day);
      }
      return newSet;
    });
  }

  formatExerciseDetails(sets: number, reps: number, weight: number, unit: string): string {
    const weightStr = weight > 0 ? ` @ ${weight} ${unit}` : '';
    return `${sets} × ${reps}${weightStr}`;
  }

  setActive(): void {
    this.scheduleItem.update((item) => ({
      ...item,
      isActive: true,
    }));
  }
}
