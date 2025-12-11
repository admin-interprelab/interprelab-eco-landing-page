import { createClient } from '@supabase/supabase-js';
import { config } from '../config/env.js';
import crypto from 'crypto';

// Create Firestore-compatible client (using Supabase for now as the spec uses Firestore)
// Note: This implementation uses a simple in-memory cache for demo
// In production, this should use Firestore or a Redis cache

const blacklistCache = new Map<string, { userId: string; expiresAt: Date }>();

/**
 * Generate a hash of the token for storage
 */
function hashToken(token: string): string {
  return crypto.createHash('sha256').update(token).digest('hex');
}

/**
 * Add a token to the blacklist
 * @param token - JWT token to blacklist
 * @param userId - User ID associated with the token
 * @param expiresAt - When the token expires
 */
export async function addToBlacklist(
  token: string,
  userId: string,
  expiresAt: Date
): Promise<void> {
  const tokenHash = hashToken(token);
  
  // Store in cache (in production, this would be Firestore)
  blacklistCache.set(tokenHash, {
    userId,
    expiresAt,
  });

  // TODO: Implement Firestore storage
  // await firestore.collection('auth').doc('blacklist').collection('tokens').doc(tokenHash).set({
  //   userId,
  //   tokenHash,
  //   expiresAt: Timestamp.fromDate(expiresAt),
  //   blacklistedAt: Timestamp.now(),
  // });
}

/**
 * Check if a token is blacklisted
 * @param token - JWT token to check
 * @returns True if blacklisted, false otherwise
 */
export async function isBlacklisted(token: string): Promise<boolean> {
  const tokenHash = hashToken(token);
  
  // Check cache
  const entry = blacklistCache.get(tokenHash);
  if (entry) {
    // Remove expired entries
    if (entry.expiresAt < new Date()) {
      blacklistCache.delete(tokenHash);
      return false;
    }
    return true;
  }

  // TODO: Implement Firestore lookup
  // const doc = await firestore
  //   .collection('auth')
  //   .doc('blacklist')
  //   .collection('tokens')
  //   .doc(tokenHash)
  //   .get();
  
  // return doc.exists && doc.data()?.expiresAt.toDate() > new Date();

  return false;
}

/**
 * Clean up expired tokens from the blacklist
 * This should be run periodically (e.g., via cron job)
 */
export async function cleanupExpiredTokens(): Promise<void> {
  const now = new Date();
  
  // Clean up in-memory cache
  for (const [hash, entry] of blacklistCache.entries()) {
    if (entry.expiresAt < now) {
      blacklistCache.delete(hash);
    }
  }

  // TODO: Implement Firestore cleanup
  // const expiredTokens = await firestore
  //   .collection('auth')
  //   .doc('blacklist')
  //   .collection('tokens')
  //   .where('expiresAt', '<', Timestamp.fromDate(now))
  //   .get();
  
  // const batch = firestore.batch();
  // expiredTokens.docs.forEach(doc => batch.delete(doc.ref));
  // await batch.commit();
}

// Schedule cleanup every hour
setInterval(cleanupExpiredTokens, 60 * 60 * 1000);
