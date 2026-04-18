const API_BASE = 'http://localhost:3001/api';

export const addToCart = async (
  product: { id: number; name: string; image: string; price: number },
  size: string,
): Promise<void> => {
  const res = await fetch(`${API_BASE}/cart/add`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include', // ✅ uses session cookie like wishlist
    body: JSON.stringify({
      productId: product.id,
      name: product.name,
      image: product.image,
      price: product.price,
      size,
    }),
  });

  if (!res.ok) throw new Error('Failed to add to cart');
};

export const getCart = async (): Promise<CartItemAPI[]> => {
  const res = await fetch(`${API_BASE}/cart`, {
    credentials: 'include', // ✅
  });
  const data = (await res.json()) as { items?: CartItemAPI[] };
  return data.items ?? [];
};

export const removeFromCart = async (itemId: string): Promise<void> => {
  await fetch(`${API_BASE}/cart/item/${itemId}`, {
    method: 'DELETE',
    credentials: 'include', // ✅
  });
};

export const updateQuantity = async (itemId: string, quantity: number): Promise<void> => {
  await fetch(`${API_BASE}/cart/item/${itemId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include', // ✅
    body: JSON.stringify({ quantity }),
  });
};

export const clearCart = async (): Promise<void> => {
  await fetch(`${API_BASE}/cart/clear`, {
    method: 'DELETE',
    credentials: 'include', // ✅
  });
};

export interface CartItemAPI {
  id: string;
  productId: number;
  name: string;
  image: string;
  price: number;
  size: string;
  quantity: number;
}
