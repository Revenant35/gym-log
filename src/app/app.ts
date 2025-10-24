import { Component, inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
})
export class App {
  private readonly authService = inject(AuthService);

  isAuthenticated = toSignal(this.authService.isAuthenticated$);

  login() {
    this.authService.loginWithRedirect();
  }
}
