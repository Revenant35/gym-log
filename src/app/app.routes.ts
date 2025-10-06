import { Routes } from '@angular/router';
import {isAuthenticatedGuard} from './guards/is-authenticated-guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./screens/login-screen/login-screen').then((m) => m.LoginScreen),
  },
  {
    path: 'session',
    loadComponent: () => import('./screens/session-screen/session-screen').then((m) => m.SessionScreen),
    canActivate: [isAuthenticatedGuard]
  },
  {
    path: 'exercises',
    loadComponent: () => import('./screens/exercise-screen/exercise-screen').then((m) => m.ExerciseScreen),
    canActivate: [isAuthenticatedGuard]
  },
  {
    path: 'more',
    loadComponent: () => import('./screens/more-screen/more-screen').then((m) => m.MoreScreen),
    canActivate: [isAuthenticatedGuard]
  },
  {
    path: 'units',
    loadComponent: () => import('./screens/more-screen/units-screen/units-screen').then((m) => m.UnitsScreen),
    canActivate: [isAuthenticatedGuard]
  },
  {
    path: 'account',
    loadComponent: () => import('./screens/more-screen/account-screen/account-screen').then((m) => m.AccountScreen),
    canActivate: [isAuthenticatedGuard]
  },
  {
    path: '**',
    redirectTo: 'login',
  }
];
