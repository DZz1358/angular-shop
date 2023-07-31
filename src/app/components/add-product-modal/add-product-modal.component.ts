import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AddProductService } from 'src/app/services/add-product.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-add-product-modal',
  templateUrl: './add-product-modal.component.html',
  styleUrls: ['./add-product-modal.component.scss']
})
export class AddProductModalComponent implements OnInit {

  public form: FormGroup = new FormGroup({
    title: new FormControl(''),
    price: new FormControl(''),
    description: new FormControl(''),
    category: new FormControl(''),
  })

  public categoryList = [
    {
      id: "electronics",
      label: "Electronic"
    },
    {
      id: "women's clothing",
      label: "Women's clothing"
    },
    {
      id: "men's clothing",
      label: "Men's clothing"
    },
    {
      id: "jewelery",
      label: "Jewelery"
    },
  ]

  constructor(
    public dialogRef: MatDialogRef<AddProductModalComponent>,
    private productService: ProductsService,
    private addProductService: AddProductService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }


  ngOnInit(): void {
  }

  public onSubmit(form: any) {
    const data = {
      ...form.value,
      image: 'assets/images/кіт.jpg'
    }
    this.productService.addProduct(data).subscribe(
      (response) => {
        console.log('Product added successfully:', response);
        this.addProductService.setData(response)
        this.onClose();
      },
      (error) => {
        console.error('Error while adding product:', error);
      }
    );
  }

  onClose(): void {
    this.dialogRef.close(this.form.value);
  }


}
