import type { Request, Response } from 'express';
import {
  deleteOtp,
  findOtp,
  incrementAttempts,
  upsertOtp,
  MAX_ATTEMPTS,
} from '../models/otp.model.js';
import { sendSmsOtp } from '../services/sms.service.js';

interface SendOtpBody {
  phone?: string;
}

interface VerifyOtpBody {
  phone?: string;
  otp?: string;
}

const generateOtp = (): string => Math.floor(100000 + Math.random() * 900000).toString();

export const sendOtp = async (req: Request, res: Response): Promise<void> => {
  const { phone } = req.body as SendOtpBody;

  const normalized = phone?.replace(/^\+91/, '').replace(/\s+/g, '') ?? '';
  if (!phone || normalized.length !== 10) {
    res.status(400).json({ message: 'Valid 10-digit phone number is required' });
    return;
  }

  try {
    const otp = generateOtp();
    await upsertOtp(phone, otp);
    await sendSmsOtp(phone, otp);
    res.status(200).json({ message: 'OTP sent successfully' });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to send OTP';
    res.status(500).json({ message });
  }
};

export const verifyOtp = async (req: Request, res: Response): Promise<void> => {
  const { phone, otp } = req.body as VerifyOtpBody;

  if (!phone || !otp) {
    res.status(400).json({ message: 'Phone and OTP are required' });
    return;
  }

  try {
    const entry = await findOtp(phone);

    if (!entry) {
      res.status(400).json({ message: 'OTP not found. Please request a new one.' });
      return;
    }

    if (new Date() > entry.expiresAt) {
      await deleteOtp(phone);
      res.status(400).json({ message: 'OTP expired. Please request a new one.' });
      return;
    }

    if (entry.attempts >= MAX_ATTEMPTS) {
      await deleteOtp(phone);
      res.status(400).json({ message: 'Too many attempts. Please request a new OTP.' });
      return;
    }

    if (entry.code !== otp) {
      await incrementAttempts(phone);
      const remaining = MAX_ATTEMPTS - (entry.attempts + 1);
      res.status(400).json({ message: `Invalid OTP. ${String(remaining)} attempts left.` });
      return;
    }

    await deleteOtp(phone);
    res.status(200).json({ message: 'OTP verified successfully.' });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Verification failed';
    res.status(500).json({ message });
  }
};
