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

// GET /api/wishlist
export const getWishlist = async (req: Request, res: Response) => {
  try {
    const userId = await getUserIdFromSession(req);
    if (!userId) {
      res.status(401).json({ message: 'Not authenticated' });
      return;
    }

    const items = await prisma.wishlist.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });

    const products = items.map((item) => ({
      id: item.productId,
      name: item.name,
      image: item.image,
      price: item.price,
    }));

    res.status(200).json(products);
  } catch (error) {
    console.error('getWishlist error:', error);
    res.status(500).json({ message: 'Failed to fetch wishlist', error });
  }
};

// POST /api/wishlist
export const addToWishlist = async (req: Request, res: Response) => {
  try {
    const userId = await getUserIdFromSession(req);
    if (!userId) {
      res.status(401).json({ message: 'Not authenticated' });
      return;
    }

    const { product } = req.body as {
      product: { id: number; name: string; image: string; price: number };
    };

    const existing = await prisma.wishlist.findFirst({
      where: { userId, productId: product.id },
    });

    if (existing) {
      res.status(409).json({ message: 'Already in wishlist' });
      return;
    }

    const item = await prisma.wishlist.create({
      data: {
        userId,
        productId: product.id,
        name: product.name,
        image: product.image,
        price: product.price,
      },
    });

    res.status(201).json({
      id: item.productId,
      name: item.name,
      image: item.image,
      price: item.price,
    });
  } catch (error) {
    console.error('addToWishlist error:', error);
    res.status(500).json({ message: 'Failed to add to wishlist', error });
  }
};

// DELETE /api/wishlist/:productId
export const removeFromWishlist = async (req: Request, res: Response) => {
  try {
    const userId = await getUserIdFromSession(req);
    if (!userId) {
      res.status(401).json({ message: 'Not authenticated' });
      return;
    }

    const { productId } = req.params;

    await prisma.wishlist.deleteMany({
      where: { userId, productId: Number(productId) },
    });

    res.status(200).json({ message: 'Removed from wishlist' });
  } catch (error) {
    console.error('removeFromWishlist error:', error);
    res.status(500).json({ message: 'Failed to remove from wishlist', error });
  }
};

// GET /api/wishlist/:productId/check
export const isWishlisted = async (req: Request, res: Response) => {
  try {
    const userId = await getUserIdFromSession(req);
    if (!userId) {
      res.status(200).json({ wishlisted: false });
      return;
    }

    const { productId } = req.params;

    const item = await prisma.wishlist.findFirst({
      where: { userId, productId: Number(productId) },
    });

    res.status(200).json({ wishlisted: !!item });
  } catch (error) {
    console.error('isWishlisted error:', error);
    res.status(500).json({ message: 'Failed to check wishlist', error });
  }
};
