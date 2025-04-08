import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { AutorizacaoService } from '../service/autorizacao.service';

export const combineGuardGuard: CanActivateFn = (route, state) => {
  const auto = inject(AutorizacaoService);
  const router = inject(Router);

  if (auto.getUserRole() === 'admin' || auto.getUserRole() === 'hunter') {
    return true;
  } else {
    return router.createUrlTree(['/login']);
  }

};
