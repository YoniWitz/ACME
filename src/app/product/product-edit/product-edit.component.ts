import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
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
  productForm: FormGroup;
  pageTitle = 'Product Edit';

  constructor(private route: ActivatedRoute, private productService: ProductService, private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.productService.getProduct(this.id).subscribe({
      next: product => {
        this.product = product;
      },
      error: err => this.errorMessage = err
    });
    this.productForm = this.fb.group({
      productName: '',
      productCode: '',
      starRating: '',
      description: ''
    })
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
