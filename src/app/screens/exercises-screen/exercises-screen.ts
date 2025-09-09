import {Component, signal} from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {Exercise} from '../../models/exercise';

@Component({
  selector: 'app-exercises-screen',
    imports: [
        IonicModule
    ],
  templateUrl: './exercises-screen.html',
  styleUrl: './exercises-screen.scss'
})
export class ExercisesScreen {
  exercises = signal<Exercise[]>([
    {
      name: 'Barbell Benchpress',
      category: 'compound'
    },
    {
      name: 'Barbell Squat',
      category: 'compound'
    },
    {
      name: 'Barbell Deadlift',
      category: 'compound'
    },
  ]);
}
