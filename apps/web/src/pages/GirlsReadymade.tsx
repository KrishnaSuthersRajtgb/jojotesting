import React, { useState, useMemo } from 'react';
import ProductCard from '../components/ProductCard';
import { getGirlsReadymadeProducts } from '../services/productService';
import { getLocalProducts } from '../services/localProductService';
import Slider from '@mui/material/Slider';
import { SlidersHorizontal } from 'lucide-react';

const GirlsReadymade: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [price, setPrice] = useState<number[]>([0, 5000]);
  const [tempPrice, setTempPrice] = useState<number[]>([0, 5000]);
  const [showFilter, setShowFilter] = useState(false);
  const categories = ['All', 'Kurti', 'Gown', 'Top', 'Dress'];

  const filteredProducts = useMemo(() => {
    const allProducts = [
      ...getLocalProducts(),
      ...getGirlsReadymadeProducts(),
    ];
    return allProducts.filter((product) => {
      const matchCategory =
        selectedCategory === 'All' ||
        product.name.toLowerCase().includes(selectedCategory.toLowerCase());
      const matchPrice = product.price >= price[0] && product.price <= price[1];
      return matchCategory && matchPrice;
    });
  }, [selectedCategory, price]);

  return (
    <div className="h-screen bg-gray-50 flex overflow-hidden">
      <div className="hidden md:block w-64 bg-white p-6 shadow-md overflow-y-auto">
        <h2 className="text-xl font-bold mb-6">Filters</h2>
        <h3 className="font-semibold mb-3">Category</h3>
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => { setSelectedCategory(cat); }}
              className={`px-3 py-1 rounded-full border text-sm ${
                selectedCategory === cat
                  ? 'primary-color text-white'
                  : 'bg-white text-gray-600 border-gray-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <h3 className="font-semibold mb-3">Price</h3>
        <Slider
          value={tempPrice}
          onChange={(e, newValue) => { setTempPrice(newValue); }}
          onChangeCommitted={(e, newValue) => { setPrice(newValue); }}
          valueLabelDisplay="auto"
          min={0}
          max={5000}
        />
        <div className="flex justify-between text-sm mt-2">
          <span>₹{tempPrice[0]}</span>
          <span>₹{tempPrice[1]}</span>
        </div>
      </div>

      <div className="flex-1 p-6 md:p-8 overflow-y-auto">
        <h1 className="text-2xl md:text-3xl font-bold mb-8">Girls Readymade Collection</h1>
        {filteredProducts.length === 0 ? (
          <p>No products found.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div key={product.id} className="aspect-[3/4]">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="md:hidden fixed bottom-6 right-6 z-40">
        <button
          onClick={() => { setShowFilter(true); }}
          className="primary-color text-white p-4 rounded-full shadow-lg"
        >
          <SlidersHorizontal size={20} />
        </button>
      </div>

      {showFilter && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-end md:hidden">
          <div className="bg-white w-full p-6 rounded-t-2xl animate-slideUp">
            <div className="flex justify-between mb-6">
              <h2 className="text-xl font-bold">Filters</h2>
              <button onClick={() => { setShowFilter(false); }} className="text-gray-500">
                Close
              </button>
            </div>
            <h3 className="font-semibold mb-3">Category</h3>
            <div className="flex flex-wrap gap-2 mb-8">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => { setSelectedCategory(cat); }}
                  className={`px-3 py-1 rounded-full border text-sm ${
                    selectedCategory === cat
                      ? 'primary-color text-white'
                      : 'bg-white text-gray-600 border-gray-300'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <h3 className="font-semibold mb-3">Price</h3>
            <Slider
              value={tempPrice}
              onChange={(e, newValue) => { setTempPrice(newValue); }}
              onChangeCommitted={(e, newValue) => { setPrice(newValue); }}
              valueLabelDisplay="auto"
              min={0}
              max={5000}
            />
            <div className="flex justify-between text-sm mt-2 mb-6">
              <span>₹{tempPrice[0]}</span>
              <span>₹{tempPrice[1]}</span>
            </div>
            <button
              onClick={() => {
                setPrice(tempPrice);
                setShowFilter(false);
              }}
              className="primary-color text-white w-full py-2 rounded-lg"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GirlsReadymade;