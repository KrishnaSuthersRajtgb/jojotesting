import React from 'react';
import { Link } from 'react-router-dom';

const InstagramIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
  </svg>
);

const FacebookIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
  </svg>
);

const YoutubeIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 00-1.95 1.96A29 29 0 001 12a29 29 0 00.46 5.58a2.78 2.78 0 001.95 1.95C5.12 20 12 20 12 20s6.88 0 8.59-.47a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58z" />
    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
  </svg>
);

const Footer: React.FC = () => {
  return (
    <footer className="bg-red-300 text-gray-800 pt-8 pb-6 px-6">
      <div className="max-w-7xl mx-auto">
        {/* ================= MOBILE VIEW ================= */}
        <div className="md:hidden">
          {/* Top Row - Links Left / Logo Right */}
          <div className="flex justify-between items-start">
            {/* Links - Left */}
            <div className="flex flex-col space-y-2 text-sm font-medium">
              <Link to="/" className="hover:text-purple-600">Home</Link>
              <Link to="/shop" className="hover:text-purple-600">Shop</Link>
              <Link to="/about" className="hover:text-purple-600">About</Link>
              <Link to="/feedback" className="hover:text-purple-600">Feedback</Link>
              <Link to="/customer-care" className="hover:text-purple-600">Customer Care</Link>
            </div>

            {/* Logo - Right */}
            <div className="flex flex-col items-end">
              <div className="text-4xl">💐</div>
              <h2 className="text-lg font-semibold tracking-wide">JOJO FLORA</h2>
            </div>
          </div>

          {/* Social - Center */}
          <div className="flex justify-center items-center gap-4 text-sm mt-6">
            <InstagramIcon size={18} />
            <FacebookIcon size={18} />
            <YoutubeIcon size={18} />
          </div>
        </div>

        {/* ================= DESKTOP VIEW ================= */}
        <div className="hidden md:flex justify-between items-center">
          {/* Left - Logo */}
          <div className="flex items-center gap-3">
            <div className="text-3xl">💐</div>
            <h2 className="text-2xl font-semibold tracking-wide">JOJO FLORA</h2>
          </div>

          {/* Center - Links */}
          <div className="flex gap-8 text-sm font-medium">
            <Link to="/" className="hover:text-purple-600 transition">Home</Link>
            <Link to="/shop" className="hover:text-purple-600 transition">Shop</Link>
            <Link to="/about" className="hover:text-purple-600 transition">About</Link>
            <Link to="/feedback" className="hover:text-purple-600 transition">Feedback</Link>
            <Link to="/customer-care" className="hover:text-purple-600 transition">Customer Care</Link>
          </div>

          {/* Right - Social */}
          <div className="flex items-center gap-4 text-sm">
            <span className="cursor-pointer hover:scale-110 transition"><InstagramIcon size={18} /></span>
            <span className="cursor-pointer hover:scale-110 transition"><FacebookIcon size={18} /></span>
            <span className="cursor-pointer hover:scale-110 transition"><YoutubeIcon size={18} /></span>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="text-center text-xs mt-6 border-t border-purple-200 pt-4">
        © 2026 JOJO FLORA. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;