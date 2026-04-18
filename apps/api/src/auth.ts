import 'dotenv/config';
import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL ?? 'http://localhost:3001',
  database: prismaAdapter(prisma, { provider: 'mongodb' }),
  trustedOrigins: ['http://localhost:5173'],

  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    requireEmailVerification: false,
  },

  emailVerification: {
    sendVerificationEmail: async ({ user, url }: { user: { email: string }; url: string }) => {
      const apiKey = process.env.RESEND_API_KEY ?? '';
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`, // ✅ no longer string | undefined
        },
        body: JSON.stringify({
          from: 'JoJo Flora <no-reply@yourdomain.com>',
          to: user.email,
          subject: 'Verify your email',
          html: `<p>Click <a href="${url}">here</a> to verify your email.</p>`,
        }),
      });
    },
  },

  user: {
    additionalFields: {
      phone: {
        type: 'string',
        required: false,
        defaultValue: '',
        input: true,
      },
    },
  },
});
