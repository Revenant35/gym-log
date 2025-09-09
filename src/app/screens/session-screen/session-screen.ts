import {Component, signal} from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {SessionPerformance} from '../../models/session-performance';

@Component({
  selector: 'app-session-screen',
    imports: [
        IonicModule
    ],
  templateUrl: './session-screen.html',
  styleUrl: './session-screen.scss'
})
export class SessionScreen {
  performance = signal<SessionPerformance>({
    name: 'Monday Afternoon Session',
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
