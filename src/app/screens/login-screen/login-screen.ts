import {Component, inject, signal} from '@angular/core';
import {IonicModule} from '@ionic/angular';
import {FormsModule} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {firstValueFrom} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login-screen',
  imports: [
    IonicModule,
    FormsModule,
  ],
  templateUrl: './login-screen.html',
  styleUrl: './login-screen.scss'
})
export class LoginScreen {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  email = signal('');
  password = signal('');
  invalidCredentials = signal(false);

  async handleLogIn() {
    try {
      await firstValueFrom(this.auth.signInWithEmail(this.email(), this.password()))
      await this.router.navigate(['/exercises']);
    } catch (error) {
        this.invalidCredentials.set(true);
        return;
    }
  }
}
