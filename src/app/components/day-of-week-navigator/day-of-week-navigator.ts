import { Component, inject, model } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TitleCasePipe } from '@angular/common';
import { DayOfWeek } from '../../models';
import { DateProvider } from '../../services/date-provider';

@Component({
  selector: 'app-day-of-week-navigator',
  imports: [IonicModule, TitleCasePipe],
  templateUrl: './day-of-week-navigator.html',
  styleUrl: './day-of-week-navigator.scss',
})
export class DayOfWeekNavigator {
  private readonly dateProvider = inject(DateProvider);

  readonly selectedDay = model<DayOfWeek>(this.dateProvider.dayOfWeek());

  previousDay(): void {
    switch (this.selectedDay()) {
      case 'monday':
        this.selectedDay.set('sunday');
        break;
      case 'tuesday':
        this.selectedDay.set('monday');
        break;
      case 'wednesday':
        this.selectedDay.set('tuesday');
        break;
      case 'thursday':
        this.selectedDay.set('wednesday');
        break;
      case 'friday':
        this.selectedDay.set('thursday');
        break;
      case 'saturday':
        this.selectedDay.set('friday');
        break;
      case 'sunday':
        this.selectedDay.set('saturday');
        break;
    }
  }

  nextDay(): void {
    switch (this.selectedDay()) {
      case 'monday':
        this.selectedDay.set('tuesday');
        break;
      case 'tuesday':
        this.selectedDay.set('wednesday');
        break;
      case 'wednesday':
        this.selectedDay.set('thursday');
        break;
      case 'thursday':
        this.selectedDay.set('friday');
        break;
      case 'friday':
        this.selectedDay.set('saturday');
        break;
      case 'saturday':
        this.selectedDay.set('sunday');
        break;
      case 'sunday':
        this.selectedDay.set('monday');
        break;
    }
  }
}
