import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const denyloginGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const currentUser = authService.getUser();

  if (currentUser === null) {
    return true;
  } else {
    router.navigate(['home']);
    return false;
  }
};
