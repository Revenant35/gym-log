import { Routes } from '@angular/router';
import { AuthGuard } from '@auth0/auth0-angular';

export const routes: Routes = [
  {
    path: 'exercises',
    loadComponent: () =>
      import('./screens/exercise-search-screen/exercise-search-screen').then(
        (m) => m.ExerciseSearchScreen,
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'more',
    loadComponent: () => import('./screens/more-screen/more-screen').then((m) => m.MoreScreen),
    canActivate: [AuthGuard],
  },
  {
    path: 'units',
    loadComponent: () =>
      import('./screens/more-screen/units-screen/units-screen').then((m) => m.UnitsScreen),
    canActivate: [AuthGuard],
  },
  {
    path: 'account',
    loadComponent: () =>
      import('./screens/more-screen/account-screen/account-screen').then((m) => m.AccountScreen),
    canActivate: [AuthGuard],
  },
  // {
  //   path: 'schedule',
  //   loadComponent: () =>
  //     import('./screens/current-schedule-screen/current-schedule-screen').then(
  //       (m) => m.CurrentScheduleScreen,
  //     ),
  //   canActivate: [AuthGuard],
  // },
  // {
  //   path: 'workout',
  //   loadComponent: () =>
  //     import('./screens/workout-session-screen/workout-session-screen').then(
  //       (m) => m.WorkoutSessionScreen,
  //     ),
  //   canActivate: [AuthGuard],
  // },
  // {
  //   path: 'schedules',
  //   loadComponent: () =>
  //     import('./screens/schedule-library-screen/schedule-library-screen').then(
  //       (m) => m.ScheduleLibraryScreen,
  //     ),
  //   canActivate: [AuthGuard],
  // },
  // {
  //   path: 'schedule/detail/:id',
  //   loadComponent: () =>
  //     import('./screens/schedule-detail-screen/schedule-detail-screen').then(
  //       (m) => m.ScheduleDetailScreen,
  //     ),
  //   canActivate: [AuthGuard],
  // },
  // {
  //   path: 'schedule/create',
  //   loadComponent: () =>
  //     import('./screens/schedule-builder-screen/schedule-builder-screen').then(
  //       (m) => m.ScheduleBuilderScreen,
  //     ),
  //   canActivate: [AuthGuard],
  // },
  // {
  //   path: 'schedule/edit/:id',
  //   loadComponent: () =>
  //     import('./screens/schedule-builder-screen/schedule-builder-screen').then(
  //       (m) => m.ScheduleBuilderScreen,
  //     ),
  //   canActivate: [AuthGuard],
  // },
  {
    path: '**',
    redirectTo: 'login',
  },
];
