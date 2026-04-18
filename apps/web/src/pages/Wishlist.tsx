import React, { useEffect, useState } from 'react';
import { Product } from '../types/product';
import { getWishlist, removeFromWishlist } from '../services/wishlistService';
import { useNavigate } from 'react-router-dom';
import { X, Heart, ArrowRight } from 'lucide-react';

const Wishlist: React.FC = () => {
  const [items, setItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWishlist = async () => {
      const data = await getWishlist();
      setItems(data);
      setLoading(false);
    };
    void fetchWishlist();
  }, []);

  const handleRemove = async (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
    try {
      await removeFromWishlist(id);
    } catch {
      const data = await getWishlist();
      setItems(data);
    }
  };

  const handleGoToItem = (product: Product) => {
    void navigate('/productdetail', { state: product });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center mt-16">
        <p className="text-gray-400 text-sm animate-pulse">Loading wishlist...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white px-4 md:px-30 py-10 max-w-7xl mx-auto mt-16">
      <div className="flex items-center gap-3 mb-10">
        <Heart className="text-red-500" size={28} />
        <h1 className="text-3xl font-semibold">My Wishlist</h1>
      </div>

      {items.length === 0 ? (
        <p className="text-gray-500">No items in wishlist</p>
      ) : (
        <div>
          <div className="hidden md:grid grid-cols-12 text-gray-500 text-sm border-b pb-3 mb-6">
            <div className="col-span-7">PRODUCT</div>
            <div className="col-span-3 text-center">ACTION</div>
            <div className="col-span-2 text-right">PRICE</div>
          </div>

          <div className="space-y-8">
            {items.map((product) => (
              <div
                key={product.id}
                className="border-b pb-6 md:border-none md:grid md:grid-cols-12 md:items-center md:gap-4"
              >
                {/* MOBILE */}
                <div className="flex gap-4 md:hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-20 h-24 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h2 className="font-medium text-gray-800 text-sm">{product.name}</h2>
                    <p className="text-gray-600 text-sm mt-1">₹{product.price}</p>
                    <p className="text-xs text-gray-500">Delivery time: 4-7 working days</p>
                    <div className="flex items-center justify-between mt-3">
                      <button
                        onClick={() => {
                          handleGoToItem(product);
                        }}
                        className="primary-color text-white px-3 py-1 rounded text-xs flex items-center gap-1"
                      >
                        Go to Item <ArrowRight size={14} />
                      </button>
                      <button
                        onClick={() => {
                          void handleRemove(product.id);
                        }}
                        className="text-gray-400"
                      >
                        <X size={18} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* DESKTOP */}
                <div className="hidden md:flex md:col-span-7 gap-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-24 h-28 object-cover rounded"
                  />
                  <div>
                    <h2 className="font-medium text-gray-800">{product.name}</h2>
                    <p className="text-gray-500 text-sm mt-1">Delivery time: 4-7 working days</p>
                  </div>
                </div>

                <div className="hidden md:flex md:col-span-3 justify-center items-center gap-3">
                  <button
                    onClick={() => {
                      handleGoToItem(product);
                    }}
                    className="primary-color text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2"
                  >
                    Go to Item <ArrowRight size={16} />
                  </button>
                  <button
                    onClick={() => {
                      void handleRemove(product.id);
                    }}
                    className="text-gray-400 hover:text-red-500"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="hidden md:block md:col-span-2 text-right font-semibold text-lg">
                  ₹{product.price}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Wishlist;
