import { Component } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { OrderService } from '../../core/services/order.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  standalone: false
})
export class CartComponent {
  constructor(
    public cart: CartService,
    private orderService: OrderService
  ) {}

  removeItem(id?: number) {
    this.cart.removeItem(id);
  }

  checkout() {
    const items = this.cart.getItems().map(i => ({
      productId: i.product.id!,
      quantity: i.quantity
    }));
    if (items.length === 0) {
      alert('Cart is empty');
      return;
    }

    this.orderService.createOrder(items).subscribe(() => {
      alert('Order placed!');
      this.cart.clear();
    });
  }
}
