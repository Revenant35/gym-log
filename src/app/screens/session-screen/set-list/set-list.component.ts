import {Component, model, signal, viewChildren} from '@angular/core';
import {IonicModule, IonModal} from '@ionic/angular';
import {SetPerformance} from '../../../models/set-performance';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-set-list',
  imports: [
    IonicModule,
    FormsModule
  ],
  templateUrl: './set-list.component.html',
  styleUrl: './set-list.component.scss'
})
export class SetListComponent {
  protected modals = viewChildren<IonModal>('modal');

  public sets = model.required<SetPerformance[]>();

  protected editedSet = signal<SetPerformance | undefined>(undefined);

  protected async cancel(setIndex: number) {
    this.editedSet.set(undefined);
    await this.modals()[setIndex].dismiss();
  }

  protected async confirm(setIndex: number) {
    let editedSet = this.editedSet();
    if (editedSet) {
      this.sets.update((sets) => {
        sets[setIndex] = editedSet;
        return sets;
      })
    }
    await this.modals()[setIndex].dismiss();
  }

  protected async initModal(setIndex: number) {
    this.editedSet.set(this.sets()[setIndex]);
  }

  protected getRandomId(): string {
    return Math.random().toString(16).slice(2);
  }
}
