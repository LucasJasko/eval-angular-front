import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { NotifService } from './notif.service';

export const modoGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const Notification = inject(NotifService);

  if (authService.user?.role == 'modo' || authService.user?.role == 'admin') {
    return true;
  }

  Notification.show(
    "Vous n'avez pas accès à cette page, connectez vous en tant que modérateur",
    'error'
  );
  return router.parseUrl('/login');
};
