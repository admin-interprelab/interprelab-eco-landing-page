import express, { Request, Response } from 'express';
import { supabase } from '../lib/supabase.js';
import { generateToken, verifyToken, extractTokenFromCookie } from '../lib/jwt.js';
import { addToBlacklist, isBlacklisted } from '../services/tokenBlacklist.js';

const router = express.Router();

/**
 * POST /api/auth/signin
 * Sign in with email and password
 */
router.post('/signin', async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ error: 'Email and password are required' });
      return;
    }

    // Authenticate with Supabase
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      res.status(401).json({ error: error.message });
      return;
    }

    if (!data.user) {
      res.status(401).json({ error: 'Authentication failed' });
      return;
    }

    // Generate JWT token
    const token = generateToken(data.user.id, data.user.email!);

    // Set HTTP-only secure cookie
    res.cookie('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.json({
      user: {
        id: data.user.id,
        email: data.user.email,
        role: data.user.role,
      },
    });
  } catch (error) {
    console.error('Signin error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * POST /api/auth/signout
 * Sign out and blacklist the current token
 */
router.post('/signout', async (req: Request, res: Response): Promise<void> => {
  try {
    // Extract token from cookie
    const token = extractTokenFromCookie(req.cookies);

    if (token) {
      // Decode to get expiration
      const decoded = verifyToken(token);
      if (decoded) {
        // Add token to blacklist
        const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
        await addToBlacklist(token, decoded.userId, expiresAt);
      }
    }

    // Sign out from Supabase
    await supabase.auth.signOut();

    // Clear cookie
    res.clearCookie('auth_token');

    res.json({ message: 'Signed out successfully' });
  } catch (error) {
    console.error('Signout error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * GET /api/auth/validate
 * Validate the current token
 */
router.get('/validate', async (req: Request, res: Response): Promise<void> => {
  try {
    // Extract token from cookie
    const token = extractTokenFromCookie(req.cookies);

    if (!token) {
      res.status(401).json({ error: 'No token provided' });
      return;
    }

    // Check if blacklisted
    const blacklisted = await isBlacklisted(token);
    if (blacklisted) {
      res.status(401).json({ error: 'Token has been revoked' });
      return;
    }

    // Verify token
    const decoded = verifyToken(token);
    if (!decoded) {
      res.status(401).json({ error: 'Invalid or expired token' });
      return;
    }

    res.json({
      valid: true,
      user: {
        userId: decoded.userId,
        email: decoded.email,
        roles: decoded.roles,
      },
    });
  } catch (error) {
    console.error('Validate error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * POST /api/auth/refresh
 * Refresh the authentication token
 */
router.post('/refresh', async (req: Request, res: Response): Promise<void> => {
  try {
    // Refresh session with Supabase
    const { data, error } = await supabase.auth.refreshSession();

    if (error || !data.user) {
      res.status(401).json({ error: 'Failed to refresh session' });
      return;
    }

    // Generate new JWT token
    const token = generateToken(data.user.id, data.user.email!);

    // Set new cookie
    res.cookie('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.json({
      user: {
        id: data.user.id,
        email: data.user.email,
        role: data.user.role,
      },
    });
  } catch (error) {
    console.error('Refresh error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
