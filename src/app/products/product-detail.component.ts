import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from './product.service';
import { IProduct } from './product';

// CLI: ng g c products/product-detail
@Component({
  // selector: 'pm-product-detail',//not required as this component is not being nested in any other component
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  pageTitle = 'Product';
  errorMessage: string;
  product: IProduct;

  constructor(private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _productService: ProductService) {
  }

  ngOnInit() {
    const id = +this._activatedRoute.snapshot.paramMap.get('id'); // get the id from the activatedRoute Snapshot
    this._productService.getProduct(id).subscribe(
      product => this.product = product,
      err => this.errorMessage = <any>err
    );
  }

  onBack() {
    this._router.navigate(['/products']);
  }

}
