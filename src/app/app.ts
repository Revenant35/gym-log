import { Component, signal } from '@angular/core';
import { addIcons } from 'ionicons';
import {
  ellipsisHorizontalCircleOutline,
  barbellOutline,
  chevronBackOutline,
  scaleOutline,
  personOutline,
} from 'ionicons/icons';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-root',
  imports: [IonicModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('gym-progression-app');

  constructor() {
    addIcons({
      ellipsisHorizontalCircleOutline,
      barbellOutline,
      chevronBackOutline,
      scaleOutline,
      personOutline,
    });
  }
}
