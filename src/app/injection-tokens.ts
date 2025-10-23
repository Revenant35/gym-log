import { InjectionToken, ValueProvider } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Database } from './util/database';
import { Preferences, PreferencesPlugin } from '@capacitor/preferences';
import { SUPABASE_KEY, SUPABASE_URL } from './util/supabase-config';

export const SUPABASE = new InjectionToken<SupabaseClient<Database>>('supabase-client');
export const PREFERENCES = new InjectionToken<PreferencesPlugin>('preferences.injectionToken');

export function providePreferences(): ValueProvider {
  return {
    provide: PREFERENCES,
    useValue: Preferences,
  };
}

export function provideSupabase(): ValueProvider {
  return {
    provide: SUPABASE,
    useValue: createClient<Database>(SUPABASE_URL, SUPABASE_KEY),
  };
}
