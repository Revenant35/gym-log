import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { toSignal } from '@angular/core/rxjs-interop';
import { LucideAngularModule, User, Mail, Shield, LogOut, LoaderCircle } from 'lucide-angular';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-profile',
  imports: [LucideAngularModule, DatePipe],
  templateUrl: './profile.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent {
  private readonly authService = inject(AuthService);

  user = toSignal(this.authService.user$);
  isLoading = toSignal(this.authService.isLoading$);

  logout() {
    this.authService.logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  }

  protected readonly UserIcon = User;
  protected readonly MailIcon = Mail;
  protected readonly ShieldIcon = Shield;
  protected readonly LogOutIcon = LogOut;
  protected readonly LoaderCircleIcon = LoaderCircle;
}
