import {Component, inject, Input} from '@angular/core';
import {IonicModule, ModalController} from '@ionic/angular';
import {SetPerformance} from '../../../models/set-performance';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-set-modal',
  imports: [
    IonicModule,
    FormsModule
  ],
  templateUrl: './set-modal.component.html',
  styleUrl: './set-modal.component.scss'
})
export class SetModalComponent {
  private modalController = inject(ModalController);

  // NOTE: input signals do not work with ModalController.componentProps
  @Input({ required: true }) name!: string;
  @Input({ required: true }) set!: SetPerformance;

  protected async cancel() {
    await this.modalController.dismiss(null, 'cancel');
  }

  protected async confirm() {
    await this.modalController.dismiss(this.set, 'confirm');
  }
}
