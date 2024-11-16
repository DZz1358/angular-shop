import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { IProduct } from 'src/app/models/product.interface';
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.scss']
})
export class ProductInfoComponent implements OnInit, OnDestroy {

  product!: IProduct;
  productSubscription!: Subscription;
  cart$!: Observable<any>;
  public cart: any = {}
  public isLoading: boolean = true


  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private cartService: CartService,
    private productService: ProductsService,

  ) { }

  ngOnInit(): void {
    this.loadCart();
    this.route.paramMap.subscribe(params => {
      const id = params.get('id')!;
      this.productSubscription = this.productService.getProduct(id).subscribe((product: any) => {
        this.product = product;
        this.isLoading = false
      })
    });
  }

  private loadCart() {
    this.cart$ = this.cartService.getCart();
    this.cart$.subscribe((cart) => {
      this.cart = cart.products
    })
  }

  initCount(product: any) {
    const match = this.cart?.find((item: any) => item.id === product.id)
    return match ? match.count : 0;
  }

  increment(product: any) {
    this.cartService.addToCart(product)
  }

  decrement(productId: number) {
    this.cartService.removeFromCart(productId)
  }

  back() {
    this.location.back();
  }

  ngOnDestroy(): void {
    if (this.productSubscription) this.productSubscription.unsubscribe();
  }

}
