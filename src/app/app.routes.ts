import { Routes } from '@angular/router';
import { Login } from './auth/login/login';
import { Dictionary } from './dictionary/dictionary';
import { authGuard } from './auth/auth-guard';
import { guestGuard } from './auth/guest-guard';
import { Register } from './auth/register/register';
import { AuthLayout } from './auth/auth-layout/auth-layout';
import { MainLayout } from './layout/main-layout/main-layout';
import { Training } from './training/training';
import { Recommend } from './recommend/recommend';

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
    path: '',
    component: MainLayout,
    canActivate: [authGuard],
    children: [
      {
        path: 'dictionary',
        component: Dictionary,
      },
      {
        path: 'training',
        component: Training,
      },
      {
        path: 'recommend',
        component: Recommend,
      },
    ],
  },
];
