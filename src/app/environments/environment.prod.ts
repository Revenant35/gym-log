import { Environment } from './environment-interface';

export const environment: Environment = {
  auth: {
    domain: 'atlas-powerlifting.us.auth0.com',
    clientId: 'E3hKaRKBfWSGiTTVb0EHszpQ8j5WdxXc',
    authorizationParams: {
      redirect_uri: window.location.origin,
    },
    httpInterceptor: {
      allowedList: [`https://api.atlas-powerlifting.com/*`],
    },
  },
  apiUrl: 'https://api.atlas-powerlifting.com',
};
