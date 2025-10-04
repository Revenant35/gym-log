import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'session',
    loadComponent: () => import('./screens/session-screen/session-screen').then((m) => m.SessionScreen),
  },
  {
    path: 'exercises',
    loadComponent: () => import('./screens/exercise-screen/exercise-screen').then((m) => m.ExerciseScreen),
  },
  {
    path: 'more',
    loadComponent: () => import('./screens/more-screen/more-screen').then((m) => m.MoreScreen),
  },
  {
    path: 'units',
    loadComponent: () => import('./screens/more-screen/units-screen/units-screen').then((m) => m.UnitsScreen),
  },
  {
    path: 'account',
    loadComponent: () => import('./screens/more-screen/account-screen/account-screen').then((m) => m.AccountScreen),
  },
  {
    path: '**',
    redirectTo: 'session',
  }
];
