import { createClient } from "@supabase/supabase-js";
import {ValueProvider} from '@angular/core';
import {SUPABASE} from '../injection-tokens';
import {Database} from './database';

const supabaseUrl = "https://cywyqltuycrjdyahdkni.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN5d3lxbHR1eWNyamR5YWhka25pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk1MTg1NTEsImV4cCI6MjA3NTA5NDU1MX0.ceDpnH6m2Ppn5gJHA8_h2abUal2whXhYYATOPS7R8co";

export function provideSupabase(): ValueProvider {
  return {
    provide: SUPABASE,
    useValue: createClient<Database>(supabaseUrl, supabaseKey),
  };
}
