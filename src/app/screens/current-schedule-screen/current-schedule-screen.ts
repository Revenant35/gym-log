import { Component, signal, inject, resource } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { RouterLink } from '@angular/router';
import { DayOfWeek } from '../../models';
import { ScheduleService } from '../../services/schedule.service';
import { ScheduleDayOfWeekPicker } from '../../components/day-of-week-picker/schedule-day-of-week-picker.component';
import { DateProvider } from '../../services/date-provider';
import { DayOfWeekNavigator } from '../../components/day-of-week-navigator/day-of-week-navigator';
import { ExerciseInfoCard } from '../../components/exercise-info-card/exercise-info-card';

@Component({
  selector: 'app-current-schedule-screen',
  imports: [IonicModule, RouterLink, ScheduleDayOfWeekPicker, DayOfWeekNavigator, ExerciseInfoCard],
  templateUrl: './current-schedule-screen.html',
  styleUrl: './current-schedule-screen.scss',
})
export class CurrentScheduleScreen {
  private readonly scheduleService = inject(ScheduleService);
  private readonly dateProvider = inject(DateProvider);

  readonly selectedDay = signal<DayOfWeek>(this.dateProvider.dayOfWeek());

  readonly schedule = resource({
    loader: async () => {
      const activeSchedule = await this.scheduleService.getActiveSchedule();

      if (!activeSchedule) {
        throw new Error('No active schedule found');
      }

      return this.scheduleService.convertToSchedule(activeSchedule);
    },
  });
}
