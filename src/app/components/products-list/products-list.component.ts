import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { IProduct } from 'src/app/models/product.interface';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {

  productsList!: IProduct[];
  productsSubscription!: Subscription;
  newProduct!: any;

  constructor(
    private productService: ProductsService,
  ) { }


  ngOnInit(): void {
    this.productsSubscription = this.productService.getProducts().subscribe((data: any) => {
      this.productsList = data;
      console.log('this.productsList4', this.productsList)
    });
  };

  ngOnDestroy() {
    if (this.productsSubscription) this.productsSubscription.unsubscribe();
  }


}
