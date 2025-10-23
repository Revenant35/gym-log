import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
  ValueProvider,
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
import config from '../../capacitor.config';

const redirect_uri = `${config.appId}://{yourDomain}/capacitor/${config.appId}/callback`;

export function provideAuth0(): ValueProvider {
  return {
    provide: AuthModule,
    useValue: AuthModule.forRoot({
      domain: '{yourDomain}',
      clientId: '{yourClientId}',
      useRefreshTokens: true,
      useRefreshTokensFallback: false,
      authorizationParams: {
        redirect_uri,
      },
    }),
  };
}

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
    provideAuth0(),
  ],
};
