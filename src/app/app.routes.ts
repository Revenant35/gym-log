import { Routes } from '@angular/router';

export const routes: Routes = [
  // { path: '', loadComponent: () => import('./home.component').then(m => m.HomeComponent) },
  {
    path: 'auth/login',
    loadComponent: () =>
      import('./screens/auth/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'auth/callback',
    loadComponent: () =>
      import('./screens/auth/callback/callback.component').then((m) => m.CallbackComponent),
  },
  {
    path: '**',
    redirectTo: 'auth/login',
  },
];
