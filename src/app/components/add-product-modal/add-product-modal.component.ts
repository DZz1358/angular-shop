import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
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
    image: new FormControl(''),
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
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  onClose(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {

  }

  public onSubmit(form: any) {
    this.productService.addProduct(form.value).subscribe(
      (response) => {
        console.log('Product added successfully:', response);
        this.onClose();
      },
      (error) => {
        console.error('Error while adding product:', error);
      }
    );
  }

}
