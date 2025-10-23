import { computed, inject, Injectable, signal } from '@angular/core';
import { SUPABASE } from '../injection-tokens';
import { defer, map, Observable } from 'rxjs';
import { User } from '@supabase/supabase-js';
import { AppInitializer } from '../app-initializer';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements AppInitializer {
  private readonly supabase = inject(SUPABASE);

  private readonly _user = signal<User | undefined>(undefined);
  public readonly user = this._user.asReadonly();
  public readonly isAuthenticated = computed(() => {
    return this._user() !== undefined;
  });

  async initialize(): Promise<void> {
    this.supabase.auth.onAuthStateChange((_event, session) => {
      this._user.set(session?.user ?? undefined);
    });

    const { data, error } = await this.supabase.auth.getUser();
    if (error) {
      return;
    }

    this._user.set(data.user);
  }

  public signInWithEmail(email: string, password: string): Observable<void> {
    return defer(() => this.supabase.auth.signInWithPassword({ email, password })).pipe(
      map(({ error }) => {
        if (error) {
          throw error;
        }
      }),
    );
  }

  public signOut(): Observable<void> {
    return defer(() => this.supabase.auth.signOut()).pipe(
      map(({ error }) => {
        if (error) {
          throw error;
        }
      }),
    );
  }
}
