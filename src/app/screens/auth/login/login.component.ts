import { Component, inject, signal } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { LucideAngularModule, LogIn, UserPlus } from 'lucide-angular';

@Component({
  selector: 'app-login',
  imports: [LucideAngularModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  private readonly auth = inject(AuthService);
  private readonly _busy = signal(false);
  public readonly busy = this._busy.asReadonly();

  login() {
    this.do(async () => {
      await this.auth.loginWithRedirect().toPromise();
    });
  }

  signup() {
    this.do(async () => {
      await this.auth
        .loginWithRedirect({
          authorizationParams: { screen_hint: 'signup' },
        })
        .toPromise();
    });
  }

  loginWithPopup() {
    this.do(async () => {
      await this.auth.loginWithPopup().toPromise();
    });
  }

  // Direct a specific connection (must be enabled in Auth0 Dashboard)
  loginWithConnection(connection: string) {
    this.do(async () => {
      await this.auth
        .loginWithRedirect({
          authorizationParams: { connection },
        })
        .toPromise();
    });
  }

  private async do(run: () => Promise<void>) {
    if (this.busy()) return;
    this._busy.set(true);
    try {
      await run();
    } finally {
      this._busy.set(false);
    }
  }

  protected readonly LogInIcon = LogIn;
  protected readonly UserPlusIcon = UserPlus;
}
