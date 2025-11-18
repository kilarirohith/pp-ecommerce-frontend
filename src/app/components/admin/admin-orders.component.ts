import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { Order } from '../../models/order.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule]
})
export class AdminOrdersComponent implements OnInit {
  orders: Order[] = [];
  filteredOrders: Order[] = [];
  loading = false;
  error = '';
  searchTerm = '';
  selectedStatus = 'all';

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(page: number = 1): void {
    this.loading = true;
    this.error = '';

    // ✅ Pass searchTerm to backend so LINQ search runs on the server
    this.orderService.getAdminOrders(this.searchTerm, page, 10).subscribe({
      next: res => {
        this.orders = res.items;   // res is PaginatedResult<Order>
        this.applyFilters();       // apply status filter on client
        this.loading = false;
      },
      error: (err) => {
        console.error('Load orders error:', err);
        this.error = 'Failed to load orders. Please try again.';
        this.loading = false;
      }
    });
  }

  // Called when user types in the search input
  onSearchChange(): void {
    this.loadOrders(1);  // reload from API using current searchTerm
  }

  applyFilters(): void {
    let filtered = this.orders;

    // Filter by status (client-side)
    if (this.selectedStatus !== 'all') {
      filtered = filtered.filter(order => order.status.toLowerCase() === this.selectedStatus);
    }

    // ⛔️ IMPORTANT: Do NOT filter by search term here,
    // because backend already applied search via LINQ.
    // We keep only status filtering on the client.

    this.filteredOrders = filtered;
  }

  filterByStatus(status: string): void {
    this.selectedStatus = status;
    this.applyFilters();
  }

  clearFilters(): void {
    this.searchTerm = '';
    this.selectedStatus = 'all';
    this.loadOrders(1); // reload all orders from backend
  }

  trackByOrderId(index: number, order: Order): number {
    return order.id;
  }

  getTotalRevenue(): number {
    return this.orders.reduce((total, order) => total + order.totalAmount, 0);
  }

  getPendingOrdersCount(): number {
    return this.orders.filter(order => order.status.toLowerCase() === 'pending').length;
  }

  getDeliveredOrdersCount(): number {
    return this.orders.filter(order => order.status.toLowerCase() === 'delivered').length;
  }

  getStatusClass(status: string): string {
    return status.toLowerCase();
  }

  getStatusText(status: string): string {
    return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
  }

  updateOrderStatus(orderId: number, event: any): void {
    const newStatus = event.target.value;
    // Here you would typically call a service to update the order status in the backend
    console.log(`Updating order ${orderId} to status: ${newStatus}`);

    // For now, just update the local array
    const order = this.orders.find(o => o.id === orderId);
    if (order) {
      order.status = newStatus;
      this.applyFilters();
    }
  }

  deleteOrder(orderId: number): void {
    if (confirm('Are you sure you want to delete this order? This will restore product stock.')) {
      this.orderService.deleteOrder(orderId).subscribe({
        next: () => {
          this.orders = this.orders.filter(o => o.id !== orderId);
          this.applyFilters();
        },
        error: (err) => {
          console.error('Delete order error:', err);
          // Failed to delete order - silent error handling
        }
      });
    }
  }

  calculateTax(amount: number): number {
    return Math.round(amount * 0.18); // 18% GST
  }

  calculateGrandTotal(amount: number): number {
    return amount + this.calculateTax(amount);
  }

  viewOrderDetails(orderId: number): void {
    console.log(`Viewing details for order ${orderId}`);
    // Navigate to order details page or open modal
  }

  printOrder(orderId: number): void {
    console.log(`Printing order ${orderId}`);
    // Implement print functionality
    window.print();
  }
}
