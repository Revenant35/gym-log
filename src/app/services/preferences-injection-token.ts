import { InjectionToken, ValueProvider } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

export const PREFERENCES = new InjectionToken<typeof Preferences>('preferences.injectionToken');

export function providePreferences(): ValueProvider {
  return {
    provide: PREFERENCES,
    useValue: Preferences,
  };
}
