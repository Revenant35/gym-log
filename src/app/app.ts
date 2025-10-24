import { Component, inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private readonly authService = inject(AuthService);

  isAuthenticated = toSignal(this.authService.isAuthenticated$);

  login() {
    this.authService.loginWithRedirect();
  }
}
