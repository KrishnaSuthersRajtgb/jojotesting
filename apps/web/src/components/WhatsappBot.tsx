import React, { useState } from 'react';
import { FaWhatsapp, FaInstagram } from 'react-icons/fa';
import { X, MessageCircle } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const WhatsappBot: React.FC = () => {
  const phoneNumber = '919597300773';
  const message = 'Hello, I need help with my order';
  const instagramUrl = 'https://www.instagram.com/jojo_flora_2026/';

  const [open, setOpen] = useState(false);
  const location = useLocation();

  // ✅ Large on home, compact on all other pages
  const isHome = location.pathname === '/';

  const openWhatsapp = () => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const openInstagram = () => {
    window.open(instagramUrl, '_blank');
  };

  return (
    <div className="fixed bottom-24 right-5 md:bottom-8 md:right-7 z-50 flex flex-col items-end gap-3">
      {/* Expanded buttons */}
      {open && (
        <div
          className={`flex flex-col items-end animate-in slide-in-from-bottom-3 fade-in duration-200 ${
            isHome ? 'gap-2.5' : 'gap-2'
          }`}
        >
          {/* Instagram */}
          <div className={`flex items-center ${isHome ? 'gap-2.5' : 'gap-2'}`}>
            {isHome && (
              <span className="bg-white text-stone-700 text-xs font-medium px-3 py-1.5 rounded-xl shadow-md border border-stone-100 whitespace-nowrap">
                Follow on Instagram
              </span>
            )}
            <button
              onClick={openInstagram}
              title="Follow on Instagram"
              className={`flex items-center justify-center transition-all hover:scale-105 active:scale-95 ${
                isHome ? 'w-12 h-12 rounded-2xl shadow-lg' : 'w-9 h-9 rounded-xl shadow-md'
              }`}
              style={{
                background:
                  'linear-gradient(135deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
              }}
            >
              <FaInstagram size={isHome ? 22 : 16} className="text-white" />
            </button>
          </div>

          {/* WhatsApp */}
          <div className={`flex items-center ${isHome ? 'gap-2.5' : 'gap-2'}`}>
            {isHome && (
              <span className="bg-white text-stone-700 text-xs font-medium px-3 py-1.5 rounded-xl shadow-md border border-stone-100 whitespace-nowrap">
                Chat on WhatsApp
              </span>
            )}
            <button
              onClick={openWhatsapp}
              title="Chat on WhatsApp"
              className={`bg-[#25D366] hover:bg-[#1ebe5d] flex items-center justify-center transition-all hover:scale-105 active:scale-95 ${
                isHome ? 'w-12 h-12 rounded-2xl shadow-lg' : 'w-9 h-9 rounded-xl shadow-md'
              }`}
            >
              <FaWhatsapp size={isHome ? 22 : 16} className="text-white" />
            </button>
          </div>
        </div>
      )}

      {/* Toggle FAB */}
      <button
        onClick={() => { setOpen((prev) => !prev); }}
        className={`flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 ${
          open ? 'bg-stone-800 hover:bg-stone-900' : 'bg-stone-900 hover:bg-stone-800'
        } ${isHome ? 'w-14 h-14 rounded-2xl shadow-xl' : 'w-10 h-10 rounded-xl shadow-lg'}`}
      >
        {open ? (
          <X size={isHome ? 22 : 17} className="text-white" />
        ) : (
          <MessageCircle size={isHome ? 22 : 17} className="text-white" />
        )}
      </button>
    </div>
  );
};

export default WhatsappBot;
