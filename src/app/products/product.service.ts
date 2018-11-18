import { Injectable } from '@angular/core';
import { IProduct } from './product';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';

// decorates the class as an Injectable(service)
// that can be injected into a component using dependency injection in constructor
// There is only 1 instance (singleton) of a service which is injected to every entity using it by deoendency injection
// This dependency injections is maintained by the angular Injector.
@Injectable({
  providedIn: 'root' // indicates that the service is available at the root level,
  // can be used by any component in the app,
  // if it has to be used by specific components, use the 'providers':[ProductService]
  // attribute in the Component decorator to achieve so
})
export class ProductService {
  private _productsUrl = 'api/products/products.json'; // path to the json resource
  constructor(private _http: HttpClient) {// inject the HttpClient service, termed dependency injection

  }
  // the methods in a service can be used by any component that consumes the service
  // or by other services using dependency injection
  getProducts(): Observable<IProduct[]> {// an Observable is an entity that waits for inputs to be provided,
    // the inputs may come overtime (one at a time)
    // --------0-------1------1-----0-----------------1--------0
    // the observable listens to the stream of data coming in and acts upon it
    // an observable is not generated until someone "subscribes" to it (lazy loading)(create only if required)
    // a Promise only returns once but an Observable does not

    // the get method of the httpclient will return an observable array of Iproducts,
    // the json is mapped to an Iproducts[] by using the generic declaration
    return this._http.get<IProduct[]>(this._productsUrl).pipe(// pipe is used to modify the observable's output,
      // this executes in the sequence of events listed

      // tap does not modify the data but helps us debug the output
      tap(products => console.log(products)),
      // catchError method is invoked whenever there is an error and executes the handleError method
      catchError(this.handleError)
    );
  }

  getProduct(id: number): Observable<IProduct | undefined> {
    return this.getProducts().pipe(
      // map is used to modify/filter the result
      map((products: IProduct[]) => products.find(product => product.productId === id))
    );
  }

  // custom method to execute on error
  private handleError(err: HttpErrorResponse) {// the error returned from the catchError method is of HttpErrorResponse type
    let errorMsg = '';
    if (err.error instanceof ErrorEvent) {
      errorMsg = `An error occurred: ${err.error.message}`;
    } else {
      errorMsg = `Server returned code: ${err.error.code}, error message is ${err.error.message}`;
    }
    console.log(errorMsg);
    return throwError(errorMsg); // throw the error message
  }
}
