import { Request, Response } from 'express';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import { prisma } from '../lib/prisma.js';
import { auth } from '../auth.js';

const razorpay = new Razorpay({
  key_id: process.env['RAZORPAY_KEY_ID'] ?? '',
  key_secret: process.env['RAZORPAY_KEY_SECRET'] ?? '',
});

const getUserIdFromSession = async (req: Request): Promise<string | null> => {
  try {
    const session = await auth.api.getSession({
      headers: req.headers as unknown as Headers,
    });
    return session ? session.user.id : null;
  } catch {
    return null;
  }
};

const generateOrderId = (): string => {
  const date = new Date().toLocaleDateString('en-CA');
  const random = Math.floor(1000 + Math.random() * 9000);
  return `ORD-${date}-${String(random)}`;
};

const getEstimatedDelivery = (): string => {
  const date = new Date();
  date.setDate(date.getDate() + 5);
  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};

interface OrderItemInput {
  id: number;
  name: string;
  image: string;
  price: number;
  size: string;
  quantity: number;
}

// POST /api/orders/create-razorpay-order
export const createRazorpayOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = await getUserIdFromSession(req);
    if (!userId) {
      res.status(401).json({ message: 'Not authenticated' });
      return;
    }

    const { items } = req.body as { items: OrderItemInput[] };

    if (items.length === 0) {
      res.status(400).json({ message: 'No items provided' });
      return;
    }

    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const razorpayOrder = await razorpay.orders.create({
      amount: subtotal * 100, // paise
      currency: 'INR',
      receipt: generateOrderId(),
    });

    res.json({
      razorpayOrderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      keyId: process.env['RAZORPAY_KEY_ID'],
    });
  } catch (error) {
    console.error('createRazorpayOrder error:', error);
    res.status(500).json({ message: 'Failed to create Razorpay order' });
  }
};

// POST /api/orders/verify-payment
export const verifyPaymentAndCreateOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = await getUserIdFromSession(req);
    if (!userId) {
      res.status(401).json({ message: 'Not authenticated' });
      return;
    }

    const { razorpayOrderId, razorpayPaymentId, razorpaySignature, items } = req.body as {
      razorpayOrderId: string;
      razorpayPaymentId: string;
      razorpaySignature: string;
      items: OrderItemInput[];
    };

    // Verify signature
    const body = `${razorpayOrderId}|${razorpayPaymentId}`;
    const expectedSignature = crypto
      .createHmac('sha256', process.env['RAZORPAY_KEY_SECRET'] ?? '')
      .update(body)
      .digest('hex');

    if (expectedSignature !== razorpaySignature) {
      res.status(400).json({ message: 'Invalid payment signature' });
      return;
    }

    // Create order in DB
    const orderId = generateOrderId();
    const order = await prisma.order.create({
      data: {
        orderId,
        userId,
        status: 'Order Placed',
        estimatedDelivery: getEstimatedDelivery(),
        razorpayOrderId,
        razorpayPaymentId,
        paid: true,
        items: {
          create: items.map((item) => ({
            productId: item.id,
            name: item.name,
            image: item.image,
            price: item.price,
            size: item.size,
            quantity: item.quantity,
          })),
        },
      },
      include: { items: true },
    });

    res.status(201).json(order);
  } catch (error) {
    console.error('verifyPaymentAndCreateOrder error:', error);
    res.status(500).json({ message: 'Failed to verify payment and create order' });
  }
};

// GET /api/orders/latest
export const getLatestOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = await getUserIdFromSession(req);
    if (!userId) {
      res.status(401).json({ message: 'Not authenticated' });
      return;
    }

    const order = await prisma.order.findFirst({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      include: { items: true },
    });

    if (!order) {
      res.status(404).json({ message: 'No order found' });
      return;
    }

    res.json(order);
  } catch (error) {
    console.error('getLatestOrder error:', error);
    res.status(500).json({ message: 'Failed to fetch order' });
  }
};

// GET /api/orders
export const getAllOrders = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = await getUserIdFromSession(req);
    if (!userId) {
      res.status(401).json({ message: 'Not authenticated' });
      return;
    }

    const orders = await prisma.order.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      include: { items: true },
    });

    res.json(orders);
  } catch (error) {
    console.error('getAllOrders error:', error);
    res.status(500).json({ message: 'Failed to fetch orders' });
  }
};

// PATCH /api/orders/:orderId/status
export const updateOrderStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const { orderId } = req.params;
    const { status } = req.body as { status: string };

    if (typeof orderId !== 'string') {
      res.status(400).json({ message: 'Invalid orderId' });
      return;
    }

    const updated = await prisma.order.update({
      where: { orderId },
      data: { status },
    });

    res.json(updated);
  } catch (error) {
    console.error('updateOrderStatus error:', error);
    res.status(500).json({ message: 'Failed to update order status' });
  }
};
