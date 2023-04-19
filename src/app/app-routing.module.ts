import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { ProductInfoComponent } from './components/product-info/product-info.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent
  },
  {
    path: 'products',
    component: ProductsListComponent
  },
  {
    path: 'product/:id',
    component: ProductInfoComponent
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
