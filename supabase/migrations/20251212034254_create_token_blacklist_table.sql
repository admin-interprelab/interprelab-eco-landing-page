-- Create token_blacklist table for JWT token revocation
CREATE TABLE IF NOT EXISTS token_blacklist (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  token_hash TEXT NOT NULL UNIQUE,
  user_id TEXT NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  blacklisted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_token_blacklist_hash ON token_blacklist(token_hash);
CREATE INDEX IF NOT EXISTS idx_token_blacklist_expires ON token_blacklist(expires_at);
CREATE INDEX IF NOT EXISTS idx_token_blacklist_user ON token_blacklist(user_id);

-- Add comment to table
COMMENT ON TABLE token_blacklist IS 'Stores revoked JWT tokens to prevent reuse after signout';

-- Enable Row Level Security
ALTER TABLE token_blacklist ENABLE ROW LEVEL SECURITY;

-- Create policy: Service role can do everything
-- Note: This policy allows the service role (used by auth service) to manage tokens
CREATE POLICY "Service role full access" ON token_blacklist
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Create policy: Authenticated users can only view their own blacklisted tokens
CREATE POLICY "Users can view own tokens" ON token_blacklist
  FOR SELECT
  TO authenticated
  USING (auth.uid()::text = user_id);
