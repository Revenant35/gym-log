import {Component, inject, signal} from '@angular/core';
import {IonicModule, ModalController} from "@ionic/angular";
import {SessionPerformance} from '../../models/session-performance';
import {SetPerformance} from '../../models/set-performance';
import {SetModalComponent} from './set-modal/set-modal.component';
import {UserPreferencesRepo} from '../../repos/user-preferences-repo';

@Component({
  selector: 'app-session-screen',
  imports: [
    IonicModule,
  ],
  templateUrl: './session-screen.html',
  styleUrl: './session-screen.scss'
})
export class SessionScreen {
  private readonly modalController = inject(ModalController);
  private readonly userPreferencesRepo = inject(UserPreferencesRepo);

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


  async openCreateSetModal(exerciseIndex: number) {
    let createdSet = await this.openSetModal(`New Set`, {
      kind: 'normal',
      unit: this.userPreferencesRepo.weightUnit(),
    });
    if (!createdSet) {
      return;
    }

    this.performance.update((performance) => {
      performance.exercises[exerciseIndex].sets.push(createdSet);
      return {
        ...performance
      };
    })
  }

  async openEditSetModal(exerciseIndex: number, set: SetPerformance, setIndex: number) {
    let updatedSet = await this.openSetModal(`Update Set ${ setIndex + 1 }`, set);
    if (!updatedSet) {
      return;
    }

    this.performance.update((performance) => {
      performance.exercises[exerciseIndex].sets[setIndex] = updatedSet;
      return {
        ...performance
      };
    })
  }

  async duplicateSet(exerciseIndex: number, setIndex: number) {
    this.performance.update((performance) => {
      const sets = performance.exercises[exerciseIndex].sets
      sets.splice(setIndex, 0, sets[setIndex]);
      return performance;
    })
  }

  async deleteSet(exerciseIndex: number, setIndex: number) {
    this.performance.update((performance) => {
      performance.exercises[exerciseIndex].sets.splice(setIndex, 1);
      return performance;
    })
  }

  async openSetModal(name: string, set?: SetPerformance): Promise<SetPerformance | undefined> {
    const modal = await this.modalController.create({
      component: SetModalComponent,
      componentProps: {
        name: name,
        set: {
          ...set
        },
      }
    });

    await modal.present();
    const { data, role } = await modal.onWillDismiss<SetPerformance>();

    if (role === 'confirm' && data) {
      return data;
    } else {
      return undefined;
    }
  }
}
