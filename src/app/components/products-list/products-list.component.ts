import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IProduct } from 'src/app/models/product.interface';
import { AddProductService } from 'src/app/services/add-product.service';
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
    private addProductService: AddProductService,
  ) { }


  ngOnInit(): void {
    this.addProductService.getData().subscribe((data) => {
      this.newProduct = data;
      this.productsList.push(this.newProduct)
    });

    this.productsSubscription = this.productService.getProducts().subscribe((data: any) => {
      this.productsList = data;
    });
  };

  ngOnDestroy() {
    if (this.productsSubscription) this.productsSubscription.unsubscribe();
  }


}
