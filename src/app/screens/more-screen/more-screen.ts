import { Component, inject } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { isWeightUnit } from '../../models/units';
import { UserPreferences } from '../../services/user-preferences.service';

@Component({
  selector: 'app-more-screen',
  imports: [
    IonicModule
  ],
  templateUrl: './more-screen.html',
  styleUrl: './more-screen.scss'
})
export class MoreScreen {

}
