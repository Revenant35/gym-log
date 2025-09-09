import { ApplicationConfig, inject, provideAppInitializer, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { IonicRouteStrategy } from '@ionic/angular';
import { provideIonicAngular } from '@ionic/angular/standalone';
import { RouteReuseStrategy } from '@angular/router';
import { routes } from './app.routes';
import { UserPreferences } from './services/user-preferences.service';
import { providePreferences } from './services/preferences-injection-token';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideIonicAngular(),
    provideAppInitializer(async () => {
      const userPreferences = inject(UserPreferences);
      await userPreferences.init();
    }),
    {provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
    providePreferences(),
  ]
};
