import { inject, output } from '@angular/core';
import { CanActivateFn, Router, RouterOutlet } from '@angular/router';
import { AuthService } from './auth.service';
import { take } from 'rxjs';

export const guardsGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const currentUser = authService.getUser();

  if (currentUser !== null) {
    return true;
  } else {
    alert('Log in required!');
    router.navigate(['login']);
    return false;
  }
};
