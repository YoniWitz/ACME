import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from '../../shared/IProduct';
import { ProductService } from '../../shared/product.service';

@Component({
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
  providers: [ProductService]
})
export class ProductDetailsComponent implements OnInit {
  product: IProduct;
  errorMessage: string = '';
  showImage: boolean = false;
  imageWidth: number = 50;
  imageMargin: number = 2;
  rating: string = ' ';

  constructor(private route: ActivatedRoute, private productService: ProductService, private router: Router) { }

  toggleImage(): void {
    this.showImage = !this.showImage;
  };

  ngOnInit(): void {
    let id: number = +this.route.snapshot.paramMap.get('id');
    this.productService.getProduct(id).subscribe({
      next: product => {
        this.product = product;
      },
      error: err => this.errorMessage = err
    });
  }

  onRatingClicked(rating: number): void {
    this.rating = ': ' + rating;
  }

  onBack(): void {
    this.router.navigate(['/products']);
  }
}
