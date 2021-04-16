import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { ProductListComponent } from './products/product-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductDetailsGuard } from './product-details/product-details.guard';
import { ProductEditGuard } from './product-edit/product-edit.guard';

import { SharedModule } from '../shared/shared.module';
import { StarComponent } from '../shared/star/star.component';
import { ConvertToSpacesPipe } from '../shared/convert-to-spaces.pipe';

import {InMemoryWebApiModule} from 'angular-in-memory-web-api';
import {ProductData} from '../product/product-data';


let arrayOfRoutes: Route[] = [
  { path: 'products', component: ProductListComponent },
  {
    path: 'products/:id',
    canActivate: [ProductDetailsGuard], 
    component: ProductDetailsComponent
  },
  {
    path: 'products/:id/edit',
    canDeactivate: [ProductEditGuard],
    canActivate: [ProductEditGuard],
     component: ProductEditComponent
  }
];

@NgModule({
  declarations: [
    ProductListComponent,
    ProductDetailsComponent,
    ProductEditComponent,

    StarComponent,

    ConvertToSpacesPipe    
  ],
  imports: [
    InMemoryWebApiModule.forRoot(ProductData),
    RouterModule.forChild(arrayOfRoutes),
    SharedModule,
    ReactiveFormsModule
  ]
})
export class ProductModule { }
