import {Component, inject} from '@angular/core';
import {addIcons} from 'ionicons';
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
  calendarOutline,
  chevronForwardOutline,
  moonOutline,
  eyeOutline,
  checkmarkCircleOutline,
  chevronUpOutline,
  chevronDownOutline,
  arrowForwardOutline,
  ellipseOutline,
  checkmarkCircle,
  arrowUpOutline,
  arrowDownOutline,
} from 'ionicons/icons';
import {IonicModule} from '@ionic/angular';
import {RouterOutlet} from '@angular/router';
import {AuthService} from './services/auth-service';

@Component({
  selector: 'app-root',
  imports: [IonicModule, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  private readonly authService = inject(AuthService);

  isAuthenticated = this.authService.isAuthenticated;

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
      calendarOutline,
      chevronForwardOutline,
      moonOutline,
      eyeOutline,
      checkmarkCircleOutline,
      chevronUpOutline,
      chevronDownOutline,
      arrowForwardOutline,
      ellipseOutline,
      checkmarkCircle,
      arrowUpOutline,
      arrowDownOutline,
    });
  }
}
