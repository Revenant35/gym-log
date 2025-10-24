import { Component } from '@angular/core';
import { LucideAngularModule, LogIn, UserPlus } from 'lucide-angular';
import { LoginDirective } from '../../../directives/login.directive';
import { SignupDirective } from '../../../directives/signup.directive';

@Component({
  selector: 'app-login',
  imports: [LucideAngularModule, LoginDirective, SignupDirective],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  protected readonly LogInIcon = LogIn;
  protected readonly UserPlusIcon = UserPlus;
}
