import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from 'src/app/shared/IProduct';
import { ProductService } from 'src/app/shared/product.service';
import { NumberValidators } from 'src/app/shared/number.validator';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'pm-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})

export class ProductEditComponent implements OnInit {
  id: number;
  product: IProduct;
  errorMessage: string;
  productForm: FormGroup;
  pageTitle: string;
  private sub: Subscription;

  constructor(private route: ActivatedRoute, private productService: ProductService, private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.sub = this.route.paramMap.subscribe(
      params => {
        this.id = +params.get('id');
        this.getProduct(this.id);
      }
    )

    this.productForm = this.fb.group({
      productName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      productCode: ['', Validators.required],
      starRating: ['', NumberValidators.range(1, 5)],
      description: ''
    })
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  deleteProduct(): void {
    if(confirm(`Really delete product: ${this.product.productName}?`))
    this.productService.deleteProduct(this.id).subscribe({
      next: () => this.onSaveComplete(),
      error: err => this.errorMessage = err
    });
  }

  onCancel(): void {
    this.router.navigate(['/products']);
  }

  saveProduct(): void {
    if (this.productForm.valid) {
      if (this.productForm.dirty) {
        const editedProduct: IProduct = { ...this.product, ...this.productForm.value };
        if (editedProduct.id === 0) {
          this.productService.createProduct(editedProduct)
            .subscribe({
              next: () => this.onSaveComplete(),
              error: err => this.errorMessage = err
            });
        }
        else {
          this.productService.updateProduct(editedProduct)
            .subscribe({
              next: () => this.onSaveComplete(),
              error: err => this.errorMessage = err
            });
        }
      }
      else {
        this.onSaveComplete();
      }
    }
    else {
      this.errorMessage = 'please correct the validation error';
    }
  }

  onSaveComplete() {
    this.productForm.reset();
    this.router.navigate(['/products']);
  }

  getProduct(id: number): void {
    this.productService.getProduct(id).subscribe({
      next: (product: IProduct) =>
        this.displayProduct(product),
      error: err => this.errorMessage = err
    });
  }

  displayProduct(product: IProduct): void {
    if (this.productForm) { //clearing all form validation states
      this.productForm.reset();
    }

    this.product = product;

    if (this.product.id === 0) {
      this.pageTitle = 'Add Product';
    }
    else {
      this.pageTitle = `Edit Product: ${this.product.productName}`;
      this.productForm.patchValue({
        productName: this.product.productName,
        productCode: this.product.productCode,
        starRating: this.product.starRating,
        description: this.product.description
      });
    }
  }
}
