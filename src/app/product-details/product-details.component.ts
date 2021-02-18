import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {IProduct} from '../products/IProduct';
@Component({
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  pageTitle: string = 'Product Detail';
  product: IProduct;
  constructor(private route: ActivatedRoute) {
    
   }

  ngOnInit(): void {
    let id: string = this.route.snapshot.paramMap.get('id');
  }

}
