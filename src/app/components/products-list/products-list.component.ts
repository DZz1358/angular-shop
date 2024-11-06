import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { IProduct } from 'src/app/models/product.interface';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {
  public categoryType = [
    {
      id: 0,
      label: 'All',
      name: "All"
    },
    {
      id: 1,
      label: 'Electronics',
      name: "electronics"
    },
    {
      id: 2,
      label: 'Jewelery',
      name: "jewelery"
    },
    {
      id: 3,
      label: "Men's clothing",
      name: "women's clothing"
    },
    {
      id: 4,
      label: "Women's clothing",
      name: "women's clothing"
    },
  ];

  productsList!: IProduct[];
  productsSubscription!: Subscription;
  filteredProducts: IProduct[] = [];

  public form = this.fb.group({
    category: [this.categoryType[0].name],
  });

  get categoryFC() {
    return this.form.get('category')?.value;
  }

  constructor(
    private productService: ProductsService,
    private fb: FormBuilder
  ) { }


  ngOnInit(): void {
    this.productsSubscription = this.productService.getProducts().subscribe((data: IProduct[]) => {
      this.productsList = data;
      this.applyFilter(String(this.categoryFC));
    });

    this.form.valueChanges.subscribe(() => {
      this.applyFilter(String(this.categoryFC));
    });

  }

  applyFilter(categoryName: string): void {
    if (categoryName === 'All') {
      this.filteredProducts = this.productsList;
    } else {
      this.filteredProducts = this.productsList.filter(item => item.category === categoryName);
    }
  }

  ngOnDestroy() {
    if (this.productsSubscription) this.productsSubscription.unsubscribe();
  }


}
