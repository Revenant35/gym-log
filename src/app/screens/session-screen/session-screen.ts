import {Component, inject, signal} from '@angular/core';
import {IonicModule, ModalController} from "@ionic/angular";
import {SetModal} from '../../components/set-modal/set-modal';
import {UserPreferencesRepo} from '../../repos/user-preferences-repo';
import {SessionSet, Session} from '../../models';
import {isSessionSet} from '../../type-guards';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-session-screen',
  imports: [
    IonicModule,
    DatePipe,
  ],
  templateUrl: './session-screen.html',
  styleUrl: './session-screen.scss'
})
export class SessionScreen {
  private readonly modalController = inject(ModalController);
  private readonly userPreferencesRepo = inject(UserPreferencesRepo);

  session = signal<Session>({
    id: '',
    user_id: '',
    created_at: new Date(),
    exercises: [
      {
        id: '',
        name: 'Barbell Benchpress',
        sets: [],
        created_at: new Date(),
      },
      {
        id: '',
        name: 'Barbell Squat',
        sets: [
          {
            type: 'WARM_UP',
            reps: 12,
            weight: 185,
            weight_unit: 'LB',
            did_fail: false,
            created_at: new Date()
          },
          {
            type: 'NORMAL',
            reps: 8,
            weight: 255,
            weight_unit: 'LB',
            did_fail: false,
            created_at: new Date()
          },
          {
            type: 'NORMAL',
            reps: 8,
            weight: 255,
            weight_unit: 'LB',
            did_fail: false,
            created_at: new Date()
          },
          {
            type: 'NORMAL',
            reps: 7,
            weight: 255,
            weight_unit: 'LB',
            did_fail: true,
            created_at: new Date()
          },
          {
            type: 'DROP_SET',
            reps: 8,
            weight: 225,
            weight_unit: 'LB',
            did_fail: false,
            created_at: new Date()
          },
        ],
        created_at: new Date()
      }
    ]
  });


  async openCreateSetModal(exerciseIndex: number) {
    let createdSet = await this.openSetModal(`New Set`, {
      type: 'NORMAL',
      weight_unit: this.userPreferencesRepo.weightUnit(),
      did_fail: false,
      created_at: new Date()
    });

    if (!createdSet) {
      return;
    }

    this.session.update((session) => {
      session.exercises[exerciseIndex].sets.push(createdSet);

      return {
        ...session
      };
    })
  }

  async openEditSetModal(exerciseIndex: number, set: SessionSet, setIndex: number) {
    let updatedSet = await this.openSetModal(`Update Set ${setIndex + 1}`, set);
    if (!updatedSet) {
      return;
    }

    this.session.update((session) => {
      session.exercises[exerciseIndex].sets[setIndex] = updatedSet;
      return {
        ...session
      };
    })
  }

  async duplicateSet(exerciseIndex: number, setIndex: number) {
    this.session.update((session) => {
      const sets = session.exercises[exerciseIndex].sets
      sets.splice(setIndex, 0, sets[setIndex]);
      return {
        ...session
      };
    })
  }

  async deleteSet(exerciseIndex: number, setIndex: number) {
    this.session.update((session) => {
      session.exercises[exerciseIndex].sets.splice(setIndex, 1);
      return {
        ...session
      };
    })
  }

  // TODO: Return some sort of result type so we can tell if an error occurred
  async openSetModal(name: string, set: Partial<SessionSet>): Promise<SessionSet | undefined> {
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
    const {data, role} = await modal.onWillDismiss<Partial<SessionSet>>();

    if (role !== 'confirm') {
      return undefined;
    }

    if (!isSessionSet(data)) {
      return undefined;
    }

    return data;
  }
}
