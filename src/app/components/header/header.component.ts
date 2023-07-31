import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddProductModalComponent } from '../add-product-modal/add-product-modal.component';
import { AddProductService } from 'src/app/services/add-product.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public canEdit: boolean = true;

  constructor(public dialog: MatDialog, private addProductService: AddProductService,
  ) { }

  ngOnInit(): void {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddProductModalComponent, {
      width: '450px',
    });

    dialogRef.afterClosed().subscribe((data) => {
    });
  }

  postProduct() {

  }

}
