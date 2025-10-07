import {InjectionToken} from '@angular/core';
import {SupabaseClient} from '@supabase/supabase-js';
import {Database} from './util/database';

export const SUPABASE = new InjectionToken<SupabaseClient<Database>>('supabase-client');
