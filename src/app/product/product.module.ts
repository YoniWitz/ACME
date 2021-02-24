import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Route, RouterModule } from '@angular/router';

import { ProductListComponent } from './products/product-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { StarComponent } from '../shared/star/star.component';
import { ConvertToSpacesPipe } from '../shared/convert-to-spaces.pipe';
import { ProductDetailsGuard } from './product-details/product-details.guard';

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
    CommonModule,
    FormsModule,
    RouterModule.forChild(arrayOfRoutes)
  ]
})
export class ProductModule { }
