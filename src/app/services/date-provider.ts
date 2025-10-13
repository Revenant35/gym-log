import {computed, Injectable, signal} from '@angular/core';
import {DayOfWeek} from '../models';


@Injectable({
  providedIn: 'root'
})
export class DateProvider {
  private readonly DAYS: DayOfWeek[] = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

  readonly now = signal(new Date());

  readonly dayOfWeek = computed(() => {
    return this.DAYS[this.now().getDay()];
  });
}
