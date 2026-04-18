import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { CartItem } from '../types/cart';
import OrderStatusStep from '../components/OrderStatusStep';

interface OrderData {
  orderId: string;
  status: string;
  estimatedDelivery: string;
  items: CartItem[];
}

const API_BASE = 'http://localhost:3001/api';

const steps = ['Order Placed', 'Packed', 'Shipped', 'Out for Delivery', 'Delivered'];

const OrderTracking: React.FC = () => {
  const location = useLocation();
  const [order, setOrder] = useState<OrderData | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchOrder = async (): Promise<void> => {
      try {
        const res = await fetch(`${API_BASE}/orders/latest`, {
          credentials: 'include',
        });
        if (!res.ok) return;
        const data = (await res.json()) as OrderData;
        setOrder(data);
      } catch (error) {
        console.error('fetchOrder error:', error);
      }
    };

    // Use location state if available (just navigated from PlaceOrder)
    const state = location.state as { orderId?: string; items?: CartItem[] } | null;
    if (state?.orderId) {
      void fetchOrder();
    } else {
      void fetchOrder();
    }
  }, [location.state]);

  if (!order || order.items.length === 0) {
    return <div className="min-h-screen flex items-center justify-center">No order found</div>;
  }

  const { items, orderId, estimatedDelivery, status } = order;
  const currentStep = steps.indexOf(status);

  return (
    <div className="min-h-screen bg-white-50 p-4 md:p-25 max-w-6xl mx-auto md:mr-30">
      {/* MOBILE VIEW */}
      <div className="md:hidden bg-white rounded-lg shadow p-4 mt-20">
        <h1 className="text-xl font-semibold mb-4">Track Your Order</h1>
        <div className="flex gap-4">
          <div className="w-1/2">
            <p className="text-sm text-gray-600 mb-4">
              Estimated Delivery:
              <span className="font-medium ml-2">{estimatedDelivery}</span>
            </p>
            <div className="space-y-3">
              {steps.map((step, index) => (
                <OrderStatusStep key={step} label={step} completed={index <= currentStep} />
              ))}
            </div>
          </div>
          <div className="w-1/2 space-y-4">
            {items.map((item: CartItem) => (
              <div key={String(item.id) + item.size}>
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded mb-2"
                />
                <h2 className="font-medium text-sm">{item.name}</h2>
                <p className="text-gray-500 text-xs">Order ID: {orderId}</p>
                <p className="text-gray-500 text-xs">Size: {item.size}</p>
                <p className="text-gray-600 text-xs">
                  ₹{item.price} × {item.quantity}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* DESKTOP VIEW */}
      <div className="hidden md:block bg-white w-full max-w-3xl rounded-lg shadow p-4 md:p-6">
        <h1 className="text-xl md:text-2xl font-semibold mb-6">Track Your Order</h1>
        {items.map((item: CartItem) => (
          <div
            key={String(item.id) + item.size}
            className="flex flex-col sm:flex-row gap-4 sm:items-center border-b pb-4 mb-4"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-20 h-20 object-cover rounded mx-auto sm:mx-0"
            />
            <div className="text-center sm:text-left">
              <h2 className="font-medium">{item.name}</h2>
              <p className="text-gray-500 text-sm">Order ID: {orderId}</p>
              <p className="text-gray-500 text-sm">Size: {item.size}</p>
              <p className="text-gray-600 text-sm">
                ₹{item.price} × {item.quantity}
              </p>
            </div>
          </div>
        ))}
        <p className="text-sm text-gray-600 mb-6 text-center sm:text-left">
          Estimated Delivery:
          <span className="font-medium ml-2">{estimatedDelivery}</span>
        </p>
        <div className="space-y-4">
          {steps.map((step, index) => (
            <OrderStatusStep key={step} label={step} completed={index <= currentStep} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;
