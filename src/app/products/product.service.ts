import { Injectable } from '@angular/core';
import { IProduct } from './product';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private _productsUrl = 'api/products/products.json';
  constructor(private _http: HttpClient) {

  }
  getProducts(): Observable<IProduct[]> {
    return this._http.get<IProduct[]>(this._productsUrl).pipe(
      tap(products => console.log(products)),
      catchError(this.handleError)
      );
  }

  private handleError(err: HttpErrorResponse) {
    let errorMsg = '';
    if (err.error instanceof ErrorEvent) {
      errorMsg = `An error occurred: ${err.error.message}`;
    } else {
      errorMsg = `Server returned code: ${err.error.code}, error message is ${err.error.message}`;
    }
      console.log(errorMsg);
return throwError(errorMsg);
  }
}
