import { Router } from 'express';
import mongoose from 'mongoose';
import {
  registerUser,
  loginUser,
  logoutUser,
  getMe,
  forgotPassword,
  resetPassword,
} from '../controllers/auth.controller.js';

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.get('/me', getMe);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

// ✅ TEMPORARY — remove after debugging
router.get('/debug-account', async (_req, res) => {
  try {
    const accounts = await mongoose.connection.collection('Account').find({}).toArray();
    console.log('🔑 All accounts:', JSON.stringify(accounts, null, 2));
    res.json({ accounts });
  } catch (err) {
    res.status(500).json({ err });
  }
});

export default router;
