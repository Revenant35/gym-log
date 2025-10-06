import {Component, inject} from '@angular/core';
import {IonicModule} from '@ionic/angular';
import {RouterLink} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {lastValueFrom} from 'rxjs';

@Component({
  selector: 'app-more-screen',
  imports: [
    IonicModule,
    RouterLink,
  ],
  templateUrl: './more-screen.html',
  styleUrl: './more-screen.scss'
})
export class MoreScreen {
  private readonly authService = inject(AuthService);

  handleSignOut() {
    lastValueFrom(this.authService.signOut());
  }
}
