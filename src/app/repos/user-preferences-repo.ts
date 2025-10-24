import { Injectable, signal } from '@angular/core';
import { DEFAULT_WEIGHT_UNIT, WeightUnit } from '../models';
import { isWeightUnit } from '../type-guards';

const KEYS = {
  weightUnit: 'prefs.weightUnit.v1',
} as const;

@Injectable({
  providedIn: 'root',
})
export class UserPreferencesRepo {
  private _weightUnit = signal<WeightUnit>(DEFAULT_WEIGHT_UNIT);
  public weightUnit = this._weightUnit.asReadonly();

  constructor() {
    this.initWeightUnit();
  }

  /** Set and persist the weight unit */
  setWeightUnit(unit: WeightUnit) {
    localStorage.setItem(KEYS.weightUnit, unit);
  }

  private initWeightUnit() {
    const value = localStorage.getItem(KEYS.weightUnit);
    if (isWeightUnit(value)) {
      this._weightUnit.set(value);
    }
  }
}
