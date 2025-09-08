import { Injectable, signal } from '@angular/core';
import { DEFAULT_WEIGHT_UNIT, isWeightUnit, WeightUnit } from '../models/units';
import { Preferences } from '@capacitor/preferences';

const KEYS = {
  weightUnit: 'prefs.weightUnit.v1',
} as const;

@Injectable({
  providedIn: 'root'
})
export class UserPreferences {
  private _weightUnit = signal<WeightUnit | undefined>(undefined);
  public weightUnit = this._weightUnit.asReadonly();

  /**
   * Call once during app bootstrap (or the first time the service is constructed)
   * to load persisted values into memory.
   */
  async init(): Promise<void> {
    const { value } = await Preferences.get({ key: KEYS.weightUnit });
    if (isWeightUnit(value)) {
      this._weightUnit.set(value);
    } else {
      await Preferences.set({ key: KEYS.weightUnit, value: DEFAULT_WEIGHT_UNIT });
      this._weightUnit.set(DEFAULT_WEIGHT_UNIT);
    }
  }

  /** Set and persist the weight unit */
  async setWeightUnit(unit: WeightUnit): Promise<void> {
    await Preferences.set({ key: KEYS.weightUnit, value: unit });
    this._weightUnit.set(unit);
  }

  async toggleWeightUnit(): Promise<void> {
    await this.setWeightUnit(this._weightUnit() === 'kg' ? 'lb' : 'kg');
  }
}
