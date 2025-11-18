import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  stock: number;
  imageUrl?: string;
}

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input() product!: Product;
  @Input() showQuickView: boolean = true;
  @Input() showAddToCart: boolean = true;
  @Output() quickView = new EventEmitter<Product>();
  @Output() addToCart = new EventEmitter<Product>();

  onQuickView() {
    this.quickView.emit(this.product);
  }

  onAddToCart() {
    this.addToCart.emit(this.product);
  }

  getStockStatus(): string {
    if (this.product.stock === 0) return 'out-of-stock';
    if (this.product.stock < 10) return 'low-stock';
    return 'in-stock';
  }

  getStockText(): string {
    if (this.product.stock === 0) return 'Out of Stock';
    if (this.product.stock < 10) return `Low Stock (${this.product.stock})`;
    return `In Stock (${this.product.stock})`;
  }
}
