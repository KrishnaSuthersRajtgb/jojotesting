import { CartItem } from './cart';

export interface Order {
  id: string;
  items: CartItem[];
  status: string;
  estimatedDelivery: string;
}
