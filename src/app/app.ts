import { Component } from '@angular/core';
import { addIcons } from 'ionicons';
import {
  ellipsisHorizontalCircleOutline,
  barbellOutline,
  chevronBackOutline,
  scaleOutline,
  personOutline,
  add,
  copyOutline,
  createOutline,
  trashOutline,
} from 'ionicons/icons';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-root',
  imports: [IonicModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  constructor() {
    addIcons({
      ellipsisHorizontalCircleOutline,
      barbellOutline,
      chevronBackOutline,
      scaleOutline,
      personOutline,
      add,
      copyOutline,
      createOutline,
      trashOutline,
    });
  }
}
