import { AuthConfig } from '@auth0/auth0-angular';

export interface Environment {
  auth: AuthConfig;
  apiUrl: string;
}
