import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, UntypedFormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { categoryType } from 'src/app/constants/category-product-type.constants';
import { IProduct } from 'src/app/models/product.interface';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {

  public value = 'Clear me';
  public categoryType = categoryType;

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
    private fb: FormBuilder
  ) { }


  ngOnInit(): void {
    this.productsSubscription = this.productService.getProducts().subscribe((data: IProduct[]) => {
      this.productsList = data;
      this.categoryFilter(this.categoryFC.value);
    });

    this.categoryFC.valueChanges.subscribe((data) => {
      this.categoryFilter(this.categoryFC.value);
    });

    this.searchFC.valueChanges.subscribe((data) => {
      this.searchFilter(data)
    });

  }

  searchFilter(value: string) {
    this.filteredProducts = this.productsList.filter(item => item.title.toLowerCase().includes(value.toLowerCase()))
  }

  categoryFilter(categoryName: string): void {
    if (categoryName === 'All') {
      this.filteredProducts = this.productsList;
    } else {
      this.filteredProducts = this.productsList.filter(item => item.category === categoryName);
    }
  }

  clearInput() {
    this.searchFC.patchValue('')
  }

  ngOnDestroy() {
    if (this.productsSubscription) this.productsSubscription.unsubscribe();
  }


}
