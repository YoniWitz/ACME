import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from 'src/app/shared/IProduct';
import { ProductService } from 'src/app/shared/product.service';
import {NumberValidators} from 'src/app/shared/number.validator';

@Component({
  selector: 'pm-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})

export class ProductEditComponent implements OnInit {
  id: number;
  product: IProduct;
  errorMessage: string = '';
  productForm: FormGroup;
  pageTitle = 'Product Edit';
  sub: any;

  constructor(private route: ActivatedRoute, private productService: ProductService, private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.sub = this.route.paramMap.subscribe(
      params => {
        const id= +params.get('id');
        this.productService.getProduct(id).subscribe({
          next: product => {
            this.product = product;
          },
          error: err => this.errorMessage = err
        });
      }
    )

    
    this.productForm = this.fb.group({
      productName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      productCode: ['', Validators.required],
      starRating: ['', NumberValidators.range(1,5)],
      description: ''
    })
  }

  ngOnDestroy(): void{
    this.sub.unsubscribe();
  }

  deleteProduct(): void {
    this.productService.deleteProduct(this.id).subscribe({
      next: () => this.router.navigate(['/products']),
      error: err => this.errorMessage = err
    });

  }

  onCancel(): void {
    this.router.navigate(['/products']);
  }

  save():void{

  }
}
