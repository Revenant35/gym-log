import {
  ApplicationConfig,
  importProvidersFrom,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { AuthModule } from '@auth0/auth0-angular';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
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
