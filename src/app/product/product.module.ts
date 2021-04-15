import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { ProductListComponent } from './products/product-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductDetailsGuard } from './product-details/product-details.guard';

import {SharedModule} from '../shared/shared.module';
import { StarComponent } from '../shared/star/star.component';
import { ConvertToSpacesPipe } from '../shared/convert-to-spaces.pipe';


let arrayOfRoutes: Route[] = [
  { path: 'products', component: ProductListComponent },
  {
    path: 'products/:id',
    canActivate: [ProductDetailsGuard], component: ProductEditComponent
  },
  {
    path: 'product/:id',
    canActivate: [ProductDetailsGuard], component: ProductDetailsComponent
  }
];

@NgModule({
  declarations: [
    ProductListComponent,
    ProductDetailsComponent,
     
    StarComponent,
   
    ConvertToSpacesPipe,
   
    ProductEditComponent,  
  ],
  imports: [
    RouterModule.forChild(arrayOfRoutes),
    SharedModule
  ]
})
export class ProductModule { }
