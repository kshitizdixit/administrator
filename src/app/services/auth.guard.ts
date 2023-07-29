import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (localStorage.getItem('token') !== null) {
      if (route.routeConfig?.path === 'login' || route.routeConfig?.path === '') {
        this.router.navigate(['/dashboard']);
        return false;
      }
      return true;
    } else {
      if (route.routeConfig?.path !== 'login') {
        this.router.navigate(['/login']);
      }
      return true;
    }
  }
}
