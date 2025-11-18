import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { Order } from '../../models/order.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner/loading-spinner.component';
import { ErrorMessageComponent } from '../../shared/components/error-message/error-message.component';
import { EmptyStateComponent } from '../../shared/components/empty-state/empty-state.component';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatIconModule,
    LoadingSpinnerComponent,
    ErrorMessageComponent,
    EmptyStateComponent
  ]
})
export class MyOrdersComponent implements OnInit {
  orders: Order[] = [];
  loading = false;
  error: string | null = null;

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(page: number = 1): void {
    this.loading = true;
    this.error = null;
    this.orderService.getMyOrders('', page, 10).subscribe({
      next: (res) => {
        this.orders = res.items;
        this.loading = false;
      },
      error: (err) => {
        console.error('Orders load error:', err);
        this.error = 'Failed to load orders. Please try again.';
        this.loading = false;
      }
    });
  }

  trackByOrderId(index: number, order: Order): number {
    return order.id;
  }

  getStatusClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'pending': return 'status-pending';
      case 'processing': return 'status-processing';
      case 'shipped': return 'status-shipped';
      case 'delivered': return 'status-delivered';
      case 'cancelled': return 'status-cancelled';
      default: return 'status-default';
    }
  }

  getStatusText(status: string): string {
    switch (status.toLowerCase()) {
      case 'pending': return 'Pending';
      case 'processing': return 'Processing';
      case 'shipped': return 'Shipped';
      case 'delivered': return 'Delivered';
      case 'cancelled': return 'Cancelled';
      default: return status;
    }
  }

  calculateTax(amount: number): number {
    return Math.round(amount * 0.18); // 18% GST
  }

  calculateGrandTotal(amount: number): number {
    return amount + this.calculateTax(amount);
  }

  reorder(order: Order): void {
    // TODO: Implement reorder functionality
    // Reorder functionality coming soon - no alert needed
  }

  deleteOrder(orderId: number): void {
    if (confirm('Are you sure you want to delete this order? This action cannot be undone.')) {
      this.orderService.deleteOrder(orderId).subscribe({
        next: () => {
          this.orders = this.orders.filter(o => o.id !== orderId);
        },
        error: (err) => {
          console.error('Delete order error:', err);
          // Failed to delete order - silent error handling
        }
      });
    }
  }

  trackOrder(orderId: number): void {
    // TODO: Implement order tracking
    // Tracking order feature coming soon - no alert needed
  }
}
