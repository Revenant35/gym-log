import { Routes } from '@angular/router';
import {isAuthenticatedGuard} from './guards/is-authenticated-guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./screens/login-screen/login-screen').then((m) => m.LoginScreen),
  },
  {
    path: 'exercises',
    loadComponent: () => import('./screens/exercise-search-screen/exercise-search-screen').then((m) => m.ExerciseSearchScreen),
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
    path: 'schedule',
    loadComponent: () => import('./screens/current-schedule-screen/current-schedule-screen').then((m) => m.CurrentScheduleScreen),
    canActivate: [isAuthenticatedGuard]
  },
  {
    path: 'workout',
    loadComponent: () => import('./screens/workout-session-screen/workout-session-screen').then((m) => m.WorkoutSessionScreen),
    canActivate: [isAuthenticatedGuard]
  },
  {
    path: 'schedules',
    loadComponent: () => import('./screens/schedule-library-screen/schedule-library-screen').then((m) => m.ScheduleLibraryScreen),
    canActivate: [isAuthenticatedGuard]
  },
  {
    path: 'schedule/detail/:id',
    loadComponent: () => import('./screens/schedule-detail-screen/schedule-detail-screen').then((m) => m.ScheduleDetailScreen),
    canActivate: [isAuthenticatedGuard]
  },
  {
    path: 'schedule/create',
    loadComponent: () => import('./screens/schedule-builder-screen/schedule-builder-screen').then((m) => m.ScheduleBuilderScreen),
    canActivate: [isAuthenticatedGuard]
  },
  {
    path: 'schedule/edit/:id',
    loadComponent: () => import('./screens/schedule-builder-screen/schedule-builder-screen').then((m) => m.ScheduleBuilderScreen),
    canActivate: [isAuthenticatedGuard]
  },
  {
    path: '**',
    redirectTo: 'login',
  }
];
