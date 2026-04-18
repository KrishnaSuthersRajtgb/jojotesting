import passport from 'passport';
import { Strategy as GoogleStrategy, Profile } from 'passport-google-oauth20';
import { PrismaClient } from '@prisma/client';
import { randomUUID } from 'crypto';

const prisma = new PrismaClient();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      callbackURL: '/api/google/callback',
    },
    // ✅ void return type — fixes "Promise returned where void expected"
    (accessToken, refreshToken, profile: Profile, done): void => {
      const email = profile.emails?.[0]?.value;
      const name = profile.displayName;

      if (!email) {
        done(new Error('No email found'), undefined);
        return;
      }

      prisma.user
        .upsert({
          where: { email },
          update: {},
          create: {
            id: randomUUID(),
            email,
            name,
          },
        })
        .then((user) => {
          done(null, user);
        })
        .catch((error: unknown) => {
          done(error instanceof Error ? error : new Error(String(error)), undefined);
        });
    },
  ),
);

export default passport;
