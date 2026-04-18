import React from 'react';
import { getGirlsReadymadeProducts } from '../services/productService';
import { getLocalProducts } from '../services/localProductService';
import { Link, useNavigate } from 'react-router-dom';
import { Product } from '../types/product';
import { Scissors, Sparkles, ArrowRight } from 'lucide-react';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const products = [...getLocalProducts(), ...getGirlsReadymadeProducts()].slice(0, 18);

  const handleProductClick = (product: Product) => {
    void navigate(`/productdetail/${String(product.id)}`, {
      state: { product },
    });
  };

  return (
    <div className="w-full bg-stone-50 min-h-screen">
      {/* ================= HERO SECTION ================= */}
      <section className="px-4 pt-4 pb-2 mt-18">
        <div className="relative bg-gradient-to-br from-rose-100 via-pink-50 to-purple-100 rounded-3xl overflow-hidden px-5 py-7 md:py-12 md:px-10">
          <div className="absolute top-0 right-0 w-48 h-48 bg-pink-200 rounded-full -translate-y-1/2 translate-x-1/4 opacity-40 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-200 rounded-full translate-y-1/2 -translate-x-1/4 opacity-30 pointer-events-none" />

          <div className="flex flex-row items-center justify-between gap-4 relative z-10">
            <div className="w-1/2">
              <div className="inline-flex items-center gap-1.5 bg-white/70 backdrop-blur-sm text-rose-600 text-[10px] md:text-xs font-semibold px-3 py-1 rounded-full mb-3">
                <Scissors size={11} />
                Premium Tailoring
              </div>
              <h1 className="text-xl md:text-5xl font-extrabold text-stone-800 leading-tight tracking-tight">
                Your Perfect <span className="text-rose-500">Custom</span> Fit
              </h1>
              <p className="mt-2 text-stone-500 text-xs md:text-base leading-relaxed">
                Custom style. High-quality fabrics. Elegant finishing.
              </p>
              <button className="mt-4 inline-flex items-center gap-2 bg-stone-800 text-white px-4 py-2.5 rounded-xl text-xs md:text-sm font-semibold hover:bg-stone-900 transition-colors shadow-sm">
                Explore Now
                <ArrowRight size={13} />
              </button>
            </div>

            <div className="w-1/2 flex justify-end">
              <div className="relative">
                <div className="w-20 h-20 md:w-48 md:h-48 rounded-2xl md:rounded-3xl overflow-hidden border-4 border-white shadow-lg">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/892/892458.png"
                    alt="Tailor"
                    loading="lazy"
                    className="w-full h-full object-cover bg-stone-800 p-2 md:p-4"
                  />
                </div>
                <div className="absolute -bottom-2 -left-3 bg-white rounded-xl shadow-md px-2.5 py-1.5 hidden md:flex items-center gap-1.5">
                  <Sparkles size={13} className="text-amber-400" />
                  <span className="text-[11px] font-semibold text-stone-700">500+ Designs</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CATEGORY SECTION ================= */}
      <section className="sticky top-16 z-40 bg-stone-50/90 backdrop-blur-md px-4 py-3">
        <div className="grid grid-cols-2 gap-3">
          <Link
            to="/blouseMeasurementPage"
            className="relative rounded-2xl overflow-hidden group h-32 shadow-sm"
          >
            <img
              src="https://images.unsplash.com/photo-1520975922324-8b456906c813"
              alt="Girls Customize"
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-3">
              <p className="text-[10px] font-medium text-white/70 mb-0.5 uppercase tracking-wider">
                Made for you
              </p>
              <h2 className="text-sm font-bold text-white flex items-center gap-1">
                Customize Fit <ArrowRight size={13} />
              </h2>
            </div>
          </Link>

          <Link
            to="/readymade"
            className="relative rounded-2xl overflow-hidden group h-32 shadow-sm"
          >
            <img
              src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d"
              alt="Readymade"
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-3">
              <p className="text-[10px] font-medium text-white/70 mb-0.5 uppercase tracking-wider">
                Ready to wear
              </p>
              <h2 className="text-sm font-bold text-white flex items-center gap-1">
                Readymade <ArrowRight size={13} />
              </h2>
            </div>
          </Link>
        </div>
      </section>

      {/* ================= TOP TRENDING ================= */}
      <section className="px-4 py-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base md:text-xl font-bold text-stone-800">Top Trending</h2>
            <p className="text-xs text-stone-400 mt-0.5">Most loved styles this week</p>
          </div>
          <button className="text-xs font-medium text-stone-500 flex items-center gap-1 hover:text-stone-800 transition-colors">
            View all <ArrowRight size={13} />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
          {products.map((product) => (
            <div
              key={product.id}
              onClick={() => {
                handleProductClick(product);
              }}
              className="bg-white rounded-2xl overflow-hidden hover:shadow-md transition-all duration-300 cursor-pointer border border-stone-100 group"
            >
              <div className="relative overflow-hidden aspect-[3/4]">
                <img
                  src={product.image}
                  alt={product.name}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <div className="p-2.5">
                <p className="text-xs font-medium text-stone-600 truncate leading-tight">
                  {product.name}
                </p>
                <p className="text-sm font-bold text-stone-900 mt-0.5">₹{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
