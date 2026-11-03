import { Routes } from '@angular/router';
import { Login } from './auth/login/login';
import { Dictionary } from './dictionary/dictionary';
import { authGuard } from './auth/auth-guard';
import { guestGuard } from './auth/guest-guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dictionary',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: Login,
    canActivate: [guestGuard],
  },
  {
    path: 'dictionary',
    component: Dictionary,
    canActivate: [authGuard],
  },
];
