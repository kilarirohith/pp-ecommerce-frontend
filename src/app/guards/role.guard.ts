import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  UrlTree
} from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean | UrlTree {
    const expectedRole = route.data['role'] as string;
    const userRole = this.auth.role;

    if (userRole && userRole.toLowerCase() === expectedRole.toLowerCase()) {
      return true;
    }

    return this.router.parseUrl('/');
  }
}
