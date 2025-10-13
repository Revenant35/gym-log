import { Component, computed, signal, OnInit, inject } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { Schedule, DayOfWeek, DAYS_OF_WEEK } from '../../models';
import { ScheduleService } from '../../services/schedule.service';

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
export class ScheduleDetailScreen implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly scheduleService = inject(ScheduleService);

  readonly scheduleItem = signal<ScheduleItem | null>(null);
  readonly isLoading = signal<boolean>(true);

  // Mock data - fallback
  private readonly mockScheduleItem: ScheduleItem = {
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
  };

  async ngOnInit(): Promise<void> {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      await this.loadSchedule(id);
    } else {
      this.scheduleItem.set(this.mockScheduleItem);
      this.isLoading.set(false);
    }
  }

  private async loadSchedule(id: string): Promise<void> {
    this.isLoading.set(true);
    try {
      const scheduleWithDetails = await this.scheduleService.getSchedule(id);
      const schedule = this.scheduleService.convertToSchedule(scheduleWithDetails);

      const item: ScheduleItem = {
        id: scheduleWithDetails.id,
        name: scheduleWithDetails.name,
        schedule,
        isActive: scheduleWithDetails.is_active,
      };

      this.scheduleItem.set(item);
    } catch (error) {
      console.error('Error loading schedule:', error);
      this.scheduleItem.set(this.mockScheduleItem);
    } finally {
      this.isLoading.set(false);
    }
  }

  readonly expandedDays = signal<Set<DayOfWeek>>(new Set());

  readonly daysOfWeek = DAYS_OF_WEEK;

  readonly weekDays = computed(() => {
    const item = this.scheduleItem();
    if (!item) return [];
    const schedule = item.schedule;
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

  async setActive(): Promise<void> {
    const item = this.scheduleItem();
    if (!item) return;

    try {
      await this.scheduleService.setActiveSchedule(item.id);
      this.scheduleItem.update((current) => 
        current ? { ...current, isActive: true } : current
      );
    } catch (error) {
      console.error('Error setting active schedule:', error);
      alert('Failed to set active schedule. Please try again.');
    }
  }
}
