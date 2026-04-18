import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Product } from '../types/product';

interface CartItem {
  id: number;
  name: string;
  image: string;
  price: number;
  size: string;
  quantity: number;
}

interface PlaceOrderState {
  items?: CartItem[];
  product?: Product;
  size?: string;
}

interface AddressForm {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  apartment: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
}

interface RazorpayOrderResponse {
  razorpayOrderId: string;
  amount: number;
  currency: string;
  keyId: string;
}

interface RazorpayPaymentResponse {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

declare global {
  interface Window {
    Razorpay: new (options: Record<string, unknown>) => { open: () => void };
  }
}

const defaultForm: AddressForm = {
  email: '',
  firstName: '',
  lastName: '',
  address: '',
  apartment: '',
  city: '',
  state: 'Tamil Nadu',
  pincode: '',
  phone: '',
};

const API_BASE = 'http://localhost:3001/api';

const PlaceOrder: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const state = (location.state ?? {}) as PlaceOrderState;

  let items: CartItem[] = [];

  if (state.items && state.items.length > 0) {
    items = state.items;
  } else if (state.product) {
    items = [
      {
        ...state.product,
        size: state.size ?? '',
        quantity: 1,
      },
    ];
  }

  const [form, setForm] = useState<AddressForm>(defaultForm);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof AddressForm, string>>>({});

  const isFirstLoad = useRef(true);
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Check session and load address
  useEffect(() => {
    const init = async (): Promise<void> => {
      try {
        // Check session and get email
        const sessionRes = await fetch(`${API_BASE}/auth/get-session`, {
          credentials: 'include',
        });
        if (sessionRes.ok) {
          setIsAuthenticated(true);
          const sessionData = (await sessionRes.json()) as { email?: string };
          if (sessionData.email) {
            setForm((prev) => ({ ...prev, email: sessionData.email ?? '' }));
          }
        }

        // Load saved address
        const addrRes = await fetch(`${API_BASE}/address`, {
          credentials: 'include',
        });
        if (addrRes.ok) {
          const data = (await addrRes.json()) as AddressForm | null;
          if (data) {
            // Merge saved address but always keep session email
            setForm((prev) => ({
              ...data,
              email: prev.email || data.email,
            }));
          }
        }
      } catch (error) {
        console.error('init error:', error);
      } finally {
        setTimeout(() => {
          isFirstLoad.current = false;
        }, 0);
      }
    };
    void init();
  }, []);

  // Auto-save address to backend whenever form changes (debounced 1.5s)
  useEffect(() => {
    if (isFirstLoad.current) return;

    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(() => {
      const saveAddress = async (): Promise<void> => {
        try {
          await fetch(`${API_BASE}/address`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(form),
          });
        } catch (error) {
          console.error('auto-save address error:', error);
        }
      };
      void saveAddress();
    }, 1500);

    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, [form]);

  // Load Razorpay script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Phone: digits only, max 10
    if (name === 'phone') {
      const digits = value.replace(/\D/g, '').slice(0, 10);
      setForm((prev) => ({ ...prev, phone: digits }));
      setErrors((prev) => ({ ...prev, phone: undefined }));
      return;
    }

    // PIN code: digits only, max 6
    if (name === 'pincode') {
      const digits = value.replace(/\D/g, '').slice(0, 6);
      setForm((prev) => ({ ...prev, pincode: digits }));
      setErrors((prev) => ({ ...prev, pincode: undefined }));
      return;
    }

    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof AddressForm, string>> = {};

    if (!form.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!form.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!form.address.trim()) newErrors.address = 'Address is required';
    if (!form.city.trim()) newErrors.city = 'City is required';
    if (!form.state.trim()) newErrors.state = 'State is required';

