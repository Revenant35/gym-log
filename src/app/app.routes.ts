import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./screens/shell/shell.component').then((m) => m.ShellComponent),
    canActivate: [authGuard],
    children: [
      {
        path: 'exercises',
        loadComponent: () =>
          import('./screens/dashboard/exercises/exercises.component').then(
            (m) => m.ExercisesComponent,
          ),
      },
      {
        path: 'profile',
        loadComponent: () =>
          import('./screens/dashboard/profile/profile.component').then((m) => m.ProfileComponent),
      },
      {
        path: '',
        redirectTo: 'exercises',
        pathMatch: 'full',
      },
    ],
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
    redirectTo: '',
  },
];
