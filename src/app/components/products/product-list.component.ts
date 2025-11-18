import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner/loading-spinner.component';
import { ErrorMessageComponent } from '../../shared/components/error-message/error-message.component';
import { EmptyStateComponent } from '../../shared/components/empty-state/empty-state.component';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';
import { PaginationComponent } from '../../shared/components/pagination/pagination.component';

interface PaginatedResult<T> {
  items: T[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    LoadingSpinnerComponent,
    ErrorMessageComponent,
    EmptyStateComponent,
    ProductCardComponent,
    PaginationComponent
  ]
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  loading = false;
  error = '';
  searchTerm = '';
  currentPage = 1;
  pageSize = 12;
  totalCount = 0;
  totalPages = 0;
  hasNextPage = false;
  hasPreviousPage = false;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    public auth: AuthService
  ) {}

  ngOnInit(): void {
    this.load();
  }

  load(page: number = 1) {
    this.loading = true;
    this.currentPage = page;
    this.productService.getAll(this.searchTerm, page, this.pageSize).subscribe({
      next: (res: PaginatedResult<Product>) => {
        this.products = res.items;
        this.totalCount = res.totalCount;
        this.totalPages = res.totalPages;
        this.hasNextPage = res.hasNextPage;
        this.hasPreviousPage = res.hasPreviousPage;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load products';
        this.loading = false;
      }
    });
  }

  loadProducts() {
    this.load(1);
  }

  searchProducts() {
    this.load(1);
  }

  clearSearch() {
    this.searchTerm = '';
    this.load(1);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.load(page);
    }
  }

  getPageNumbers(): number[] {
    const pages: number[] = [];
    const maxPagesToShow = 5;
    let startPage = Math.max(1, this.currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(this.totalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  }

  addToCart(product: Product) {
    if (!this.auth.isLoggedIn) {
      this.error = 'Please login to add to cart.';
      return;
    }

    if (product.stock === 0) {
      this.error = 'Product is out of stock.';
      return;
    }

    this.cartService.addToCart(product.id, 1).subscribe({
      next: () => {
        this.error = ''; // Clear any previous errors
      },
      error: () => {
        this.error = 'Failed to add product to cart. Please try again.';
      }
    });
  }

  viewProduct(product: Product) {
    // Navigate to product detail page
    // This will be implemented when we have routing set up
    console.log('View product:', product);
  }
}