    if (!form.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (form.phone.replace(/\D/g, '').length !== 10) {
      newErrors.phone = 'Phone number must be exactly 10 digits';
    }

    if (!form.pincode.trim()) {
      newErrors.pincode = 'PIN code is required';
    } else if (form.pincode.replace(/\D/g, '').length !== 6) {
      newErrors.pincode = 'PIN code must be exactly 6 digits';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handlePayNow = async (): Promise<void> => {
    if (!isAuthenticated) {
      setShowLoginPrompt(true);
      return;
    }

    if (!validate()) return;

    setLoading(true);

    try {
      // Step 1: Create Razorpay order
      const orderRes = await fetch(`${API_BASE}/orders/create-razorpay-order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ items }),
      });

      if (!orderRes.ok) {
        alert('Failed to create order');
        setLoading(false);
        return;
      }

      const orderData = (await orderRes.json()) as RazorpayOrderResponse;

      // Step 2: Open Razorpay checkout
      const options = {
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'Jojo Boutique',
        description: 'Order Payment',
        order_id: orderData.razorpayOrderId,
        prefill: {
          name: `${form.firstName} ${form.lastName}`,
          email: form.email,
          contact: form.phone,
        },
        handler: async (response: RazorpayPaymentResponse) => {
          // Step 3: Verify payment and save order
          const verifyRes = await fetch(`${API_BASE}/orders/verify-payment`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
              items,
            }),
          });

          if (!verifyRes.ok) {
            alert('Payment verification failed');
            return;
          }

          const savedOrder = (await verifyRes.json()) as { orderId: string };

          void navigate('/track-order', {
            state: {
              orderId: savedOrder.orderId,
              items,
              form,
            },
          });
        },
        theme: { color: '#1a1a1a' },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error('handlePayNow error:', error);
      alert('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return <div className="text-center mt-20">No product found</div>;
  }

  const baseInput = 'w-full border p-2.5 text-sm rounded';
  const errInput = 'border-red-400 bg-red-50';
  const errMsg = 'text-xs text-red-500 mt-1';

  return (
    <div className="min-h-screen bg-white flex justify-center">
      <div className="w-full max-w-5xl grid md:grid-cols-2 min-h-screen mt-20">
        {/* LEFT */}
        <div className="p-5 md:p-8 bg-white overflow-y-auto">
          <h1 className="text-xl font-semibold mb-5">jojo</h1>

          <h2 className="font-medium text-sm mb-2">Email</h2>

          {/* Email — read-only from session */}
          <div className="relative mb-4">
            <input
              name="email"
              type="email"
              readOnly
              tabIndex={-1}
              value={form.email}
              placeholder="Your sign-in email will appear here"
              className={`${baseInput} bg-gray-50 text-gray-500 cursor-not-allowed pr-24`}
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-medium text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded select-none">
              auto-filled
            </span>
          </div>

          <h2 className="font-medium text-sm mt-4 mb-2">Delivery</h2>
          <select className="w-full border p-2.5 text-sm rounded mb-3">
            <option>India</option>
          </select>

          <div className="grid grid-cols-2 gap-2 mb-1">
            <div>
              <input
                name="firstName"
                placeholder="First name *"
                className={`${baseInput} ${errors.firstName ? errInput : ''}`}
                value={form.firstName}
                onChange={handleChange}
              />
              {errors.firstName && <p className={errMsg}>{errors.firstName}</p>}
            </div>
            <div>
              <input
                name="lastName"
                placeholder="Last name *"
                className={`${baseInput} ${errors.lastName ? errInput : ''}`}
                value={form.lastName}
                onChange={handleChange}
              />
              {errors.lastName && <p className={errMsg}>{errors.lastName}</p>}
            </div>
          </div>

          <div className="mt-3">
            <input
              name="address"
              placeholder="Address *"
              className={`${baseInput} ${errors.address ? errInput : ''}`}
              value={form.address}
              onChange={handleChange}
            />
            {errors.address && <p className={errMsg}>{errors.address}</p>}
          </div>

          <input
            name="apartment"
            placeholder="Apartment... (optional)"
            className={`${baseInput} mt-3`}
            value={form.apartment}
            onChange={handleChange}
          />

          <div className="grid grid-cols-3 gap-2 mt-3">
            <div>
              <input
                name="city"
                placeholder="City *"
                className={`${baseInput} ${errors.city ? errInput : ''}`}
                value={form.city}
                onChange={handleChange}
              />
              {errors.city && <p className={errMsg}>{errors.city}</p>}
            </div>
            <div>
              <select className="border p-2.5 text-sm rounded w-full">
                <option>Tamil Nadu</option>
              </select>
            </div>
            <div>
              <input
                name="pincode"
                placeholder="PIN code * (6 digits)"
                inputMode="numeric"
                maxLength={6}
                className={`${baseInput} ${errors.pincode ? errInput : ''}`}
                value={form.pincode}
                onChange={handleChange}
              />
              {errors.pincode && <p className={errMsg}>{errors.pincode}</p>}
            </div>
          </div>

          <div className="mt-3 mb-6">
            <input
              name="phone"
              placeholder="Phone * (10 digits)"
              inputMode="numeric"
              maxLength={10}
              className={`${baseInput} ${errors.phone ? errInput : ''}`}
              value={form.phone}
              onChange={handleChange}
            />
            {errors.phone && <p className={errMsg}>{errors.phone}</p>}
          </div>

          <h2 className="font-medium text-sm mb-2">Payment</h2>
          <div className="border rounded p-3 text-sm bg-gray-50">
            Razorpay Secure (UPI, Cards, Wallets)
          </div>
        </div>

        {/* RIGHT */}
        <div className="bg-gray-100 p-5 md:p-8">
          <div className="max-w-md mx-auto">
            {items.map((item) => (
              <div
                key={String(item.id) + item.size}
                className="flex gap-3 items-center border-b pb-4 mb-4"
              >
                <img src={item.image} alt={item.name} className="w-14 h-14 object-cover rounded" />
                <div className="text-sm">
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-gray-500 text-xs">Size: {item.size}</p>
                  <p className="text-gray-500 text-xs">Qty: {item.quantity}</p>
                </div>
                <div className="ml-auto font-medium text-sm">₹{item.price * item.quantity}</div>
              </div>
            ))}

            <div className="mt-5 space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between text-base font-semibold border-t pt-3">
                <span>Total</span>
                <span>₹{subtotal}</span>
              </div>
            </div>

            <button
              onClick={() => {
                void handlePayNow();
              }}
              disabled={loading}
              className="w-full mt-6 primary-color text-white py-3 rounded text-sm font-medium disabled:opacity-50"
            >
              {loading ? 'Processing...' : 'Buy Now'}
            </button>

            {showLoginPrompt && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded text-sm text-center">
                <p className="text-red-600 font-medium mb-2">Please login to place an order</p>
                <button
                  onClick={() => {
                    void navigate('/login', { state: { from: location } });
                  }}
                  className="text-white bg-red-500 hover:bg-red-600 px-4 py-1.5 rounded text-xs font-medium"
                >
                  Go to Login
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
