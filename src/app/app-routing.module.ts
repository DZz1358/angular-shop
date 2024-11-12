import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { ProductInfoComponent } from './components/product-info/product-info.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { ProductsResolver } from './services/products.resolver';
import { CartComponent } from './components/cart/cart.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'products',
    pathMatch: 'full'
  },
  {
    path: 'products',
    component: ProductsListComponent
  },
  {
    path: 'cart',
    component: CartComponent
  },
  {
    path: 'product/:id',
    component: ProductInfoComponent,
    resolve: { data: ProductsResolver }
  },
  {
    path: '**',
    component: NotFoundComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
