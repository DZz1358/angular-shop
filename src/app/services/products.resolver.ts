import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, catchError, EMPTY } from 'rxjs';
import { ProductsService } from './products.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsResolver implements Resolve<any> {
  constructor(private productService: ProductsService, private router: Router){}


  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.productService.getProduct(route.params?.['id']).pipe(
      catchError(() => {
        this.router.navigate(['/products']);
        return EMPTY;
      })
    )
  }
}
