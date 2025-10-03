import {InjectionToken} from '@angular/core';
import {SupabaseClient} from '@supabase/supabase-js';

export const SUPABASE = new InjectionToken<SupabaseClient>('supabase-client');
