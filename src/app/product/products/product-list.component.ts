import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../shared/IProduct';
import { ProductService } from '../../shared/product.service';

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  providers: [ProductService]
})

export class ProductListComponent implements OnInit {
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: products => {
        this.products = products;
        this.filteredProducts = this.products;
      },
      error: err => this.errorMessage = err
    });
  };

  toggleImage(): void {
    this.showImage = !this.showImage;
  };

  onRatingClicked(rating: number): void {
    this.pageTitle = 'Product List: ' + rating;
  }

  _listFilter: string = '';

  get listFilter(): string {
    return this._listFilter;
  }

  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredProducts = this.listFilter ?
      this.products.filter((product: IProduct) =>
        product.productName.toLowerCase().includes(this.listFilter.toLowerCase()))
      : this.products;
  }

  errorMessage: string = '';
  showImage: boolean = false;
  pageTitle: string = 'Product List';
  imageWidth: number = 50;
  imageMargin: number = 2;
  filteredProducts: IProduct[] = [];
  products: IProduct[] = [];
}