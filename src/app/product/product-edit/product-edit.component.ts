import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from 'src/app/shared/IProduct';
import { ProductService } from 'src/app/shared/product.service';

@Component({
  selector: 'pm-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  id: number;
  product: IProduct;
  errorMessage: string = '';

  constructor(private route: ActivatedRoute, private productService: ProductService, private router: Router) { }

  ngOnInit(): void { 
    this.id = +this.route.snapshot.paramMap.get('id'); 
    this.productService.getProduct(this.id).subscribe({
      next: product => {
        this.product = product;
      },
      error: err => this.errorMessage = err
    });
  }

  deleteProduct(): void{
    this.productService.deleteProduct(this.id).subscribe({
      next: () =>  this.router.navigate(['/products']),
      error: err => this.errorMessage = err
    });
    
  }

  onCancel(): void {
    this.router.navigate(['/products']);
  }
}
