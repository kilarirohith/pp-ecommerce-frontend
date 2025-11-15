import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../core/services/product.service';
import { AuthService } from '../../../core/services/auth.service';
import { CartService } from '../../../core/services/cart.service';
import { Product } from '../../../core/models/product.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css'],
  standalone: false
})
export class ProductsListComponent implements OnInit {
  products: Product[] = [];
  isAdmin = false;

  constructor(
    private productService: ProductService,
    private auth: AuthService,
    private cart: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProducts();
    this.auth.currentUser$.subscribe(user => {
      this.isAdmin = user?.role === 'Admin';
    });
  }

  loadProducts() {
    this.productService.getProducts().subscribe(res => this.products = res);
  }

  addToCart(product: Product) {
    this.cart.addItem(product);
    alert('Added to cart');
  }

  deleteProduct(id?: number) {
    if (!id) return;
    if (!confirm('Delete product?')) return;

    this.productService.deleteProduct(id).subscribe(() => this.loadProducts());
  }

  goToCreate() {
    this.router.navigate(['/admin/products/new']);
  }

  editProduct(id?: number) {
    if (!id) return;
    this.router.navigate(['/admin/products', id, 'edit']);
  }
}
