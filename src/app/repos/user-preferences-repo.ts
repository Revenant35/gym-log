import { inject, Injectable, signal } from '@angular/core';
import {
  ClockUnit,
  DEFAULT_CLOCK_UNIT,
  DEFAULT_HEIGHT_UNIT,
  DEFAULT_WEIGHT_UNIT,
  HeightUnit,
  isClockUnit,
  isHeightUnit,
  isWeightUnit,
  WeightUnit
} from '../models/units';
import {PREFERENCES} from '../injection-tokens';
import {AppInitializer} from '../app-initializer';

const KEYS = {
  weightUnit: 'prefs.weightUnit.v1',
  heightUnit: 'prefs.heightUnit.v1',
  clockUnit: 'prefs.clockUnit.v1',
} as const;

@Injectable({
  providedIn: 'root'
})
export class UserPreferencesRepo implements AppInitializer {
  private readonly _preferences = inject(PREFERENCES);

  private _weightUnit = signal<WeightUnit>(DEFAULT_WEIGHT_UNIT);
  public weightUnit = this._weightUnit.asReadonly();

  private _heightUnit = signal<HeightUnit>(DEFAULT_HEIGHT_UNIT);
  public heightUnit = this._heightUnit.asReadonly();

  private _clockUnit = signal<ClockUnit>(DEFAULT_CLOCK_UNIT);
  public clockUnit = this._clockUnit.asReadonly();

  /**
   * Call once during app bootstrap (or the first time the service is constructed)
   * to load persisted values into memory.
   */
  async initialize(): Promise<void> {
    await this.initWeightUnit()
    await this.initHeightUnit()
    await this.initClockUnit()
  }

  /** Set and persist the weight unit */
  async setWeightUnit(unit: WeightUnit): Promise<void> {
    await this._preferences.set({ key: KEYS.weightUnit, value: unit });
    this._weightUnit.set(unit);
  }

  /** Set and persist the height unit */
  async setHeightUnit(unit: HeightUnit): Promise<void> {
    await this._preferences.set({ key: KEYS.heightUnit, value: unit });
    this._heightUnit.set(unit);
  }

  /** Set and persist the clock unit */
  async setClockUnit(unit: ClockUnit): Promise<void> {
    await this._preferences.set({ key: KEYS.clockUnit, value: unit });
    this._clockUnit.set(unit);
  }

  private async initWeightUnit(): Promise<void> {
    const { value } = await this._preferences.get({ key: KEYS.weightUnit });
    if (isWeightUnit(value)) {
      this._weightUnit.set(value);
    }
  }

  private async initHeightUnit(): Promise<void> {
    const { value } = await this._preferences.get({ key: KEYS.heightUnit });
    if (isHeightUnit(value)) {
      this._heightUnit.set(value);
    }
  }

  private async initClockUnit(): Promise<void> {
    const { value } = await this._preferences.get({ key: KEYS.clockUnit });
    if (isClockUnit(value)) {
      this._clockUnit.set(value);
    }
  }
}
