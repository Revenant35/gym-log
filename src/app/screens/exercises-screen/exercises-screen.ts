import {Component, signal} from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {SessionPerformance} from '../../models/session-performance';

@Component({
  selector: 'app-exercises-screen',
    imports: [
        IonicModule
    ],
  templateUrl: './exercises-screen.html',
  styleUrl: './exercises-screen.scss'
})
export class ExercisesScreen {
  performance = signal<SessionPerformance>({
    date: new Date(),
    exercises: [
      {
        name: 'Barbell Benchpress',
        sets: [],
      },
      {
        name: 'Barbell Squat',
        sets: [],
      },
      {
        name: 'Barbell Deadlift',
        sets: [],
      },
    ]
  });
}
