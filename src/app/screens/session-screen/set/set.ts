import {Component, input, model, signal, viewChild} from '@angular/core';
import {IonicModule, IonModal} from "@ionic/angular";
import {SetPerformance} from '../../../models/set-performance';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-set',
  imports: [
    IonicModule,
    FormsModule
  ],
  templateUrl: './set.html',
  styleUrl: './set.scss'
})
export class Set {
  protected modal = viewChild.required<IonModal>('modal');

  public number = input<number>();
  public set = model.required<SetPerformance>();

  protected editedSet = signal<SetPerformance | undefined>(undefined);
  protected id = Math.random().toString(16).slice(2)

  protected async cancel() {
    await this.modal().dismiss();
  }

  protected async confirm() {
    let editedSet = this.editedSet();
    if (editedSet) {
      this.set.set(editedSet);
    }
    await this.modal().dismiss();
  }

  protected async initModal() {
    this.editedSet.set(this.set());
  }
}
