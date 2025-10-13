import {Component, input} from '@angular/core';
import {IonProgressBar} from '@ionic/angular/standalone';

@Component({
  selector: 'app-workout-session-progress-bar',
  imports: [
    IonProgressBar
  ],
  templateUrl: './workout-session-progress-bar.html',
  styleUrl: './workout-session-progress-bar.scss'
})
export class WorkoutSessionProgressBar {
  readonly totalExercises = input.required<number>();
  readonly completedExercises = input.required<number>();
  readonly totalSets = input.required<number>();
  readonly completedSets = input.required<number>();
  readonly duration = input.required<number>();
}
