import { Routes } from '@angular/router';
import { Login } from './auth/login/login';
import { Dictionary } from './dictionary/dictionary';
import { authGuard } from './auth/auth-guard';
import { guestGuard } from './auth/guest-guard';
import { Register } from './auth/register/register';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dictionary',
    pathMatch: 'full',
  },
  {
    path: 'register',
    component: Register,
    canActivate: [guestGuard],
  }
  ,
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
