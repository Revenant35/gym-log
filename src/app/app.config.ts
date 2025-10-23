import {
  ApplicationConfig,
  importProvidersFrom,
  inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { IonicRouteStrategy } from '@ionic/angular';
import { provideIonicAngular } from '@ionic/angular/standalone';
import { RouteReuseStrategy } from '@angular/router';
import { routes } from './app.routes';
import { UserPreferencesRepo } from './repos/user-preferences-repo';
import { AuthService } from './services/auth-service';
import { providePreferences, provideSupabase } from './injection-tokens';
import { provideHttpClient } from '@angular/common/http';
import { AuthModule } from '@auth0/auth0-angular';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideIonicAngular(),
    provideAppInitializer(async () => {
      const userPreferences = inject(UserPreferencesRepo);
      const authService = inject(AuthService);

      await Promise.all([userPreferences.initialize(), authService.initialize()]);
    }),
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    providePreferences(),
    provideSupabase(),
    provideHttpClient(),
    importProvidersFrom(
      AuthModule.forRoot({
        domain: 'atlas-powerlifting.us.auth0.com',
        clientId: 'ztZWB81UI5gEJ77yhI601bCTMjGmevdE',
        useRefreshTokens: true,
        useRefreshTokensFallback: false,
        authorizationParams: {
          redirect_uri: window.location.origin,
        },
      }),
    ),
  ],
};
