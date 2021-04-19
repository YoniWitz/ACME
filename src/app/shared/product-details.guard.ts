import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProductDetailsGuard implements CanActivate {
  constructor(private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    let id = + next.url[1].path;
    if (isNaN(id) || id < 1) {
      this.router.navigate(['/products']);
      return false;
    }
    return true;
  }
}
