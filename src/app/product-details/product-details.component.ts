import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from '../products/IProduct';
import { ProductService } from '../products/product.service';
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

  constructor(private route: ActivatedRoute, private productService: ProductService) { }

  toggleImage(): void {
    this.showImage = !this.showImage;
  };

  ngOnInit(): void {
    let id: number = +this.route.snapshot.paramMap.get('id');
    this.productService.getProducts().subscribe({
      next: products => {
        this.product = products.find(product => product.productId === id);
      },
      error: err => this.errorMessage = err
    });
  }

  onRatingClicked(rating: number): void {
    this.rating = ': ' + rating;
  }
}
