export interface CartItem {
  id: number;
  productId: number;
  productName: string;
  productPrice: number;
  quantity: number;
  lineTotal: number;
  productImageUrl?: string;
}

export interface Cart {
  id: number;
  items: CartItem[];
  totalAmount: number;
}
