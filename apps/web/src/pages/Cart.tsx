import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCart, removeFromCart, updateQuantity, CartItemAPI } from '../services/cartService';
import { Trash2 } from 'lucide-react';

const Cart: React.FC = () => {
  const [items, setItems] = useState<CartItemAPI[]>([]);
  const navigate = useNavigate();

  const refresh = async () => {
    const data = await getCart();
    setItems(data);
  };

  useEffect(() => {
    void refresh();
  }, []);

  const handleRemove = async (itemId: string) => {
    await removeFromCart(itemId);
    void refresh();
  };

  const changeQty = async (itemId: string, qty: number) => {
    if (qty < 1) return;
    await updateQuantity(itemId, qty);
    void refresh();
  };

  const handleCheckout = () => {
    void navigate('/place-order', {
      state: { items },
    });
  };

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-white px-4 md:px-30 py-10 max-w-7xl mx-auto mt-16">
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-2xl md:text-3xl font-semibold">Your cart</h1>

        <button
          onClick={() => {
            void navigate('/readymade');
          }}
          className="text-sm underline text-gray-600"
        >
          Continue shopping
        </button>
      </div>

      {items.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          {/* Desktop Header */}
          <div className="hidden md:grid grid-cols-12 text-gray-500 text-sm border-b pb-3 mb-6">
            <div className="col-span-6">PRODUCT</div>
            <div className="col-span-3 text-center">QUANTITY</div>
            <div className="col-span-3 text-right">TOTAL</div>
          </div>

          <div className="space-y-8">
            {items.map((item) => (
              <div
                key={item.id}
                className="border-b pb-6 md:border-none md:grid md:grid-cols-12 md:items-center md:gap-4"
              >
                {/* MOBILE LAYOUT */}
                <div className="flex gap-4 md:hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-24 object-cover rounded"
                  />

                  <div className="flex-1">
                    <h2 className="font-medium text-gray-800 text-sm">{item.name}</h2>

                    <p className="text-gray-600 text-sm mt-1">₹{item.price.toLocaleString()}</p>

                    <p className="text-xs text-gray-500">Size: {item.size}</p>

                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border rounded-lg overflow-hidden">
                        <button
                          onClick={() => {
                            void changeQty(item.id, item.quantity - 1);
                          }}
                          className="px-3 py-1"
                        >
                          -
                        </button>

                        <span className="px-3 text-sm">{item.quantity}</span>

                        <button
                          onClick={() => {
                            void changeQty(item.id, item.quantity + 1);
                          }}
                          className="px-3 py-1"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => {
                          void handleRemove(item.id);
                        }}
                        className="text-gray-400"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>

                    <div className="text-right font-medium mt-2">
                      ₹{(item.price * item.quantity).toLocaleString()}
                    </div>
                  </div>
                </div>

                {/* DESKTOP LAYOUT */}
                <>
                  <div className="hidden md:flex md:col-span-6 gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-28 object-cover rounded"
                    />

                    <div>
                      <h2 className="font-medium text-gray-800">{item.name}</h2>

                      <p className="text-gray-600 text-sm mt-1">
                        Rs. {item.price.toLocaleString()}
                      </p>

                      <p className="text-sm text-gray-500 mt-1">Size: {item.size}</p>
                    </div>
                  </div>

                  <div className="hidden md:flex md:col-span-3 justify-center items-center gap-3">
                    <div className="flex items-center border rounded-lg overflow-hidden">
                      <button
                        onClick={() => {
                          void changeQty(item.id, item.quantity - 1);
                        }}
                        className="px-3 py-2"
                      >
                        -
                      </button>

                      <span className="px-4">{item.quantity}</span>

                      <button
                        onClick={() => {
                          void changeQty(item.id, item.quantity + 1);
                        }}
                        className="px-3 py-2"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => {
                        void handleRemove(item.id);
                      }}
                      className="text-gray-400 hover:text-red-500"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>

                  <div className="hidden md:block md:col-span-3 text-right font-medium text-gray-800">
                    Rs. {(item.price * item.quantity).toLocaleString()}
                  </div>
                </>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="mt-10 md:mt-16 border-t pt-6 flex justify-end">
            <div className="w-full md:w-80">
              <div className="flex justify-between text-lg mb-4">
                <span>Total</span>
                <span className="font-semibold">₹{total.toLocaleString()}</span>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full primary-color text-white py-3 rounded-lg"
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
