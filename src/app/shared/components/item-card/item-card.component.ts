import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface CartItem {
  id: number;
  productId: number;
  productName: string;
  productPrice: number;
  productImageUrl?: string;
  quantity: number;
  lineTotal: number;
}

@Component({
  selector: 'app-item-card',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.css']
})
export class ItemCardComponent {
  @Input() item!: CartItem;
  @Input() showQuantityControls: boolean = true;
  @Input() showRemoveButton: boolean = true;
  @Output() quantityChange = new EventEmitter<{itemId: number, quantity: number}>();
  @Output() remove = new EventEmitter<number>();

  onQuantityChange(newQuantity: number) {
    if (newQuantity >= 1 && newQuantity <= 99) {
      this.quantityChange.emit({itemId: this.item.id, quantity: newQuantity});
    }
  }

  onRemove() {
    this.remove.emit(this.item.id);
  }

  validateQuantity() {
    if (this.item.quantity < 1) {
      this.item.quantity = 1;
      this.onQuantityChange(1);
    } else if (this.item.quantity > 99) {
      this.item.quantity = 99;
      this.onQuantityChange(99);
    }
  }

  decrementQuantity() {
    if (this.item.quantity > 1) {
      this.onQuantityChange(this.item.quantity - 1);
    }
  }

  incrementQuantity() {
    if (this.item.quantity < 99) {
      this.onQuantityChange(this.item.quantity + 1);
    }
  }
}
