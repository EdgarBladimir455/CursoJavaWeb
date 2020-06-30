import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { TIPO_PEFIL_TODOS } from 'src/app/shared/shared/constants/general-constant';

@Injectable({
  providedIn: 'root'
})
export class AuthGaurdService implements CanActivate {

  constructor(private router: Router,
              private authService: AuthenticationService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authService.isUserLoggedIn()) {
      const perfilAcceso = route.data.perfilAcceso;
      if (perfilAcceso && perfilAcceso !== sessionStorage.getItem('perfil') && perfilAcceso !== TIPO_PEFIL_TODOS) {
        this.router.navigate(['inicio/perfil']);
        return false;
      } else {
        return true;
      }

    } else {
      this.router.navigate(['login']);
      return false;
    }
  }

}
