import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductDetailComponent } from './product-detail.component';


// CLI : ng g g products/product-detail
// Guard is a service that can be used by multiple components
@Injectable({
  providedIn: 'root'
})
export class ProductDetailGuard implements CanActivate, CanDeactivate<ProductDetailComponent> {
  constructor(private _router: Router) {
  }

  // called as a middleware when ever the route using this is navigated to
  canActivate(
    next: ActivatedRouteSnapshot, // contains information snapshot of the current route
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const id = +next.paramMap.get('id'); // + converts the data to numeric
    if (isNaN(id) || id < 1) {
      alert('Invalid Product Id');
      this._router.navigate(['/products']);
      return false;
    }
    return true;
  }
  // called as a middleware when ever the route using this is deactivated or navigated from
  canDeactivate(
    component: ProductDetailComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState: RouterStateSnapshot): boolean {
    return true;
  }
}
