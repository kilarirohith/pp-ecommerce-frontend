import { Product } from './product.model';

export interface OrderItem {
  id: number;
  orderId: number;
  productId: number;
  product: Product;
  quantity: number;
  unitPrice: number;
}

export interface Order {
  id: number;
  userId: number;
  createdAt: string;
  items: OrderItem[];
}
