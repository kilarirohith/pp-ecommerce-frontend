export interface Permissions {
  id: number;
  userId: number;
  canViewProducts: boolean;
  canAddToCart: boolean;
  canPlaceOrder: boolean;
  canViewOwnOrders: boolean;
  canViewAllOrders: boolean;
  canManageProducts: boolean;
  canManageUsers: boolean;
}
