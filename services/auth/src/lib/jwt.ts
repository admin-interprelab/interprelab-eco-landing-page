import jwt from 'jsonwebtoken';
import { config } from '../config/env.js';

export interface JWTPayload {
  userId: string;
  email: string;
  roles?: string[];
}

/**
 * Generate a JWT token with user information
 * @param userId - User ID from Supabase
 * @param email - User email
 * @param roles - Optional user roles
 * @returns Signed JWT token
 */
export function generateToken(userId: string, email: string, roles: string[] = []): string {
  const payload: JWTPayload = {
    userId,
    email,
    roles,
  };

  return jwt.sign(payload, config.JWT_SECRET, {
    expiresIn: '7d',
    issuer: 'interprelab-auth',
    audience: 'interprelab-services',
  });
}

/**
 * Verify and decode a JWT token
 * @param token - JWT token to verify
 * @returns Decoded payload or null if invalid
 */
export function verifyToken(token: string): JWTPayload | null {
  try {
    const decoded = jwt.verify(token, config.JWT_SECRET, {
      issuer: 'interprelab-auth',
      audience: 'interprelab-services',
    }) as JWTPayload;

    return decoded;
  } catch (error) {
    return null;
  }
}

/**
 * Extract token from cookies object
 * @param cookies - Request cookies
 * @returns Token string or undefined
 */
export function extractTokenFromCookie(cookies: Record<string, string>): string | undefined {
  return cookies.auth_token;
}
