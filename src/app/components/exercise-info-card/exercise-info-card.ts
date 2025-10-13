import {Component, computed, input} from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {ScheduleExercise} from '../../models';

@Component({
  selector: 'app-exercise-info-card',
    imports: [
        IonicModule
    ],
  templateUrl: './exercise-info-card.html',
  styleUrl: './exercise-info-card.scss'
})
export class ExerciseInfoCard {
  readonly exercise = input.required<ScheduleExercise>()

  readonly exerciseDetails = computed(() => {
    const weightStr = this.exercise().weight > 0 ? ` @ ${this.exercise().weight} ${this.exercise().weight_unit}` : '';
    return `${this.exercise().sets} × ${this.exercise().reps}${weightStr}`;
  })
}
