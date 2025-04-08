import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { AutorizacaoService } from '../service/autorizacao.service';





export const authGuard: CanActivateFn = (route, state) => {

  const auth = inject(AutorizacaoService);
  const router = inject(Router);

  if (auth.getUserRole() === 'hunter') {
    return true;
  }
  else {
    return router.createUrlTree(['/login']);
  }

};
