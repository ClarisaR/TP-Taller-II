import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NoauthGuard implements CanActivate {

  constructor(protected authService: AuthService, protected router: Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      console.log('Ejecutando guard')
      // Usar pipe y map para obtener el valor booleano de isAuthenticated()
      return this.authService.isAuthenticated().pipe(
        map((isAuthenticated: boolean) => {
          if (isAuthenticated) {
            this.router.navigate(["/tasks"])
            return false;
          } else {
            return true;
          }
        })
      );
  }
  
}
