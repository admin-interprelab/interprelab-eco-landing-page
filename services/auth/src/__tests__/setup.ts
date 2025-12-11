import { beforeAll } from 'vitest';
import dotenv from 'dotenv';

// Load test environment variables
beforeAll(() => {
  dotenv.config({ path: '.env.test' });
  
  // Set test environment variables if not set
  if (!process.env.JWT_SECRET) {
    process.env.JWT_SECRET = 'test-secret-key-at-least-32-characters-long-for-testing';
  }
  if (!process.env.SUPABASE_URL) {
    process.env.SUPABASE_URL = 'https://test.supabase.co';
  }
  if (!process.env.SUPABASE_SERVICE_KEY) {
    process.env.SUPABASE_SERVICE_KEY = 'test-service-key';
  }
  if (!process.env.ALLOWED_ORIGINS) {
    process.env.ALLOWED_ORIGINS = 'http://localhost:5173';
  }
  if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = 'test';
  }
});
