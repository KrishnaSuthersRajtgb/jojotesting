import { Request, Response } from 'express';
import { prisma } from '../lib/prisma.js';
import { auth } from '../auth.js';

// Helper to get userId from better-auth session
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

// GET /api/cart
export const getCart = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = await getUserIdFromSession(req);
    if (!userId) {
      res.status(401).json({ message: 'Not authenticated' });
      return;
    }

    const cart = await prisma.cart.findFirst({
      where: { userId },
      include: { items: true },
    });

    if (!cart) {
      res.json({ items: [] });
      return;
    }

    res.json(cart);
  } catch (error) {
    console.error('getCart error:', error);
    res.status(500).json({ message: 'Failed to fetch cart' });
  }
};

// POST /api/cart/add
export const addToCart = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = await getUserIdFromSession(req);
    if (!userId) {
      res.status(401).json({ message: 'Not authenticated' });
      return;
    }

    const { productId, name, image, price, size } = req.body as {
      productId: number;
      name: string;
      image: string;
      price: number;
      size: string;
    };

    if (!productId || !name || !price || !size) {
      res.status(400).json({ message: 'Missing required fields' });
      return;
    }

    let cart = await prisma.cart.findFirst({ where: { userId } });

    if (!cart) {
      cart = await prisma.cart.create({ data: { userId } });
    }

    const existingItem = await prisma.cartItem.findFirst({
      where: { cartId: cart.id, productId, size },
    });

    if (existingItem) {
      const updated = await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + 1 },
      });
      res.json({ message: 'Quantity updated', item: updated });
      return;
    }

    const item = await prisma.cartItem.create({
      data: {
        cartId: cart.id,
        productId,
        name,
        image,
        price,
        size,
        quantity: 1,
      },
    });

    res.status(201).json({ message: 'Added to cart', item });
  } catch (error) {
    console.error('addToCart error:', error);
    res.status(500).json({ message: 'Failed to add to cart' });
  }
};

// PUT /api/cart/item/:itemId
export const updateCartItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = await getUserIdFromSession(req);
    if (!userId) {
      res.status(401).json({ message: 'Not authenticated' });
      return;
    }

    const rawItemId = req.params['itemId'];
    const itemId = Array.isArray(rawItemId) ? rawItemId[0] : rawItemId;

    const { quantity } = req.body as { quantity: number };

    if (!itemId) {
      res.status(400).json({ message: 'Item ID is required' });
      return;
    }

    if (quantity < 1) {
      res.status(400).json({ message: 'Quantity must be at least 1' });
      return;
    }

    const updated = await prisma.cartItem.update({
      where: { id: itemId },
      data: { quantity },
    });

    res.json({ message: 'Cart item updated', item: updated });
  } catch (error) {
    console.error('updateCartItem error:', error);
    res.status(500).json({ message: 'Failed to update cart item' });
  }
};

// DELETE /api/cart/item/:itemId
export const removeCartItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = await getUserIdFromSession(req);
    if (!userId) {
      res.status(401).json({ message: 'Not authenticated' });
      return;
    }

    const rawItemId = req.params['itemId'];
    const itemId = Array.isArray(rawItemId) ? rawItemId[0] : rawItemId;

    if (!itemId) {
      res.status(400).json({ message: 'Item ID is required' });
      return;
    }

    await prisma.cartItem.delete({
      where: { id: itemId },
    });

    res.json({ message: 'Item removed from cart' });
  } catch (error) {
    console.error('removeCartItem error:', error);
    res.status(500).json({ message: 'Failed to remove cart item' });
  }
};

// DELETE /api/cart/clear
export const clearCart = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = await getUserIdFromSession(req);
    if (!userId) {
      res.status(401).json({ message: 'Not authenticated' });
      return;
    }

    const cart = await prisma.cart.findFirst({ where: { userId } });

    if (!cart) {
      res.json({ message: 'Cart already empty' });
      return;
    }

    await prisma.cartItem.deleteMany({ where: { cartId: cart.id } });

    res.json({ message: 'Cart cleared' });
  } catch (error) {
    console.error('clearCart error:', error);
    res.status(500).json({ message: 'Failed to clear cart' });
  }
};
