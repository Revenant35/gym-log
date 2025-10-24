import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LucideAngularModule, LucideIconData } from 'lucide-angular';

@Component({
  selector: 'app-tab-button',
  imports: [RouterLink, RouterLinkActive, LucideAngularModule],
  templateUrl: './tab-button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabButtonComponent {
  route = input.required<string>();
  label = input.required<string>();
  icon = input.required<LucideIconData>();
  ariaLabel = input<string>();
}
