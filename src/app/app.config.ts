import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection
} from '@angular/core';
import {provideRouter} from '@angular/router';
import {IonicRouteStrategy} from '@ionic/angular';
import {provideIonicAngular} from '@ionic/angular/standalone';
import {RouteReuseStrategy} from '@angular/router';
import {routes} from './app.routes';
import {UserPreferencesRepo} from './repos/user-preferences-repo';
import {AuthService} from './services/auth-service';
import {providePreferences, provideSupabase} from './injection-tokens';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideIonicAngular(),
    provideAppInitializer(async () => {
      const userPreferences = inject(UserPreferencesRepo);
      const authService = inject(AuthService);

      await Promise.all([
        userPreferences.initialize(),
        authService.initialize(),
      ])
    }),
    {provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
    providePreferences(),
    provideSupabase(),
  ]
};
