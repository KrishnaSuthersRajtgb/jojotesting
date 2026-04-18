import { Request, Response } from 'express';
import { prisma } from '../lib/prisma.js';
import { auth } from '../auth.js';

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

// GET /api/address
export const getAddress = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = await getUserIdFromSession(req);
    if (!userId) {
      res.status(401).json({ message: 'Not authenticated' });
      return;
    }

    const address = await prisma.address.findUnique({
      where: { userId },
    });

    if (!address) {
      res.json(null);
      return;
    }

    res.json(address);
  } catch (error) {
    console.error('getAddress error:', error);
    res.status(500).json({ message: 'Failed to fetch address' });
  }
};

// POST /api/address
export const saveAddress = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = await getUserIdFromSession(req);
    if (!userId) {
      res.status(401).json({ message: 'Not authenticated' });
      return;
    }

    const { email, firstName, lastName, address, apartment, city, state, pincode, phone } =
      req.body as {
        email: string;
        firstName: string;
        lastName: string;
        address: string;
        apartment?: string;
        city: string;
        state: string;
        pincode: string;
        phone: string;
      };

    if (!email || !firstName || !lastName || !address || !city || !state || !pincode || !phone) {
      res.status(400).json({ message: 'Missing required fields' });
      return;
    }

    const saved = await prisma.address.upsert({
      where: { userId },
      update: {
        email,
        firstName,
        lastName,
        address,
        apartment: apartment ?? '',
        city,
        state,
        pincode,
        phone,
      },
      create: {
        userId,
        email,
        firstName,
        lastName,
        address,
        apartment: apartment ?? '',
        city,
        state,
        pincode,
        phone,
      },
    });

    res.status(200).json(saved);
  } catch (error) {
    console.error('saveAddress error:', error);
    res.status(500).json({ message: 'Failed to save address' });
  }
};

// DELETE /api/address
export const deleteAddress = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = await getUserIdFromSession(req);
    if (!userId) {
      res.status(401).json({ message: 'Not authenticated' });
      return;
    }

    const existing = await prisma.address.findUnique({ where: { userId } });

    if (!existing) {
      res.json({ message: 'No address found' });
      return;
    }

    await prisma.address.delete({ where: { userId } });

    res.json({ message: 'Address deleted' });
  } catch (error) {
    console.error('deleteAddress error:', error);
    res.status(500).json({ message: 'Failed to delete address' });
  }
};
