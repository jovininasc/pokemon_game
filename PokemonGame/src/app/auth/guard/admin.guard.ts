import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AutorizacaoService } from '../service/autorizacao.service';


export const adminGuard: CanActivateFn = (route, state) => {

  const autoService = inject(AutorizacaoService);
  const router = inject(Router);

  if (autoService.getUserRole() === 'admin') {
    return true;
  } else {

    return router.createUrlTree(['/login']);
  }

}


