import { Component, signal, inject, resource } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { RouterLink } from '@angular/router';
import { Schedule } from '../../models';
import { ScheduleService, ScheduleWithDetails } from '../../services/schedule.service';

interface ScheduleItem {
  id: string;
  name: string;
  schedule: Schedule;
  isActive: boolean;
  createdAt: Date;
  lastUsed?: Date;
}

@Component({
  selector: 'app-schedule-library-screen',
  imports: [IonicModule, RouterLink],
  templateUrl: './schedule-library-screen.html',
  styleUrl: './schedule-library-screen.scss',
})
export class ScheduleLibraryScreen {
  private readonly scheduleService = inject(ScheduleService);

  readonly schedulesResource = resource({
    loader: async () => {
      await this.scheduleService.loadSchedules();
      const supabaseSchedules = this.scheduleService.schedules();

      // Convert Supabase schedules to ScheduleItem format
      const items: ScheduleItem[] = supabaseSchedules.map(s => ({
        id: s.id,
        name: s.name,
        schedule: this.scheduleService.convertToSchedule(s),
        isActive: s.is_active,
        createdAt: new Date(s.created_at),
        lastUsed: undefined, // Would need to query sessions for this
      }));

      return items;
    }
  });

  getWorkoutDaysCount(schedule: Schedule): number {
    return Object.keys(schedule.days).length;
  }

  getAverageExerciseCount(schedule: Schedule): number {
    const days = Object.values(schedule.days);
    if (days.length === 0) return 0;
    const total = days.reduce((sum, day) => sum + day.exercises.length, 0);
    return Math.round(total / days.length);
  }

  formatDate(date: Date): string {
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }

  async setActive(scheduleId: string): Promise<void> {
    try {
      await this.scheduleService.setActiveSchedule(scheduleId);
      // Reload the schedules to reflect the change
      this.schedulesResource.reload();
    } catch (error) {
      console.error('Error setting active schedule:', error);
      alert('Failed to set active schedule. Please try again.');
    }
  }

  async duplicateSchedule(scheduleId: string): Promise<void> {
    try {
      const schedules = this.schedulesResource.value();
      if (!schedules) return;

      const schedule = schedules.find((s) => s.id === scheduleId);
      if (!schedule) return;

      await this.scheduleService.duplicateSchedule(
        scheduleId,
        `${schedule.name} (Copy)`
      );

      // Reload the schedules to include the new one
      this.schedulesResource.reload();
    } catch (error) {
      console.error('Error duplicating schedule:', error);
      alert('Failed to duplicate schedule. Please try again.');
    }
  }

  async deleteSchedule(scheduleId: string): Promise<void> {
    try {
      await this.scheduleService.deleteSchedule(scheduleId);
      // Reload the schedules to reflect the deletion
      this.schedulesResource.reload();
    } catch (error) {
      console.error('Error deleting schedule:', error);
      alert('Failed to delete schedule. Please try again.');
    }
  }
}
