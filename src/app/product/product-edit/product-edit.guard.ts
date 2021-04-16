import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductEditComponent } from './product-edit.component';

@Injectable({
  providedIn: 'root'
})
export class ProductEditGuard implements CanActivate, CanDeactivate<ProductEditComponent> {
  constructor(private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    let id = + next.url[1].path;
    if (isNaN(id) || id < 0) {
      this.router.navigate(['/products']);
      return false;
    }
    return true;
  }

  canDeactivate(component: ProductEditComponent): boolean {
    if (component.productForm.dirty) {
      let productName = component.productForm.get('productName').value || 'New Product';
      return confirm(`lose all changes done to ${productName}?`);
    }
    return true;
  }

}
