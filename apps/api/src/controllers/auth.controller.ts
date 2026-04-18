import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { Resend } from 'resend';
import mongoose from 'mongoose';
// ✅ use better-auth's own hash function — guaranteed to match what sign-in/email verifies
import { hashPassword } from 'better-auth/crypto';
import User from '../models/user.model.js';

interface RegisterBody {
  name: string;
  email: string;
  phone: string;
  password: string;
}

interface LoginBody {
  email: string;
  password: string;
}

interface ForgotPasswordBody {
  email: string;
}

interface ResetPasswordBody {
  token: string;
  password: string;
}

interface BetterAuthUser {
  _id: string;
  name: string;
  email: string;
  password?: string;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
}

export const registerUser = async (
  req: Request<Record<string, never>, unknown, RegisterBody>,
  res: Response,
): Promise<Response> => {
  try {
    const { name, email, phone, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Name, email and password are required',
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User already exists',
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const forwarded = req.headers['x-forwarded-for'] as string | undefined;
    const ipAddress = forwarded ? (forwarded.split(',')[0] ?? forwarded).trim() : (req.ip ?? '');

    const user = await User.create({
      name,
      email,
      phone: phone || '',
      password: hashedPassword,
      ipAddress,
    });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, {
      expiresIn: '7d',
    });

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({
      success: true,
      message: 'User registered successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
      },
    });
  } catch (error) {
    console.error('Register Error:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const loginUser = async (
  req: Request<Record<string, never>, unknown, LoginBody>,
  res: Response,
): Promise<Response> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, {
      expiresIn: '7d',
    });

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: 'Login successful',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
      },
    });
  } catch (error) {
    console.error('Login Error:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const logoutUser = (_req: Request, res: Response): Response => {
  res.clearCookie('token');
  return res.status(200).json({ success: true, message: 'Logged out' });
};

export const getMe = async (req: Request, res: Response): Promise<Response> => {
  try {
    const token = req.cookies.token as string | undefined;

    if (!token) {
      return res.status(401).json({ success: false, message: 'Not authenticated' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };
    const user = await User.findById(decoded.id).select('-password');

    if (!user) {
      return res.status(401).json({ success: false, message: 'User not found' });
    }

    return res.status(200).json({ success: true, user });
  } catch {
    return res.status(401).json({ success: false, message: 'Invalid session' });
  }
};

export const forgotPassword = async (
  req: Request<Record<string, never>, unknown, ForgotPasswordBody>,
  res: Response,
): Promise<Response> => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ success: false, message: 'Email is required' });
    }

    const betterAuthUser = (await mongoose.connection
      .collection('User')
      .findOne({ email })) as BetterAuthUser | null;

    if (!betterAuthUser) {
      return res.status(200).json({
        success: true,
        message: 'If this email exists, a reset link has been sent',
      });
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    await mongoose.connection.collection('User').updateOne(
      { email },
      {
        $set: {
          resetPasswordToken: hashedToken,
          resetPasswordExpires: new Date(Date.now() + 60 * 60 * 1000),
        },
      },
    );

    const resetURL = `http://localhost:5173/reset-password?token=${resetToken}`;
    const resend = new Resend(process.env.RESEND_API_KEY);

    const { error: resendError } = await resend.emails.send({
      from: 'JoJo Flora <onboarding@resend.dev>',
      to: 'letnexttechnologies@gmail.com',
      subject: 'Reset your password',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 480px; margin: auto;">
          <h2>Reset your password</h2>
          <p>Hi ${betterAuthUser.name},</p>
          <p>Click the button below to reset your password. This link expires in <strong>1 hour</strong>.</p>
          <a href="${resetURL}"
            style="display:inline-block;padding:12px 24px;background:#2563eb;color:#fff;border-radius:6px;text-decoration:none;font-weight:bold;">
            Reset Password
          </a>
          <p style="margin-top:16px;color:#666;">If you didn't request this, ignore this email.</p>
        </div>
      `,
    });

    if (resendError) {
      console.error('Resend send failed:', resendError);
      return res.status(500).json({ success: false, message: 'Failed to send reset email' });
    }

    return res.status(200).json({
      success: true,
      message: 'If this email exists, a reset link has been sent',
    });
  } catch (error) {
    console.error('Forgot Password Error:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const resetPassword = async (
  req: Request<Record<string, never>, unknown, ResetPasswordBody>,
  res: Response,
): Promise<Response> => {
  try {
    const { token, password } = req.body;

    if (!token || !password) {
      return res.status(400).json({ success: false, message: 'Token and password are required' });
    }

    if (password.length < 8) {
      return res
        .status(400)
        .json({ success: false, message: 'Password must be at least 8 characters' });
    }

    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    const betterAuthUser = (await mongoose.connection.collection('User').findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: new Date() },
    })) as BetterAuthUser | null;

    if (!betterAuthUser) {
      return res.status(400).json({ success: false, message: 'Invalid or expired reset token' });
    }

    // ✅ use better-auth's own hashPassword — identical format to what sign-in/email verifies
    const newHashedPassword = await hashPassword(password);

    // ✅ update Account collection where better-auth stores credentials
    await mongoose.connection
      .collection('Account')
      .updateOne({ userId: betterAuthUser._id }, { $set: { password: newHashedPassword } });

    // ✅ clear reset token from User collection
    await mongoose.connection
      .collection('User')
      .updateOne(
        { resetPasswordToken: hashedToken },
        { $unset: { resetPasswordToken: '', resetPasswordExpires: '' } },
      );

    return res.status(200).json({ success: true, message: 'Password reset successfully' });
  } catch (error) {
    console.error('Reset Password Error:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};
