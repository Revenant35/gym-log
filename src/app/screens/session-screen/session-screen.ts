import {Component, inject, signal} from '@angular/core';
import {IonicModule, ModalController} from "@ionic/angular";
import {SessionPerformance} from '../../models/session-performance';
import {SetPerformance} from '../../models/set-performance';
import {SetModal} from '../../components/set-modal/set-modal';
import {UserPreferencesRepo} from '../../repos/user-preferences-repo';
import {SessionSet} from '../../models/session-set';
import {Session} from '../../models/session';

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

  performance = signal<Session>({
    name: 'Monday Afternoon Session',
    exercises: [
      {
        exercise: {
          id: '',
          name: 'Barbell Benchpress',
        },
        sets: [],
        created_at: new Date().toDateString(),
      },
      {
        exercise: {
          id: '',
          name: 'Barbell Squat',
        },
        sets: [
          {
            type: 'WARM_UP',
            reps: 12,
            weight: 185,
            weight_unit: 'LB',
            did_fail: false,
            created_at: new Date().toDateString()
          },
          {
            type: 'NORMAL',
            reps: 8,
            weight: 255,
            weight_unit: 'LB',
            did_fail: false,
            created_at: new Date().toDateString()
          },
          {
            type: 'NORMAL',
            reps: 8,
            weight: 255,
            weight_unit: 'LB',
            did_fail: false,
            created_at: new Date().toDateString()
          },
          {
            type: 'NORMAL',
            reps: 7,
            weight: 255,
            weight_unit: 'LB',
            did_fail: true,
            created_at: new Date().toDateString()
          },
          {
            type: 'DROP_SET',
            reps: 8,
            weight: 225,
            weight_unit: 'LB',
            did_fail: false,
            created_at: new Date().toDateString()
          },
        ],
        created_at: new Date().toDateString(),
      },
    ],
    user_id: '',
    created_at: new Date().toDateString(),
  });


  async openCreateSetModal(exerciseIndex: number) {
    let createdSet = await this.openSetModal(`New Set`, {
      type: 'NORMAL',
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

  async openSetModal(name: string, set?: SessionSet): Promise<SetPerformance | undefined> {
    const modal = await this.modalController.create({
      component: SetModal,
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
