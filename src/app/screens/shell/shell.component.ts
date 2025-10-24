import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Dumbbell, User } from 'lucide-angular';
import { TabButtonComponent } from '../../components/tab-button/tab-button.component';

@Component({
  selector: 'app-shell',
  imports: [RouterOutlet, TabButtonComponent],
  templateUrl: './shell.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShellComponent {
  protected readonly DumbbellIcon = Dumbbell;
  protected readonly UserIcon = User;
}
