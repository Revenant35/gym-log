import { inject, Injectable, signal } from '@angular/core';
import { DEFAULT_WEIGHT_UNIT, isWeightUnit, WeightUnit } from '../models/units';
import { PREFERENCES } from './preferences-injection-token';

const KEYS = {
  weightUnit: 'prefs.weightUnit.v1',
} as const;

@Injectable({
  providedIn: 'root'
})
export class UserPreferences {
  private readonly _preferences = inject(PREFERENCES);

  private _weightUnit = signal<WeightUnit | undefined>(undefined);
  public weightUnit = this._weightUnit.asReadonly();

  /**
   * Call once during app bootstrap (or the first time the service is constructed)
   * to load persisted values into memory.
   */
  async init(): Promise<void> {
    await this.initWeightUnit()
  }

  /** Set and persist the weight unit */
  async setWeightUnit(unit: WeightUnit): Promise<void> {
    await this._preferences.set({ key: KEYS.weightUnit, value: unit });
    this._weightUnit.set(unit);
  }

  async toggleWeightUnit(): Promise<void> {
    await this.setWeightUnit(this._weightUnit() === 'kg' ? 'lb' : 'kg');
  }

  private async initWeightUnit(): Promise<void> {
    const { value } = await this._preferences.get({ key: KEYS.weightUnit });
    if (isWeightUnit(value)) {
      this._weightUnit.set(value);
    } else {
      await this._preferences.set({ key: KEYS.weightUnit, value: DEFAULT_WEIGHT_UNIT });
      this._weightUnit.set(DEFAULT_WEIGHT_UNIT);
    }
  }
}
