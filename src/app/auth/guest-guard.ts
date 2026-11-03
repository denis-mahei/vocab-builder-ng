import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { Auth } from './auth';

export const guestGuard: CanActivateFn = () => {
  const auth = inject(Auth)
  const router = inject(Router)
  return auth.isLoggedIn() ? router.navigate(['/dictionary']) : true
};
