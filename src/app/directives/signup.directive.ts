import { Directive, inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Directive({
  selector: 'button [signup]',
  host: {
    '(click)': 'handleInput($event)',
  },
})
export class SignupDirective {
  readonly auth = inject(AuthService);

  handleInput(event: Event): void {
    event.stopPropagation();
    this.auth.loginWithRedirect({
      authorizationParams: { screen_hint: 'signup' },
    });
  }
}
