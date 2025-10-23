import { Component, inject } from '@angular/core';
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
  closeOutline,
  checkmarkOutline,
  addOutline,
  alertCircleOutline,
  refreshOutline,
} from 'ionicons/icons';
import { IonicModule } from '@ionic/angular';
import { AuthService } from '@auth0/auth0-angular';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-root',
  imports: [IonicModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private readonly authService = inject(AuthService);

  isAuthenticated = toSignal(this.authService.isAuthenticated$);

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
      closeOutline,
      checkmarkOutline,
      addOutline,
      alertCircleOutline,
      refreshOutline,
    });
  }

  login() {
    this.authService.loginWithRedirect();
  }
}
