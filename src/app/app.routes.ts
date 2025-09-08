import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'exercises',
    loadComponent: () => import('./screens/exercises-screen/exercises-screen').then((m) => m.ExercisesScreen),
  },
  {
    path: 'more',
    loadComponent: () => import('./screens/more-screen/more-screen').then((m) => m.MoreScreen),
  },
];
