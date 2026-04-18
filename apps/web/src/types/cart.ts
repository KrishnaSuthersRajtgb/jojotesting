import { Product } from './product';

export interface CartItem extends Product {
  size: string;
  quantity: number;
}
