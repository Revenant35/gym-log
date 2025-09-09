import {Component, signal} from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {SessionPerformance} from '../../models/session-performance';
import {Set} from './set/set';

@Component({
  selector: 'app-session-screen',
  imports: [
    IonicModule,
    Set
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
        sets: [
          { kind: 'warm-up', unit: 'kg' },
          { kind: 'normal', reps: 5, weight: 120, unit: 'kg' },
          { kind: 'normal', reps: 5, weight: 120, unit: 'kg' },
          { kind: 'failure', reps: 4, weight: 120, unit: 'kg' },
          { kind: 'drop-set', reps: 8, weight: 100, unit: 'kg' },
        ],
      },
      {
        name: 'Barbell Deadlift',
        sets: [
          { kind: 'warm-up', unit: 'kg' },
        ],
      },
    ]
  });
}
