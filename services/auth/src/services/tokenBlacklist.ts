import { createClient } from '@supabase/supabase-js';
import { config } from '../config/env.js';
import crypto from 'crypto';

// Create Supabase client for token blacklist management
const supabase = createClient(config.SUPABASE_URL, config.SUPABASE_SERVICE_KEY);

/**
 * Generate a hash of the token for storage
 * Using SHA-256 to avoid storing actual tokens in the database
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
  
  try {
    const { error } = await supabase
      .from('token_blacklist')
      .insert({
        token_hash: tokenHash,
        user_id: userId,
        expires_at: expiresAt.toISOString(),
      });

    if (error) {
      console.error('Failed to blacklist token:', error);
      throw new Error('Failed to blacklist token');
    }
  } catch (error) {
    console.error('Error adding token to blacklist:', error);
    throw error;
  }
}

/**
 * Check if a token is blacklisted
 * @param token - JWT token to check
 * @returns True if blacklisted, false otherwise
 */
export async function isBlacklisted(token: string): Promise<boolean> {
  const tokenHash = hashToken(token);
  
  try {
    const { data, error } = await supabase
      .from('token_blacklist')
      .select('expires_at')
      .eq('token_hash', tokenHash)
      .maybeSingle();

    if (error) {
      console.error('Error checking token blacklist:', error);
      return false;
    }

    if (!data) {
      return false;
    }

    // Check if the token has expired
    const expiresAt = new Date(data.expires_at);
    if (expiresAt < new Date()) {
      // Token has expired, clean it up
      await supabase
        .from('token_blacklist')
        .delete()
        .eq('token_hash', tokenHash);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error checking token blacklist:', error);
    return false;
  }
}

/**
 * Clean up expired tokens from the blacklist
 * This should be run periodically (e.g., via cron job)
 */
export async function cleanupExpiredTokens(): Promise<void> {
  const now = new Date();
  
  try {
    const { error } = await supabase
      .from('token_blacklist')
      .delete()
      .lt('expires_at', now.toISOString());

    if (error) {
      console.error('Failed to cleanup expired tokens:', error);
    } else {
      console.log('Successfully cleaned up expired tokens');
    }
  } catch (error) {
    console.error('Error during token cleanup:', error);
  }
}

// Schedule cleanup every hour
setInterval(cleanupExpiredTokens, 60 * 60 * 1000);

// Run initial cleanup on startup
cleanupExpiredTokens().catch(console.error);
