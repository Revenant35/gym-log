import {Component, inject} from '@angular/core';
import { addIcons } from 'ionicons';
import {
  ellipsisHorizontalCircleOutline,
  barbellOutline,
  chevronBackOutline,
  scaleOutline,
  personOutline,
  add,
  search,
  copyOutline,
  createOutline,
  trashOutline,
  logInOutline,
  personAddOutline,
} from 'ionicons/icons';
import { IonicModule } from '@ionic/angular';
import { AuthService } from './services/auth.service';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [IonicModule, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  private readonly auth = inject(AuthService);

  isAuthenticated = this.auth.isAuthenticated;

  constructor() {
    addIcons({
      ellipsisHorizontalCircleOutline,
      barbellOutline,
      chevronBackOutline,
      scaleOutline,
      personOutline,
      add,
      search,
      copyOutline,
      createOutline,
      trashOutline,
      logInOutline,
      personAddOutline,
    });
  }
}
