import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export const userRouter = Router();

userRouter.get('/', async (_req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});
