import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean | UrlTree {
    const roles: string[] = route.data['roles'] || [];
    const user = this.auth.currentUser;

    if (user && roles.includes(user.role)) {
      return true;
    }

    return this.router.parseUrl('/');
  }
}
