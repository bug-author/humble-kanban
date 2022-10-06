import { LoginGuard } from './guards/login/login.guard';
import { Routes } from '@angular/router';
import { IsAuthenticatedGuard } from './guards/is-authenticated/is-authenticated.guard';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./core/core.module').then((m) => m.CoreModule),
    canActivate: [IsAuthenticatedGuard],
    canActivateChild: [IsAuthenticatedGuard],
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
    canActivate: [LoginGuard],
    canActivateChild: [LoginGuard],
  },
];
