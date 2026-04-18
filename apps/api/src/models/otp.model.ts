import { prisma } from '../lib/prisma.js';
import type { Otp } from '@prisma/client';

const OTP_EXPIRY_MS = 5 * 60 * 1000; // 5 minutes
export const MAX_ATTEMPTS = 3;

export const upsertOtp = async (phone: string, code: string): Promise<void> => {
  await prisma.otp.upsert({
    where: { phone },
    update: {
      code,
      expiresAt: new Date(Date.now() + OTP_EXPIRY_MS),
      attempts: 0,
    },
    create: {
      phone,
      code,
      expiresAt: new Date(Date.now() + OTP_EXPIRY_MS),
      attempts: 0,
    },
  });
};

export const findOtp = (phone: string): Promise<Otp | null> => {
  return prisma.otp.findUnique({ where: { phone } });
};

export const incrementAttempts = async (phone: string): Promise<void> => {
  await prisma.otp.update({
    where: { phone },
    data: { attempts: { increment: 1 } },
  });
};

export const deleteOtp = async (phone: string): Promise<void> => {
  await prisma.otp.delete({ where: { phone } });
};
