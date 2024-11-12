import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cart$!: Observable<any>;
  public cartProducts: any = {}


  constructor(private cartService: CartService,
  ) { }

  ngOnInit(): void {
    this.loadCart();

  }

  private loadCart() {
    this.cart$ = this.cartService.getCart();
    this.cart$.subscribe((cart) => {
      console.log('cart', cart)
      this.cartProducts = cart.products
    })
  }


}