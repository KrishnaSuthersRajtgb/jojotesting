import { Router, Request, Response, NextFunction } from 'express';
import { type RequestHandler } from 'express';
import passport from '../config/passport.js';
import jwt from 'jsonwebtoken';

const router = Router();

// ✅ cast to RequestHandler to avoid "unsafe call of any typed value"
const googleAuth = passport.authenticate('google', {
  scope: ['profile', 'email'],
}) as RequestHandler;

const googleCallback = passport.authenticate('google', {
  session: false,
  failureRedirect: 'http://localhost:5173/login',
}) as RequestHandler;

router.get('/', (req: Request, res: Response, next: NextFunction) => {
  console.log('✅ STEP A — /api/google hit');
  googleAuth(req, res, next);
});

router.get(
  '/callback',
  (req: Request, res: Response, next: NextFunction) => {
    console.log('✅ STEP B — /api/google/callback hit');
    googleCallback(req, res, next);
  },
  (req: Request, res: Response) => {
    console.log('✅ STEP C — passport done, req.user =', req.user);

    const user = req.user as
      | {
          id: string;
          email: string;
          name: string;
          phone?: string;
          emailVerified?: boolean;
        }
      | undefined;

    if (!user) {
      console.log('❌ STEP C — req.user is undefined!');
      // ✅ fixed: move value before return
      res.redirect('http://localhost:5173/login');
      return;
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        name: user.name,
        phone: user.phone ?? null,
        emailVerified: user.emailVerified ?? false,
      },
      process.env.JWT_SECRET as string,
      { expiresIn: '7d' },
    );

    console.log('✅ STEP D — JWT created, redirecting with token');
    res.redirect(`http://localhost:5173/google-success?token=${token}`);
  },
);

export default router;
