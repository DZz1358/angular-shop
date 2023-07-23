import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from './shared/shared.module';
import { MatCardModule } from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { ProductInfoComponent } from './components/product-info/product-info.component';
import { MainComponent } from './components/main/main.component';
import { ProductsResolver } from './services/products.resolver';
import { MatDialogModule } from '@angular/material/dialog';
import { AddProductModalComponent } from './components/add-product-modal/add-product-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ProductsListComponent,
    ProductInfoComponent,
    MainComponent,
    AddProductModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    HttpClientModule,
    MatCardModule,
    SharedModule,
    MatDialogModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule
  ],
  providers: [ProductsResolver],
  bootstrap: [AppComponent]
})
export class AppModule { }
