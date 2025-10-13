import {Component, computed, inject, OnInit, signal} from '@angular/core';
import {IonicModule} from '@ionic/angular';
import {Router} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {DayOfWeek, ScheduleDay} from '../../models';
import {WorkoutSessionService} from '../../services/workout-session.service';
import {ScheduleService} from '../../services/schedule.service';
import {WorkoutSessionProgressBar} from '../../components/workout-session-progress-bar/workout-session-progress-bar';
import {ExerciseLoggingCard} from '../../components/exercise-logging-card/exercise-logging-card';
import {ExerciseLog} from '../../models';

@Component({
  selector: 'app-workout-session-screen',
  imports: [IonicModule, FormsModule, WorkoutSessionProgressBar, ExerciseLoggingCard],
  templateUrl: './workout-session-screen.html',
  styleUrl: './workout-session-screen.scss',
})
export class WorkoutSessionScreen implements OnInit {
  private readonly router = inject(Router);
  private readonly workoutSessionService = inject(WorkoutSessionService);
  private readonly scheduleService = inject(ScheduleService);

  readonly workoutName = signal<string>('');
  readonly dayOfWeek = signal<DayOfWeek | null>(null);
  readonly exerciseLogs = signal<ExerciseLog[]>([]);
  readonly startTime = signal<Date>(new Date());
  readonly isWorkoutComplete = signal<boolean>(false);
  readonly isSaving = signal<boolean>(false);

  private scheduleId?: string;
  private scheduleDayId?: string;

  // Mock workout data - would normally come from active schedule
  private readonly mockWorkout: ScheduleDay = {
    name: 'Push Day',
    exercises: [
      { name: 'Bench Press', sets: 4, reps: 8, weight: 185, weight_unit: 'LB' },
      { name: 'Overhead Press', sets: 3, reps: 10, weight: 95, weight_unit: 'LB' },
      { name: 'Incline Dumbbell Press', sets: 3, reps: 12, weight: 60, weight_unit: 'LB' },
      { name: 'Tricep Dips', sets: 3, reps: 12, weight: 0, weight_unit: 'LB' },
    ],
  };

  readonly totalExercises = computed(() => this.exerciseLogs().length);
  readonly completedExercises = computed(() =>
    this.exerciseLogs().filter(log =>
      log.sets.every(set => set.completed)
    ).length
  );
  readonly totalSets = computed(() =>
    this.exerciseLogs().reduce((sum, log) => sum + log.sets.length, 0)
  );
  readonly completedSets = computed(() =>
    this.exerciseLogs().reduce((sum, log) =>
      sum + log.sets.filter(set => set.completed).length, 0
    )
  );
  readonly workoutDuration = computed(() => {
    const now = new Date();
    const diff = now.getTime() - this.startTime().getTime();
    return Math.floor(diff / 60000);
  });

  async ngOnInit(): Promise<void> {
    await this.loadWorkout();
  }

  private async loadWorkout(): Promise<void> {
    try {
      // Try to load active schedule from Supabase
      const activeSchedule = await this.scheduleService.getActiveSchedule();

      if (activeSchedule) {
        // Get today's day of week
        const today = new Date().getDay();
        const dayNames: DayOfWeek[] = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
        const todayName = dayNames[today];

        // Find today's workout
        const todayWorkout = activeSchedule.days.find(d => d.day_of_week === todayName);

        if (todayWorkout && todayWorkout.exercises.length > 0) {
          this.scheduleId = activeSchedule.id;
          this.scheduleDayId = todayWorkout.id;
          this.workoutName.set(todayWorkout.name);
          this.dayOfWeek.set(todayName);

          // Convert schedule exercises to workout format
          const logs: ExerciseLog[] = todayWorkout.exercises
            .sort((a, b) => a.exercise_index - b.exercise_index)
            .map((scheduleEx, index) => ({
              exercise: {
                name: scheduleEx.exercise.name,
                sets: scheduleEx.sets,
                reps: scheduleEx.reps,
                weight: scheduleEx.weight,
                weight_unit: scheduleEx.weight_unit,
              },
              sets: Array.from({ length: scheduleEx.sets }, () => ({
                reps: scheduleEx.reps,
                weight: scheduleEx.weight,
                completed: false,
              })),
              currentSetIndex: 0,
              isExpanded: index === 0,
            }));

          this.exerciseLogs.set(logs);
          return;
        }
      }

      // Fallback to mock data if no active schedule
      this.loadMockWorkout();
    } catch (error) {
      console.error('Error loading workout:', error);
      // Fallback to mock data on error
      this.loadMockWorkout();
    }
  }

  private loadMockWorkout(): void {
    this.workoutName.set(this.mockWorkout.name);

    const logs: ExerciseLog[] = this.mockWorkout.exercises.map((exercise, index) => ({
      exercise,
      sets: Array.from({ length: exercise.sets }, () => ({
        reps: exercise.reps,
        weight: exercise.weight,
        completed: false,
      })),
      currentSetIndex: 0,
      isExpanded: index === 0,
    }));

    this.exerciseLogs.set(logs);
  }

  canCompleteWorkout(): boolean {
    return this.completedSets() > 0;
  }

  updateLog(logIndex: number, updatedLog: ExerciseLog): void {
    this.exerciseLogs.update(logs => {
      logs[logIndex] = updatedLog;
      return [...logs];
    });
  }

  async completeWorkout(): Promise<void> {
    if (this.isSaving()) return;

    this.isSaving.set(true);

    try {
      const workoutData = {
        workoutName: this.workoutName(),
        scheduleId: this.scheduleId,
        scheduleDayId: this.scheduleDayId,
        startTime: this.startTime(),
        endTime: new Date(),
        duration: this.workoutDuration(),
        exercises: this.exerciseLogs().map(log => ({
          name: log.exercise.name,
          sets: log.sets.map(set => ({
            reps: set.reps,
            weight: set.weight,
            weight_unit: log.exercise.weight_unit,
            completed: set.completed,
          })),
        })),
      };

      // Save to Supabase
      const sessionId = await this.workoutSessionService.saveWorkoutSession(workoutData);
      console.log('Workout saved successfully! Session ID:', sessionId);

      this.isWorkoutComplete.set(true);

      // Navigate back to schedule after a brief delay
      setTimeout(() => {
        this.router.navigate(['/schedule']);
      }, 2000);
    } catch (error) {
      console.error('Error saving workout:', error);
      // Show error to user (you could add a toast notification here)
      alert('Failed to save workout. Please try again.');
    } finally {
      this.isSaving.set(false);
    }
  }

  async cancelWorkout(): Promise<void> {
    const alert = await (window as any).ionicAlert?.create({
      header: 'Cancel Workout?',
      message: 'Your progress will not be saved.',
      buttons: [
        {
          text: 'Keep Going',
          role: 'cancel',
        },
        {
          text: 'Cancel Workout',
          role: 'destructive',
          handler: () => {
            this.router.navigate(['/schedule']);
          },
        },
      ],
    });

    if (alert) {
      await alert.present();
    } else {
      // Fallback if alert controller not available
      if (confirm('Cancel workout? Your progress will not be saved.')) {
        this.router.navigate(['/schedule']);
      }
    }
  }
}
