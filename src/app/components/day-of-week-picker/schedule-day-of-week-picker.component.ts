import { Component, computed, inject, input, model } from '@angular/core';
import { DayOfWeek, Schedule } from '../../models';
import { DateProvider } from '../../services/date-provider';

@Component({
  selector: 'app-schedule-day-of-week-picker',
  imports: [],
  templateUrl: './schedule-day-of-week-picker.component.html',
  styleUrl: './schedule-day-of-week-picker.component.scss',
})
export class ScheduleDayOfWeekPicker {
  private readonly DAYS: DayOfWeek[] = [
    'sunday',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
  ];

  private readonly dateProvider = inject(DateProvider);

  public readonly schedule = input.required<Schedule>();
  public readonly selectedDay = model<DayOfWeek>(this.dateProvider.dayOfWeek());

  readonly dayIndicators = computed(() => {
    return this.DAYS.map((day) => ({
      day,
      label: day.substring(0, 1).toUpperCase(),
      hasWorkout: !!this.schedule().days[day],
      isToday: day === this.dateProvider.dayOfWeek(),
      isSelected: day === this.selectedDay(),
    }));
  });
}
