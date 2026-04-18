import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Search, MapPin, Heart, X, Scissors } from 'lucide-react';

import { getWishlist } from '../services/wishlistService';
import { getCart } from '../services/cartService';
import { getGirlsReadymadeProducts } from '../services/productService';

const Navbar = (): React.ReactElement => {
  const navigate = useNavigate();

  const [mobileMenu, setMobileMenu] = useState<boolean>(false);
  const [wishlistCount, setWishlistCount] = useState<number>(0);
  const [cartCount, setCartCount] = useState<number>(0);
  const [search, setSearch] = useState<string>('');
  const [searchFocused, setSearchFocused] = useState<boolean>(false);

  const loadCounts = async () => {
    const wishlist = await getWishlist();
    const cart = await getCart(); // ✅ add await
    setWishlistCount(wishlist.length);
    setCartCount(cart.length); // ✅ now safe
  };

  useEffect(() => {
    void loadCounts();
    window.addEventListener('wishlistUpdated', () => {
      void loadCounts();
    });
    window.addEventListener('cartUpdated', () => {
      void loadCounts();
    });
    return () => {
      window.removeEventListener('wishlistUpdated', () => {
        void loadCounts();
      });
      window.removeEventListener('cartUpdated', () => {
        void loadCounts();
      });
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMobileMenu(false);
  };

  const handleSearch = () => {
    if (!search.trim()) return;

    const products = getGirlsReadymadeProducts();

    const foundProduct = products.find((p) => p.name.toLowerCase().includes(search.toLowerCase()));

    if (foundProduct) {
      void navigate(`/productdetail/${String(foundProduct.id)}`, {
        state: { product: foundProduct },
      });
    } else {
      alert('Product not found');
    }

    setSearch('');
  };

  const BadgeIcon = ({ children, count }: { children: React.ReactNode; count: number }) => (
    <span className="relative inline-flex items-center justify-center">
      {children}
      {count > 0 && (
        <span className="absolute -top-2 -right-2 bg-rose-500 text-white text-[9px] font-bold w-4 h-4 flex items-center justify-center rounded-full shadow">
          {count}
        </span>
      )}
    </span>
  );

  return (
    <nav className="bg-white border-b border-stone-100 shadow-sm fixed top-0 left-0 w-full z-50">
      {/* ===================== MOBILE ===================== */}
      <div className="md:hidden">
        <div className="flex items-center gap-3 px-4 py-3">
          {/* Hamburger / Close */}
          <button
            onClick={() => {
              setMobileMenu((prev) => !prev);
            }}
            className="flex-shrink-0 w-9 h-9 flex items-center justify-center rounded-xl bg-stone-100 text-stone-600 transition-colors hover:bg-stone-200"
            aria-label="Toggle menu"
          >
            {mobileMenu ? (
              <X size={18} />
            ) : (
              <div className="grid grid-cols-2 gap-[3px] w-3.5 h-3.5">
                <div className="w-1.5 h-1.5 rounded-sm bg-stone-600" />
                <div className="w-1.5 h-1.5 rounded-sm bg-stone-600" />
                <div className="w-1.5 h-1.5 rounded-sm bg-stone-600" />
                <div className="w-1.5 h-1.5 rounded-sm bg-stone-600" />
              </div>
            )}
          </button>

          {/* Search bar */}
          <div
            className={`flex flex-1 items-center bg-stone-100 rounded-xl px-3 py-2 gap-2 transition-all ${
              searchFocused ? 'ring-2 ring-rose-300 bg-white' : ''
            }`}
          >
            <Search size={14} className="text-stone-400 flex-shrink-0" />
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSearch();
              }}
              onFocus={() => {
                setSearchFocused(true);
              }}
              onBlur={() => {
                setSearchFocused(false);
              }}
              className="flex-1 outline-none text-sm bg-transparent text-stone-800 placeholder:text-stone-400"
            />
            {search && (
              <button
                onClick={() => {
                  setSearch('');
                }}
              >
                <X size={13} className="text-stone-400" />
              </button>
            )}
          </div>

          {/* Icons */}
          <div className="flex items-center gap-3 flex-shrink-0 text-stone-600">
            <Link to="/wishlist" onClick={scrollToTop}>
              <BadgeIcon count={wishlistCount}>
                <Heart size={20} />
              </BadgeIcon>
            </Link>
            <Link to="/cart" onClick={scrollToTop}>
              <BadgeIcon count={cartCount}>
                <ShoppingCart size={20} />
              </BadgeIcon>
            </Link>
            <Link to="/profile" onClick={scrollToTop}>
              <User size={20} />
            </Link>
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        {mobileMenu && (
          <div className="absolute top-full left-0 w-full bg-white shadow-lg border-t border-stone-100 z-50 px-4 py-4 space-y-1 animate-in slide-in-from-top-2">
            <div className="flex items-center gap-2 pb-3 mb-2 border-b border-stone-100">
              <div className="w-8 h-8 bg-stone-900 rounded-lg flex items-center justify-center">
                <Scissors size={15} className="text-white" />
              </div>
              <span className="text-sm font-bold text-stone-800 tracking-wide">Jojo Boutique</span>
            </div>

            {[
              { to: '/', label: 'Home', icon: null },
              { to: '/wishlist', label: 'Wishlist', icon: <Heart size={16} /> },
              { to: '/address', label: 'Address', icon: <MapPin size={16} /> },
              { to: '/profile', label: 'Account', icon: <User size={16} /> },
            ].map(({ to, label, icon }) => (
              <Link
                key={to}
                to={to}
                onClick={scrollToTop}
                className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm text-stone-600 font-medium hover:bg-stone-50 hover:text-stone-900 transition-colors"
              >
                {icon && <span className="text-stone-400">{icon}</span>}
                {label}
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* ===================== DESKTOP ===================== */}
      <div className="hidden md:flex items-center justify-between px-8 py-3 gap-6">
        {/* Logo */}
        <Link to="/" onClick={scrollToTop} className="flex items-center gap-2.5 flex-shrink-0">
          <div className="w-9 h-9 bg-stone-900 rounded-xl flex items-center justify-center shadow-sm">
            <Scissors size={17} className="text-white" />
          </div>
          <span className="text-base font-bold tracking-wide text-stone-800">Jojo Boutique</span>
        </Link>

        {/* Search */}
        <div
          className={`flex flex-1 mx-4 max-w-xl items-center bg-stone-100 rounded-xl px-4 py-2.5 gap-2 transition-all ${
            searchFocused ? 'ring-2 ring-rose-300 bg-white shadow-sm' : ''
          }`}
        >
          <Search size={15} className="text-stone-400 flex-shrink-0" />
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSearch();
            }}
            onFocus={() => {
              setSearchFocused(true);
            }}
            onBlur={() => {
              setSearchFocused(false);
            }}
            className="flex-1 outline-none text-sm bg-transparent text-stone-800 placeholder:text-stone-400"
          />
          {search ? (
            <button
              onClick={() => {
                setSearch('');
              }}
            >
              <X size={14} className="text-stone-400 hover:text-stone-600 transition-colors" />
            </button>
          ) : null}
          <button
            onClick={handleSearch}
            className="ml-1 px-3 py-1.5 bg-stone-800 text-white text-xs font-medium rounded-lg hover:bg-stone-900 transition-colors flex-shrink-0"
          >
            Search
          </button>
        </div>

        {/* Right icons */}
        <div className="flex items-center gap-5 text-stone-600 flex-shrink-0">
          <Link
            to="/wishlist"
            onClick={scrollToTop}
            className="flex flex-col items-center gap-0.5 hover:text-rose-500 transition-colors group"
          >
            <BadgeIcon count={wishlistCount}>
              <Heart size={20} />
            </BadgeIcon>
            <span className="text-[10px] text-stone-400 group-hover:text-rose-400 transition-colors">
              Wishlist
            </span>
          </Link>

          <Link
            to="/cart"
            onClick={scrollToTop}
            className="flex flex-col items-center gap-0.5 hover:text-rose-500 transition-colors group"
          >
            <BadgeIcon count={cartCount}>
              <ShoppingCart size={20} />
            </BadgeIcon>
            <span className="text-[10px] text-stone-400 group-hover:text-rose-400 transition-colors">
              Cart
            </span>
          </Link>

          <Link
            to="/address"
            onClick={scrollToTop}
            className="flex flex-col items-center gap-0.5 hover:text-rose-500 transition-colors group"
          >
            <MapPin size={20} />
            <span className="text-[10px] text-stone-400 group-hover:text-rose-400 transition-colors">
              Address
            </span>
          </Link>

          <Link
            to="/profile"
            onClick={scrollToTop}
            className="flex flex-col items-center gap-0.5 hover:text-rose-500 transition-colors group"
          >
            <User size={20} />
            <span className="text-[10px] text-stone-400 group-hover:text-rose-400 transition-colors">
              Account
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
