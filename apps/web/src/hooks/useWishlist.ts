import { Product } from '../types/product';
import {
  addToWishlist,
  removeFromWishlist,
  isWishlisted as checkWishlisted,
} from '../services/wishlistService';

export const useWishlist = () => {
  const toggleWishlist = async (product: Product): Promise<void> => {
    const wishlisted = await checkWishlisted(product.id);
    if (wishlisted) {
      await removeFromWishlist(product.id);
    } else {
      await addToWishlist(product);
    }
  };

  return {
    toggleWishlist,
    isWishlisted: checkWishlisted, // returns the async function
  };
};
