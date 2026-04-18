import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import { toNodeHandler } from 'better-auth/node';

import './config/passport.js';

import { healthRouter } from './routes/health.router.js';
import { errorHandler } from './middleware/errorHandler.js';
import { auth } from './auth.js';
import { userRouter } from './routes/user.router.js';
import authRoutes from './routes/auth.routes.js';
import googleRoutes from './routes/google.routes.js';
import wishlistRoutes from './routes/wishlistRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import addressRoutes from './routes/addressRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import otpRoutes from './routes/otp.routes.js';

export const app = express();

app.set('trust proxy', true);

app.use(
  cors({
    origin: ['http://localhost:5173'],
    credentials: true,
  }),
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());

// ✅ better-auth owns ALL /api/auth/* — must be before other routes
app.all('/api/auth/*path', toNodeHandler(auth));

app.use('/health', healthRouter);
app.use('/api/users', userRouter);
app.use('/api/wishlist', wishlistRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/address', addressRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/otp', otpRoutes);

// ✅ moved to /api/user to avoid better-auth conflict
app.use('/api/user', authRoutes);

app.use('/api/google', googleRoutes);

app.use((_req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

app.use(errorHandler);

app.listen(3001, () => {
  console.log('🚀 Server running on http://localhost:3001');
});
