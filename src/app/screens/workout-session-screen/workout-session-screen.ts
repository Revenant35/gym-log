import { Component, computed, signal, OnInit, inject } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ScheduleDay, ScheduleExercise, DayOfWeek, WeightUnit } from '../../models';

interface WorkoutSet {
  reps: number;
  weight: number;
  completed: boolean;
}

interface ExerciseLog {
  exercise: ScheduleExercise;
  sets: WorkoutSet[];
  currentSetIndex: number;
  isExpanded: boolean;
}

@Component({
  selector: 'app-workout-session-screen',
  imports: [IonicModule, FormsModule],
  templateUrl: './workout-session-screen.html',
  styleUrl: './workout-session-screen.scss',
})
export class WorkoutSessionScreen implements OnInit {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  readonly workoutName = signal<string>('');
  readonly dayOfWeek = signal<DayOfWeek | null>(null);
  readonly exerciseLogs = signal<ExerciseLog[]>([]);
  readonly startTime = signal<Date>(new Date());
  readonly isWorkoutComplete = signal<boolean>(false);

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
    const minutes = Math.floor(diff / 60000);
    return minutes;
  });

  // Helper methods for template
  isExerciseComplete(log: ExerciseLog): boolean {
    return log.sets.every(set => set.completed);
  }

  getCompletedSetsCount(log: ExerciseLog): number {
    return log.sets.filter(set => set.completed).length;
  }

  getSetProgressValue(log: ExerciseLog): number {
    return this.getCompletedSetsCount(log) / log.sets.length;
  }

  getProgressColor(log: ExerciseLog): string {
    return this.isExerciseComplete(log) ? 'success' : 'primary';
  }

  ngOnInit(): void {
    // Would normally load from route params or active schedule
    this.loadWorkout();
  }

  private loadWorkout(): void {
    this.workoutName.set(this.mockWorkout.name);

    const logs: ExerciseLog[] = this.mockWorkout.exercises.map((exercise, index) => ({
      exercise,
      sets: Array.from({ length: exercise.sets }, () => ({
        reps: exercise.reps,
        weight: exercise.weight,
        completed: false,
      })),
      currentSetIndex: 0,
      isExpanded: index === 0, // Expand first exercise by default
    }));

    this.exerciseLogs.set(logs);
  }

  toggleExercise(index: number): void {
    this.exerciseLogs.update(logs =>
      logs.map((log, i) =>
        i === index ? { ...log, isExpanded: !log.isExpanded } : log
      )
    );
  }

  updateSet(exerciseIndex: number, setIndex: number, field: 'reps' | 'weight', value: number): void {
    this.exerciseLogs.update(logs =>
      logs.map((log, i) =>
        i === exerciseIndex
          ? {
              ...log,
              sets: log.sets.map((set, j) =>
                j === setIndex ? { ...set, [field]: value } : set
              ),
            }
          : log
      )
    );
  }

  completeSet(exerciseIndex: number, setIndex: number): void {
    this.exerciseLogs.update(logs =>
      logs.map((log, i) =>
        i === exerciseIndex
          ? {
              ...log,
              sets: log.sets.map((set, j) =>
                j === setIndex ? { ...set, completed: true } : set
              ),
              currentSetIndex: Math.min(setIndex + 1, log.sets.length - 1),
            }
          : log
      )
    );

    // Check if all sets of current exercise are now complete
    const currentLog = this.exerciseLogs()[exerciseIndex];
    const allSetsComplete = currentLog.sets.every(set => set.completed);

    if (allSetsComplete) {
      // Collapse the current exercise
      this.exerciseLogs.update(logs =>
        logs.map((log, i) =>
          i === exerciseIndex ? { ...log, isExpanded: false } : log
        )
      );

      // Check if this was the last exercise
      const allExercisesComplete = this.exerciseLogs().every(log =>
        log.sets.every(set => set.completed)
      );

      if (allExercisesComplete) {
        // Auto-complete the workout
        this.completeWorkout();
      } else if (exerciseIndex < this.exerciseLogs().length - 1) {
        // Expand next exercise if there is one
        this.exerciseLogs.update(logs =>
          logs.map((log, i) =>
            i === exerciseIndex + 1 ? { ...log, isExpanded: true } : log
          )
        );
      }
    }
  }

  uncompleteSet(exerciseIndex: number, setIndex: number): void {
    this.exerciseLogs.update(logs =>
      logs.map((log, i) =>
        i === exerciseIndex
          ? {
              ...log,
              sets: log.sets.map((set, j) =>
                j === setIndex ? { ...set, completed: false } : set
              ),
            }
          : log
      )
    );
  }

  addSet(exerciseIndex: number): void {
    this.exerciseLogs.update(logs =>
      logs.map((log, i) =>
        i === exerciseIndex
          ? {
              ...log,
              sets: [
                ...log.sets,
                {
                  reps: log.exercise.reps,
                  weight: log.exercise.weight,
                  completed: false,
                },
              ],
            }
          : log
      )
    );
  }

  removeSet(exerciseIndex: number, setIndex: number): void {
    this.exerciseLogs.update(logs =>
      logs.map((log, i) =>
        i === exerciseIndex && log.sets.length > 1
          ? {
              ...log,
              sets: log.sets.filter((_, j) => j !== setIndex),
            }
          : log
      )
    );
  }

  canCompleteWorkout(): boolean {
    return this.completedSets() > 0;
  }

  async completeWorkout(): Promise<void> {
    // Would normally save workout data here
    const workoutData = {
      workoutName: this.workoutName(),
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

    console.log('Workout completed:', workoutData);

    this.isWorkoutComplete.set(true);

    // Navigate back to schedule after a brief delay
    setTimeout(() => {
      this.router.navigate(['/schedule']);
    }, 2000);
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
