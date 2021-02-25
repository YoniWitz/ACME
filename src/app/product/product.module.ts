import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { ProductListComponent } from './products/product-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductDetailsGuard } from './product-details/product-details.guard';

import {SharedModule} from '../shared/shared.module';
import { StarComponent } from '../shared/star/star.component';
import { ConvertToSpacesPipe } from '../shared/convert-to-spaces.pipe';


let arrayOfRoutes: Route[] = [
  { path: 'products', component: ProductListComponent },
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
  ],
  imports: [
    RouterModule.forChild(arrayOfRoutes),
    SharedModule
  ]
})
export class ProductModule { }
