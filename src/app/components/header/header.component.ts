import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public canEdit: boolean = true;

  constructor(public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
  }

}
