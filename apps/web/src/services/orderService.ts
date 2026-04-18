import { CartItem } from '../types/cart';
import { Order } from '../types/order';

const ORDER_KEY = 'order';

/* CREATE ORDER */
export const createOrder = (items: CartItem[]): Order => {
  const order: Order = {
    id: generateOrderId(),
    items: items,
    status: 'Order Placed',
    estimatedDelivery: getEstimatedDelivery(),
  };

  localStorage.setItem(ORDER_KEY, JSON.stringify(order));
  return order;
};

/* GET ORDER */
export const getOrder = (): Order | null => {
  const data = localStorage.getItem(ORDER_KEY);
  if (!data) return null;
  return JSON.parse(data) as Order;
};

/* UPDATE ORDER STATUS */
export const updateOrderStatus = (status: string) => {
  const order = getOrder();
  if (!order) return;

  order.status = status;
  localStorage.setItem(ORDER_KEY, JSON.stringify(order));
};

/* GENERATE ORDER ID (WITH CURRENT DATE) */
const generateOrderId = () => {
  const now = new Date();

  // Format: YYYY-MM-DD
  const date = now.toLocaleDateString('en-CA');

  // Random 4-digit number
  const random = Math.floor(1000 + Math.random() * 9000);

  return `ORD-${date}-${String(random)}`;
};

/* DELIVERY DATE */
const getEstimatedDelivery = () => {
  const date = new Date();
  date.setDate(date.getDate() + 5);

  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};