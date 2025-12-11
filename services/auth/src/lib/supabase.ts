import { createClient } from '@supabase/supabase-js';
import { config } from '../config/env.js';

// Initialize Supabase client with service key for server-side operations
export const supabase = createClient(
  config.SUPABASE_URL,
  config.SUPABASE_SERVICE_KEY,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);
