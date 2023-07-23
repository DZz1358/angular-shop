import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { IProduct } from 'src/app/models/product.interface';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.scss']
})
export class ProductInfoComponent implements OnInit, OnDestroy {

  product!: IProduct;
  productSubscription!: Subscription;


  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.productSubscription = this.route.data.subscribe((data) => {
      this.product = data['data'];
      console.log('data', data);
    })

  }




  ngOnDestroy(): void {
    if (this.productSubscription) this.productSubscription.unsubscribe();
  }


}
