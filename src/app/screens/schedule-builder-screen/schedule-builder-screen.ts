import { Component, signal, computed, inject, OnInit } from '@angular/core';
import { IonicModule, SegmentChangeEventDetail } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Schedule, ScheduleDay, ScheduleExercise, DayOfWeek, DAYS_OF_WEEK, WeightUnit } from '../../models';
import { ScheduleService } from '../../services/schedule.service';

interface DayBuilder {
  day: DayOfWeek;
  dayName: string;
  isSelected: boolean;
  workout?: ScheduleDay;
}

interface ScheduleItem {
  id: string;
  name: string;
  schedule: Schedule;
  isActive: boolean;
}

@Component({
  selector: 'app-schedule-builder-screen',
  imports: [IonicModule, FormsModule],
  templateUrl: './schedule-builder-screen.html',
  styleUrl: './schedule-builder-screen.scss',
})
export class ScheduleBuilderScreen implements OnInit {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly scheduleService = inject(ScheduleService);

  readonly scheduleId = signal<string | null>(null);
  readonly isEditMode = computed(() => !!this.scheduleId());
  readonly scheduleName = signal<string>('');
  readonly currentStep = signal<'info' | 'days'>('info');
  readonly selectedDay = signal<DayOfWeek | null>(null);
  readonly isSaving = signal<boolean>(false);

  readonly days = signal<DayBuilder[]>(
    DAYS_OF_WEEK.map((day) => ({
      day,
      dayName: day.charAt(0).toUpperCase() + day.slice(1),
      isSelected: false,
      workout: undefined,
    }))
  );

  readonly selectedDays = computed(() => this.days().filter((d) => d.isSelected));

  readonly currentDayBuilder = computed(() => {
    const day = this.selectedDay();
    if (!day) return null;
    return this.days().find((d) => d.day === day);
  });

  // Mock data for editing - would normally fetch from service
  private readonly mockSchedules: ScheduleItem[] = [
    {
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
    },
  ];

  async ngOnInit(): Promise<void> {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.scheduleId.set(id);
      await this.loadSchedule(id);
    }
  }

  private async loadSchedule(id: string): Promise<void> {
    try {
      const scheduleWithDetails = await this.scheduleService.getSchedule(id);
      const schedule = this.scheduleService.convertToSchedule(scheduleWithDetails);

      this.scheduleName.set(scheduleWithDetails.name);

      // Convert schedule to day builders
      const newDays = DAYS_OF_WEEK.map((day) => {
        const workout = schedule.days[day];
        return {
          day,
          dayName: day.charAt(0).toUpperCase() + day.slice(1),
          isSelected: !!workout,
          workout: workout ? { ...workout } : undefined,
        };
      });

      this.days.set(newDays);
    } catch (error) {
      console.error('Error loading schedule:', error);
      alert('Failed to load schedule. Please try again.');
      this.router.navigate(['/schedules']);
    }
  }

  toggleDay(day: DayOfWeek): void {
    this.days.update((days) =>
      days.map((d) =>
        d.day === day
          ? {
              ...d,
              isSelected: !d.isSelected,
              workout: !d.isSelected
                ? { name: '', exercises: [] }
                : undefined,
            }
          : d
      )
    );
  }

  selectDayToEdit(day: DayOfWeek): void {
    this.selectedDay.set(day);
  }

  backToDaysList(): void {
    this.selectedDay.set(null);
  }

  updateWorkoutName(name: string): void {
    const day = this.selectedDay();
    if (!day) return;

    this.days.update((days) =>
      days.map((d) =>
        d.day === day && d.workout
          ? { ...d, workout: { ...d.workout, name } }
          : d
      )
    );
  }

  addExercise(): void {
    const day = this.selectedDay();
    if (!day) return;

    const newExercise: ScheduleExercise = {
      name: '',
      sets: 3,
      reps: 10,
      weight: 0,
      weight_unit: 'LB',
    };

    this.days.update((days) =>
      days.map((d) =>
        d.day === day && d.workout
          ? {
              ...d,
              workout: {
                ...d.workout,
                exercises: [...d.workout.exercises, newExercise],
              },
            }
          : d
      )
    );
  }

  updateExercise(index: number, field: keyof ScheduleExercise, value: any): void {
    const day = this.selectedDay();
    if (!day) return;

    this.days.update((days) =>
      days.map((d) =>
        d.day === day && d.workout
          ? {
              ...d,
              workout: {
                ...d.workout,
                exercises: d.workout.exercises.map((ex, i) =>
                  i === index ? { ...ex, [field]: value } : ex
                ),
              },
            }
          : d
      )
    );
  }

  removeExercise(index: number): void {
    const day = this.selectedDay();
    if (!day) return;

    this.days.update((days) =>
      days.map((d) =>
        d.day === day && d.workout
          ? {
              ...d,
              workout: {
                ...d.workout,
                exercises: d.workout.exercises.filter((_, i) => i !== index),
              },
            }
          : d
      )
    );
  }

  moveExercise(index: number, direction: 'up' | 'down'): void {
    const day = this.selectedDay();
    if (!day) return;

    this.days.update((days) =>
      days.map((d) => {
        if (d.day !== day || !d.workout) return d;

        const exercises = [...d.workout.exercises];
        const newIndex = direction === 'up' ? index - 1 : index + 1;

        if (newIndex < 0 || newIndex >= exercises.length) return d;

        [exercises[index], exercises[newIndex]] = [exercises[newIndex], exercises[index]];

        return {
          ...d,
          workout: {
            ...d.workout,
            exercises,
          },
        };
      })
    );
  }

  handleEvent(event: SegmentChangeEventDetail): void {
    if (event.value === 'info' || event.value === 'days') {
      this.currentStep.set(event.value);
    }
  }

  goToStep(step: 'info' | 'days'): void {
    this.currentStep.set(step);
  }

  canSave(): boolean {
    if (!this.scheduleName().trim()) return false;
    const selected = this.selectedDays();
    if (selected.length === 0) return false;

    return selected.every(
      (d) =>
        d.workout &&
        d.workout.name.trim() &&
        d.workout.exercises.length > 0 &&
        d.workout.exercises.every((ex) => ex.name.trim())
    );
  }

  async saveSchedule(): Promise<void> {
    if (!this.canSave() || this.isSaving()) return;

    this.isSaving.set(true);

    try {
      const schedule: Schedule = {
        days: {},
      };

      this.selectedDays().forEach((d) => {
        if (d.workout) {
          schedule.days[d.day] = d.workout;
        }
      });

      const name = this.scheduleName();
      const scheduleId = this.scheduleId();

      if (scheduleId) {
        // Update existing schedule
        await this.scheduleService.updateSchedule(scheduleId, name, schedule);
        console.log('Schedule updated successfully!');
      } else {
        // Create new schedule
        await this.scheduleService.createSchedule(name, schedule, false);
        console.log('Schedule created successfully!');
      }

      // Navigate back to schedules
      this.router.navigate(['/schedules']);
    } catch (error) {
      console.error('Error saving schedule:', error);
      alert('Failed to save schedule. Please try again.');
    } finally {
      this.isSaving.set(false);
    }
  }
}
