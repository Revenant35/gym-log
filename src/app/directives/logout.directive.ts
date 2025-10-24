import { Directive, inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Directive({
  selector: 'button [logout]',
  host: {
    '(click)': 'handleInput($event)',
  },
})
export class LogoutDirective {
  readonly auth = inject(AuthService);

  handleInput(event: Event): void {
    event.stopPropagation();
    this.auth.logout();
  }
}
