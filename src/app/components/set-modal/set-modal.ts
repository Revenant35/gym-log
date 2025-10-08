import {Component, inject, Input} from '@angular/core';
import {IonicModule, ModalController} from '@ionic/angular';
import {FormsModule} from '@angular/forms';
import {SessionSet} from '../../models/session-set';

@Component({
  selector: 'app-set-modal',
  imports: [
    IonicModule,
    FormsModule
  ],
  templateUrl: './set-modal.html',
  styleUrl: './set-modal.scss'
})
export class SetModal {
  private modalController = inject(ModalController);

  // NOTE: input signals do not work with ModalController.componentProps
  @Input({ required: true }) name!: string;
  @Input({ required: true }) set!: SessionSet;

  protected async cancel() {
    await this.modalController.dismiss(null, 'cancel');
  }

  protected async confirm() {
    await this.modalController.dismiss(this.set, 'confirm');
  }
}
