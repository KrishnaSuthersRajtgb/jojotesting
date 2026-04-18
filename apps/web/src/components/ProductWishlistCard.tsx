import React, { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';
import { Product } from '../types/product';
import { useWishlist } from '../hooks/useWishlist';

interface Props {
  product: Product;
}

const ProductWishlistCard: React.FC<Props> = ({ product }) => {
  const { toggleWishlist, isWishlisted } = useWishlist();

  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const check = async () => {
      const status = await isWishlisted(product.id);
      if (!cancelled) setLiked(status);
    };
    void check();
    return () => {
      cancelled = true;
    };
  }, [product.id, isWishlisted]);

  const handleWishlist = async () => {
    if (loading) return;
    setLoading(true);
    setLiked((prev) => !prev);
    try {
      await toggleWishlist(product);
    } catch {
      setLiked((prev) => !prev);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden relative">
      <button
        onClick={() => {
          void handleWishlist();
        }}
        disabled={loading}
        className="absolute top-3 right-3 bg-white p-2 rounded-full shadow"
      >
        <Heart size={18} className={liked ? 'fill-red-500 text-red-500' : 'text-gray-500'} />
      </button>

      <img src={product.image} alt={product.name} className="w-full h-56 object-cover" />

      <div className="p-3">
        <h3 className="text-sm font-medium">{product.name}</h3>
        <p className="text-blue-600 font-semibold text-sm">₹{product.price}</p>
      </div>
    </div>
  );
};

export default ProductWishlistCard;
