import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import {
  deleteLocalProduct,
  getLocalProductsByCategory,
  LocalProduct,
} from '../../services/localProductService';
import { CATEGORIES } from '../../types/admin.types';
import { Link } from 'react-router-dom';

/* React Icons */
import { FaTshirt, FaRupeeSign } from 'react-icons/fa';
import { MdCheckCircle, MdNewReleases, MdDelete } from 'react-icons/md';

const AdminDashboard: React.FC = () => {
  const [products, setProducts] = useState<LocalProduct[]>([]);
  const [category, setCategory] = useState('');

  useEffect(() => {
    setProducts(getLocalProductsByCategory(category));
  }, [category]);

  const handleDelete = (id: number) => {
    if (!window.confirm('Delete this product?')) return;
    deleteLocalProduct(id);
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const totalValue = products.reduce((sum, p) => sum + p.price, 0);

  return (
    <AdminLayout>
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total Products', value: products.length, icon: <FaTshirt size={22} /> },
          {
            label: 'Total Value',
            value: `₹${totalValue.toLocaleString()}`,
            icon: <FaRupeeSign size={22} />,
          },
          {
            label: 'In Stock',
            value: products.filter((p) => p.inStock).length,
            icon: <MdCheckCircle size={22} />,
          },
          {
            label: 'New Arrivals',
            value: products.filter((p) => p.isNew).length,
            icon: <MdNewReleases size={22} />,
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm"
          >
            <p className="text-2xl text-pink-500">{stat.icon}</p>
            <p className="text-xl font-bold text-gray-800 mt-1">{stat.value}</p>
            <p className="text-xs text-gray-400">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold text-gray-800">All Products ({products.length})</h1>
        <Link
          to="/admin/upload"
          className="bg-pink-500 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-pink-600 transition"
        >
          + Add Product
        </Link>
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 mb-5 flex-wrap">
        <button
          onClick={() => { setCategory(''); }}
          className={`px-3 py-1 rounded-full text-xs font-medium border transition ${
            category === ''
              ? 'bg-pink-500 text-white border-pink-500'
              : 'border-gray-200 text-gray-600'
          }`}
        >
          All
        </button>
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => { setCategory(cat); }}
            className={`px-3 py-1 rounded-full text-xs font-medium border transition ${
              category === cat
                ? 'bg-pink-500 text-white border-pink-500'
                : 'border-gray-200 text-gray-600'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Empty State */}
      {products.length === 0 && (
        <div className="text-center py-20">
          <p className="text-4xl mb-3">📦</p>
          <p className="text-gray-500 font-medium">No products yet</p>
          <p className="text-gray-400 text-sm mb-4">Add your first product</p>
          <Link
            to="/admin/upload"
            className="bg-pink-500 text-white px-6 py-2 rounded-xl text-sm font-medium"
          >
            + Add First Product
          </Link>
        </div>
      )}

      {/* Product Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden group"
          >
            <div className="relative">
              <img src={product.image} alt={product.name} className="w-full h-36 object-cover" />

              {product.isNew && (
                <span className="absolute top-2 left-2 bg-green-500 text-white text-[9px] px-1.5 py-0.5 rounded-full">
                  NEW
                </span>
              )}

              {product.discountPercent && (
                <span className="absolute top-2 right-2 bg-red-500 text-white text-[9px] px-1.5 py-0.5 rounded-full">
                  {product.discountPercent}% OFF
                </span>
              )}

              <button
                onClick={() => { handleDelete(product.id); }}
                className="absolute bottom-2 right-2 bg-red-500 text-white rounded-full
                           w-7 h-7 text-xs hidden group-hover:flex items-center justify-center"
              >
                <MdDelete size={16} />
              </button>
            </div>

            <div className="p-3">
              <p className="text-sm font-medium text-gray-800 truncate">{product.name}</p>

              <div className="flex items-center gap-1 mt-1">
                <p className="text-sm font-bold text-gray-900">₹{product.price}</p>
                {product.originalPrice && (
                  <p className="text-xs text-gray-400 line-through">₹{product.originalPrice}</p>
                )}
              </div>

              <div className="flex flex-wrap gap-1 mt-2">
                {product.sizes.map((s) => (
                  <span
                    key={s}
                    className="text-[9px] border border-gray-200 px-1.5 py-0.5 rounded text-gray-500"
                  >
                    {s}
                  </span>
                ))}
              </div>

              <p className="text-[10px] text-pink-400 mt-1 capitalize">{product.category}</p>
            </div>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard