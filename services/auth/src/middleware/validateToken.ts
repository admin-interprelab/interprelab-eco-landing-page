import { Request, Response, NextFunction } from 'express';
import { verifyToken, extractTokenFromCookie, JWTPayload } from '../lib/jwt.js';
import { isBlacklisted } from '../services/tokenBlacklist.js';

// Extend Express Request type to include user
declare global {
  namespace Express {
    interface Request {
      user?: JWTPayload;
    }
  }
}

/**
 * Middleware to validate JWT token from cookies
 * Attaches decoded user to req.user if valid
 */
export async function validateToken(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    // Extract token from cookie
    const token = extractTokenFromCookie(req.cookies);

    if (!token) {
      res.status(401).json({ error: 'No authentication token provided' });
      return;
    }

    // Check if token is blacklisted
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

    // Attach user to request
    req.user = decoded;
    next();
  } catch (error) {
    console.error('Token validation error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
