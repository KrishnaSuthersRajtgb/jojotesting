import { Product } from '../types/product';

const BASE = '/api/wishlist';

export const getWishlist = async (): Promise<Product[]> => {
  const res = await fetch(BASE, { credentials: 'include' });
  if (!res.ok) return [];
  return res.json() as Promise<Product[]>;
};

export const addToWishlist = async (product: Product): Promise<void> => {
  await fetch(BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ product }),
  });
};

export const removeFromWishlist = async (id: number): Promise<void> => {
  await fetch(`${BASE}/${String(id)}`, {
    method: 'DELETE',
    credentials: 'include',
  });
};

export const isWishlisted = async (id: number): Promise<boolean> => {
  const res = await fetch(`${BASE}/${String(id)}/check`, {
    credentials: 'include',
  });
  if (!res.ok) return false;
  const data = (await res.json()) as { wishlisted: boolean };
  return data.wishlisted;
};
