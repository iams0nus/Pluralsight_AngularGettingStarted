import { Component, OnInit } from '@angular/core';
import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
  selector: 'pm-products',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  providers: [ProductService]
})

export class ProductListComponent implements OnInit {
  pageTitle = 'Product List';
  filteredProducts: IProduct[];
  products: IProduct[] = [];
  imageWidth = 30;
  imageMargin = 2;
  showImage = false;
  errorMessage: string;

  private _listFilter: string;
  public get listFilter() {
    return this._listFilter;
  }
  public set listFilter(value) {
    this._listFilter = value;
    this.filteredProducts = this.listFilter ? this.performFilter(this._listFilter) : this.products;
  }

  constructor(private _productService: ProductService) {
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  performFilter(listFilter: string): IProduct[] {
    listFilter = listFilter.toLocaleLowerCase();
    return this.products.filter((product: IProduct) =>
      product.productName.toLocaleLowerCase().indexOf(listFilter) !== -1
    );
  }

  onNotify(message: string) {
    console.log(message);
  }
  ngOnInit(): void {
    this._productService.getProducts().subscribe(
      products => {
        this.products = products;
        this.filteredProducts = this.products;
      },
      error => this.errorMessage = <any>error
    );
  }
}
