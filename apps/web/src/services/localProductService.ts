import { Product } from '../types/product';

const KEY = 'jojo_products';

export interface LocalProduct extends Product {
  sizes: string[];
  images: string[];
  originalPrice?: number;
  discountPercent?: number;
  inStock: boolean;
  isNew: boolean;
  createdAt: string;
}

export const getLocalProducts = (): LocalProduct[] => {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as LocalProduct[]) : [];
  } catch {
    return [];
  }
};

export const saveLocalProduct = (product: LocalProduct): void => {
  const existing = getLocalProducts();
  localStorage.setItem(KEY, JSON.stringify([product, ...existing]));
};

export const deleteLocalProduct = (id: number): void => {
  const existing = getLocalProducts();
  localStorage.setItem(KEY, JSON.stringify(existing.filter((p) => p.id !== id)));
};

export const getLocalProductsByCategory = (category = ''): LocalProduct[] => {
  const all = getLocalProducts();
  return category ? all.filter((p) => p.category === category) : all;
};

export const buildProduct = (
  form: {
    name: string;
    price: string;
    originalPrice: string;
    sizes: string[];
    description: string;
  },
  category: string,
  imageUrls: string[],
): LocalProduct => {
  const price = Number(form.price);
  const originalPrice = form.originalPrice ? Number(form.originalPrice) : undefined;
  const discountPercent = originalPrice
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : undefined;

  return {
    id: Date.now(),
    name: form.name,
    price,
    originalPrice,
    discountPercent,
    category,
    description: form.description,
    image: imageUrls[0] || '',
    images: imageUrls,
    sizes: form.sizes,
    inStock: true,
    isNew: true,
    createdAt: new Date().toISOString(),
  };
};