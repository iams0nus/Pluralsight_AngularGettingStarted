import { Component, OnInit, OnDestroy } from '@angular/core';
import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  // if the service is not registered on root use the providers arrays to list the services
  // providers: [ProductService]
})

export class ProductListComponent implements OnInit, OnDestroy {// implement the OnInit interface
  pageTitle = 'Product List';
  filteredProducts: IProduct[];
  products: IProduct[] = [];
  imageWidth = 30;
  imageMargin = 2;
  showImage = false;
  errorMessage: string;

  // getters and setters help us execute some activity whenever the value changes
  private _listFilter: string;
  public get listFilter() {
    return this._listFilter;
  }
  public set listFilter(value) {
    this._listFilter = value;
    this.filteredProducts = this.listFilter ? this.performFilter(this._listFilter) : this.products;
  }

  constructor(private _productService: ProductService) {// inject the productservice
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  performFilter(listFilter: string): IProduct[] {
    listFilter = listFilter.toLocaleLowerCase();
    return this.products.filter((product: IProduct) => // filter method filters an array
      product.productName.toLocaleLowerCase().indexOf(listFilter) !== -1
    );
  }

  onNotify(message: string) {
    console.log(message);
  }

  // ngOnInit helps us execute startup logic
  ngOnInit(): void {
    // execute the getProducts method
    this._productService.getProducts().subscribe( // subscribe to the Observable that returns the products as a stream
      // the subsribe function takes 3 call backs
      // the success callback
      products => { // as the data is received the products is updated
        this.products = products;
        this.filteredProducts = this.products;
      },
      // the error callback
      error => this.errorMessage = <any>error
      // the complete callback
    );
  }

  // called on destruction of the component
  ngOnDestroy() {
    console.log('Component destroyed');
  }
}
