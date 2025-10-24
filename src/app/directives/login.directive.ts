import { Directive, inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Directive({
  selector: 'button [login]',
  host: {
    '(click)': 'handleInput($event)',
  },
})
export class LoginDirective {
  readonly auth = inject(AuthService);

  handleInput(event: Event): void {
    event.stopPropagation();
    this.auth.loginWithRedirect();
  }
}
