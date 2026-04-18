import React, { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Product } from '../types/product';
import { useWishlist } from '../hooks/useWishlist';

interface Props {
  product: Product;
}

const ProductCard: React.FC<Props> = ({ product }) => {
  const navigate = useNavigate();
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

  const handleNavigate = () => {
    void navigate('/productdetail', { state: { product } });
  };

  const handleWishlist = async (e: React.MouseEvent) => {
    e.stopPropagation();
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
    <div onClick={handleNavigate} className="cursor-pointer overflow-hidden">
      <div className="relative rounded-xl overflow-hidden">
        <img src={product.image} alt={product.name} className="w-full h-40 md:h-56 object-cover" />
        <div className="absolute bottom-3 left-3 primary-color text-black px-3 py-1 rounded-full text-sm font-semibold">
          ₹{product.price}
        </div>
        <button
          onClick={(e) => void handleWishlist(e)}
          disabled={loading}
          className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm p-2 rounded-full"
        >
          <Heart size={18} className={liked ? 'text-red-500 fill-red-500' : 'text-gray-700'} />
        </button>
      </div>
      <div className="mt-2 px-1">
        <h2 className="text-sm md:text-base font-medium text-gray-800 truncate">{product.name}</h2>
      </div>
    </div>
  );
};

export default ProductCard;
