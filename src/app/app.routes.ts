import { Routes } from '@angular/router';
import { AuthGuard } from '@auth0/auth0-angular';

export const routes: Routes = [
  {
    path: 'exercises',
    loadComponent: () =>
      import('./screens/dashboard/exercises/exercises.component').then((m) => m.ExercisesComponent),
    canActivate: [AuthGuard],
  },
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
