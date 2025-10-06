import {Component, inject} from '@angular/core';
import {IonicModule} from '@ionic/angular';
import {Router, RouterLink} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {firstValueFrom} from 'rxjs';

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
  private readonly router = inject(Router);

  async handleSignOut() {
    try {
      await firstValueFrom(this.authService.signOut());
      await this.router.navigate(['/login'], {replaceUrl: true});
    } catch (error) {
      console.error('Error during sign out:', error);
    }
  }
}
