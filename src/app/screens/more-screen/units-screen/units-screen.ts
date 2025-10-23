import { Component, inject } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { UserPreferencesRepo } from '../../../repos/user-preferences-repo';
import { RouterLink } from '@angular/router';
import { isClockUnit, isHeightUnit, isWeightUnit } from '../../../type-guards';

@Component({
  selector: 'app-units-screen',
  imports: [IonicModule, RouterLink],
  templateUrl: './units-screen.html',
  styleUrl: './units-screen.scss',
})
export class UnitsScreen {
  private userPreferencesRepo = inject(UserPreferencesRepo);

  protected weightUnit = this.userPreferencesRepo.weightUnit;
  protected heightUnit = this.userPreferencesRepo.heightUnit;
  protected clockUnit = this.userPreferencesRepo.clockUnit;

  async onWeightUnitSelected(event: Event): Promise<void> {
    const target = event.target as HTMLInputElement;
    if (isWeightUnit(target.value)) {
      await this.userPreferencesRepo.setWeightUnit(target.value);
    } else {
      console.error(`Unknown weight unit: ${target.value}`);
    }
  }

  async onHeightUnitSelected(event: Event): Promise<void> {
    const target = event.target as HTMLInputElement;
    if (isHeightUnit(target.value)) {
      await this.userPreferencesRepo.setHeightUnit(target.value);
    } else {
      console.error(`Unknown height unit: ${target.value}`);
    }
  }

  async onClockUnitSelected(event: Event): Promise<void> {
    const target = event.target as HTMLInputElement;
    if (isClockUnit(target.value)) {
      await this.userPreferencesRepo.setClockUnit(target.value);
    } else {
      console.error(`Unknown clock unit: ${target.value}`);
    }
  }
}
