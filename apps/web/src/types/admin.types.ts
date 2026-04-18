export type ProductCategory =
  | 'dresses'
  | 'tops'
  | 'kurtis'
  | 'sarees'
  | 'lehengas'
  | 'suits'
  | 'uncategorized';

export const CATEGORIES: ProductCategory[] = [
  'dresses',
  'tops',
  'kurtis',
  'sarees',
  'lehengas',
  'suits',
  'uncategorized',
];

export interface AdminProduct {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  discountPercent?: number;
  category: ProductCategory;
  sizes: string[];
  description?: string;
  image: string; // main image URL (S3/local preview)
  images: string[]; // all image URLs
  inStock: boolean;
  isNew: boolean;
  isTrending: boolean;
  rating: number;
  reviewCount: number;
  createdAt: string;
}

export interface ProductForm {
  name: string;
  price: string;
  originalPrice: string;
  sizes: string[];
  description: string;
}
