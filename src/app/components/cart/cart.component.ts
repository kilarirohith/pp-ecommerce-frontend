import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Cart } from '../../models/cart.model';
import { OrderService } from '../../services/order.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner/loading-spinner.component';
import { ErrorMessageComponent } from '../../shared/components/error-message/error-message.component';
import { EmptyStateComponent } from '../../shared/components/empty-state/empty-state.component';
import { ItemCardComponent } from '../../shared/components/item-card/item-card.component';
import { ButtonComponent } from '../../shared/components/button/button.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    LoadingSpinnerComponent,
    ErrorMessageComponent,
    EmptyStateComponent,
    ItemCardComponent,
    ButtonComponent
  ]
})
export class CartComponent implements OnInit {
  cart?: Cart;
  loading = false;
  error = '';

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.load();
  }

  loadCart(page: number = 1) {
    this.loading = true;
    this.error = '';
    this.cartService.getCart('', page, 10).subscribe({
      next: res => {
        
        this.cart = {
          id: 0, 
          items: res.items.map(item => ({
            id: item.id,
            productId: item.productId,
            productName: item.productName,
            productPrice: item.productPrice,
            quantity: item.quantity,
            lineTotal: item.lineTotal,
            productImageUrl: item.productImageUrl
          })),
          totalAmount: res.items.reduce((sum, item) => sum + item.lineTotal, 0)
        };
        this.loading = false;
      },
      error: (err) => {
        console.error('Cart load error:', err);
        this.error = 'Failed to load cart. Please try again.';
        this.loading = false;
      }
    });
  }

  load() {
    this.loadCart();
  }

  updateQuantity(itemId: number, quantity: number) {
    this.cartService.updateItem(itemId, quantity).subscribe({
      next: () => this.load(),
      error: () => {
        // Failed to update - silent error handling
      }
    });
  }

  remove(itemId: number) {
    this.cartService.removeItem(itemId).subscribe({
      next: () => this.load(),
      error: () => {
        // Failed to remove - silent error handling
      }
    });
  }

  clear() {
    if (!confirm('Clear cart?')) return;
    this.cartService.clearCart().subscribe({
      next: () => this.load(),
      error: () => {
        // Failed to clear cart - silent error handling
      }
    });
  }

  trackByItemId(index: number, item: any): number {
    return item.id;
  }

  validateQuantity(item: any) {
    if (item.quantity < 1) {
      item.quantity = 1;
      this.updateQuantity(item.id, 1);
    } else if (item.quantity > 99) {
      item.quantity = 99;
      this.updateQuantity(item.id, 99);
    }
  }

  calculateTax(): number {
    if (!this.cart) return 0;
    // Assuming 18% GST
    return Math.round(this.cart.totalAmount * 0.18);
  }

  calculateGrandTotal(): number {
    if (!this.cart) return 0;
    return this.cart.totalAmount + this.calculateTax();
  }

  placeOrder() {
    if (!this.cart || !this.cart.items.length) {
      // Cart is empty - silent handling
      return;
    }

    this.orderService.placeOrder().subscribe({
      next: res => {
        this.router.navigateByUrl('/orders');
      },
      error: () => {
        // Failed to place order - silent error handling
      }
    });
  }
}
