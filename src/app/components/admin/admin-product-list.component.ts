import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner/loading-spinner.component';
import { ErrorMessageComponent } from '../../shared/components/error-message/error-message.component';
import { EmptyStateComponent } from '../../shared/components/empty-state/empty-state.component';

@Component({
  selector: 'app-admin-product-list',
  templateUrl: './admin-product-list.component.html',
  styleUrls: ['./admin-product-list.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    LoadingSpinnerComponent,
    ErrorMessageComponent,
    EmptyStateComponent
  ]
})
export class AdminProductListComponent implements OnInit {
  products: Product[] = [];
  loading = false;
  error = '';

  constructor(
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.loading = true;
    this.error = '';
    this.productService.getAll('', 1, 1000).subscribe({
      next: res => {
        this.products = res.items;
        this.loading = false;
      },
      error: (err) => {
        console.error('Load products error:', err);
        this.error = 'Failed to load products. Please try again.';
        this.loading = false;
      }
    });
  }

  loadProducts() {
    this.load();
  }

  trackByProductId(index: number, product: Product): number {
    return product.id;
  }

  getTotalValue(): number {
    return this.products.reduce((total, product) => total + (product.price * product.stock), 0);
  }

  getLowStockCount(): number {
    return this.products.filter(product => product.stock < 10).length;
  }

  getInStockCount(): number {
    return this.products.filter(product => product.stock > 0).length;
  }

  getStockClass(stock: number): string {
    if (stock === 0) return 'out-of-stock';
    if (stock < 10) return 'low-stock';
    if (stock < 50) return 'medium-stock';
    return 'high-stock';
  }

  create() {
    this.router.navigate(['/admin/products/new']);
  }

  edit(id: number) {
    this.router.navigate(['/admin/products', id]);
  }

  delete(id: number) {
    if (!confirm('Delete this product?')) return;
    this.productService.delete(id).subscribe({
      next: () => {
        this.error = ''; // Clear any previous errors
        this.load(); // Reload the list
      },
      error: (err) => {
        console.error('Delete error:', err);
        if (err.error && err.error.message) {
          this.error = err.error.message;
        } else {
          this.error = 'Failed to delete product. Please try again.';
        }
      }
    });
  }
}
