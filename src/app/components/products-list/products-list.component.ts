import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, UntypedFormControl } from '@angular/forms';
import { debounce, debounceTime, Observable, Subscription, tap } from 'rxjs';
import { categoryType } from 'src/app/constants/category-product-type.constants';
import { IProduct } from 'src/app/models/product.interface';
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {

  public value = 'Clear me';
  public categoryType = categoryType;
  cart$!: Observable<any>;
  public cart: any = {}
  public isLoading: boolean = true

  productsList!: IProduct[];
  productsSubscription!: Subscription;
  filteredProducts: IProduct[] = [];

  public form = this.fb.group({
    category: [this.categoryType[0].name],
    search: ['']
  });

  get categoryFC(): UntypedFormControl {
    return this.form.get('category') as UntypedFormControl;
  }

  get searchFC(): UntypedFormControl {
    return this.form.get('search') as UntypedFormControl;
  }


  constructor(
    private productService: ProductsService,
    private cartService: CartService,
    private fb: FormBuilder
  ) { }


  ngOnInit(): void {
    this.loadCart();

    this.productsSubscription = this.productService.getProducts().subscribe((data: IProduct[]) => {
      this.productsList = data;
      this.isLoading = false
      this.categoryFilter(this.categoryFC.value);
    });

    this.categoryFC.valueChanges.subscribe((data) => {
      this.categoryFilter(this.categoryFC.value);
    });

    this.searchFC.valueChanges.subscribe((data) => {
      this.searchFilter(data)
    });


  }


  private loadCart() {
    this.cart$ = this.cartService.getCart();
    this.cart$.subscribe((cart) => {
      this.cart = cart.products
    })
  }


  searchFilter(value: string) {
    this.filteredProducts = this.productsList.filter(item => item.title.toLowerCase().includes(value.toLowerCase()))
  }

  categoryFilter(categoryName: string): void {
    if (categoryName === 'All') {
      this.filteredProducts = this.productsList;
    } else {
      this.productService.getProductByCategory(categoryName)
        .subscribe((data: any) => {
          this.filteredProducts = data;
        });
    }
  }

  clearInput() {
    this.searchFC.patchValue('')
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

  ngOnDestroy() {
    if (this.productsSubscription) this.productsSubscription.unsubscribe();
  }

}
