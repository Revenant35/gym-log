import {Component, model} from '@angular/core';
import {IonicModule} from '@ionic/angular';
import {ExercisePerformance} from '../../../models/exercise-performance';
import {SetPerformance} from '../../../models/set-performance';
import {SetListComponent} from '../set-list/set-list.component';

@Component({
  selector: 'app-exercise-list',
  imports: [
    IonicModule,
    SetListComponent
  ],
  templateUrl: './exercise-list.component.html',
  styleUrl: './exercise-list.component.scss'
})
export class ExerciseListComponent {
  public exercises = model.required<ExercisePerformance[]>();

  onExerciseChange(exerciseIndex: number, updatedExercise: ExercisePerformance) {
    this.exercises.update((exercises) => {
      exercises[exerciseIndex] = updatedExercise;
      return exercises;
    })
  }
}
