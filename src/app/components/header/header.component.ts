import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public canEdit: boolean = true;
  cart$!: Observable<any>;
  public cartLength: number = 0;


  constructor(public dialog: MatDialog,
    private cartService: CartService,

  ) { }

  ngOnInit(): void {
    this.loadCart();

  }

  private loadCart() {
    this.cart$ = this.cartService.getCart();
    this.cart$.subscribe((cart) => {
      this.cartLength = cart.products?.length ? cart.products.length : 0
    })
  }


}
