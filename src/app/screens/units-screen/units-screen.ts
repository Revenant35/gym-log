import {Component, inject} from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {UserPreferences} from '../../services/user-preferences.service';
import {isClockUnit, isHeightUnit, isWeightUnit} from '../../models/units';

@Component({
  selector: 'app-units-screen',
    imports: [
        IonicModule
    ],
  templateUrl: './units-screen.html',
  styleUrl: './units-screen.scss'
})
export class UnitsScreen {
  private prefs = inject(UserPreferences);

  protected weightUnit = this.prefs.weightUnit
  protected heightUnit = this.prefs.heightUnit
  protected clockUnit = this.prefs.clockUnit

  async onWeightUnitSelected(event: Event): Promise<void> {
    const target = event.target as HTMLInputElement;
    if (isWeightUnit(target.value)) {
      await this.prefs.setWeightUnit(target.value);
    } else {
      console.error(`Unknown weight unit: ${target.value}`);
    }
  }

  async onHeightUnitSelected(event: Event): Promise<void> {
    const target = event.target as HTMLInputElement;
    if (isHeightUnit(target.value)) {
      await this.prefs.setHeightUnit(target.value);
    } else {
      console.error(`Unknown height unit: ${target.value}`);
    }
  }

  async onClockUnitSelected(event: Event): Promise<void> {
    const target = event.target as HTMLInputElement;
    if (isClockUnit(target.value)) {
      await this.prefs.setClockUnit(target.value);
    } else {
      console.error(`Unknown clock unit: ${target.value}`);
    }
  }
}
