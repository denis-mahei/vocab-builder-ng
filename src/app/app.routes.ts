import { Routes } from '@angular/router';
import { Login } from './auth/login/login';
import { Dictionary } from './dictionary/dictionary';
import { authGuard } from './auth/auth-guard';
import { guestGuard } from './auth/guest-guard';
import { Register } from './auth/register/register';
import { AuthLayout } from './auth/auth-layout/auth-layout';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dictionary',
    pathMatch: 'full',
  },
  {
    path: '',
    component: AuthLayout,
    canActivate: [guestGuard],
    children: [
      {
        path: 'register',
        component: Register,
      },
      {
        path: 'login',
        component: Login,
      },
    ],
  },
  {
    path: 'dictionary',
    component: Dictionary,
    canActivate: [authGuard],
  },
];
