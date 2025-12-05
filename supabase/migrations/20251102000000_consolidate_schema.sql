-- Consolidate schema and ensure all tables exist
-- This migration ensures we have all necessary tables for the consolidated app

-- Check if call_records table exists, if not create it
DO $$
BEGIN
    IF NOT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'call_records') THEN
        CREATE TABLE call_records (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            user_id UUID REFERENCES auth.users(id) NOT NULL,
            start_time TIMESTAMPTZ NOT NULL,
            end_time TIMESTAMPTZ NOT NULL,
            duration INT NOT NULL,
            earnings NUMERIC(10, 2) NOT NULL,
            platform TEXT,
            call_type TEXT NOT NULL,
            created_at TIMESTAMPTZ DEFAULT NOW()
        );

        -- Enable RLS
        ALTER TABLE call_records ENABLE ROW LEVEL SECURITY;

        -- RLS Policies
        CREATE POLICY "Users can view their own call records"
        ON call_records FOR SELECT
        USING (auth.uid() = user_id);

        CREATE POLICY "Users can insert their own call records"
        ON call_records FOR INSERT
        WITH CHECK (auth.uid() = user_id);

        CREATE POLICY "Users can update their own call records"
        ON call_records FOR UPDATE
        USING (auth.uid() = user_id);

        CREATE POLICY "Users can delete their own call records"
        ON call_records FOR DELETE
        USING (auth.uid() = user_id);
    END IF;
END $$;

-- Check if user_preferences table exists, if not create it
DO $$
BEGIN
    IF NOT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'user_preferences') THEN
        CREATE TABLE user_preferences (
            user_id UUID PRIMARY KEY REFERENCES auth.users(id),
            pay_per_minute_usd NUMERIC(10, 2) DEFAULT 0.75,
            target_currency TEXT DEFAULT 'MXN',
            rounding TEXT DEFAULT 'up'
        );

        -- Enable RLS
        ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;

        -- RLS Policies
        CREATE POLICY "Users can view their own preferences"
        ON user_preferences FOR SELECT
        USING (auth.uid() = user_id);

        CREATE POLICY "Users can insert their own preferences"
        ON user_preferences FOR INSERT
        WITH CHECK (auth.uid() = user_id);

        CREATE POLICY "Users can update their own preferences"
        ON user_preferences FOR UPDATE
        USING (auth.uid() = user_id);
    END IF;
END $$;

-- Add any missing indexes for performance
CREATE INDEX IF NOT EXISTS idx_call_records_user_id ON call_records(user_id);
CREATE INDEX IF NOT EXISTS idx_call_records_created_at ON call_records(created_at);
CREATE INDEX IF NOT EXISTS idx_call_logs_user_id ON call_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_call_logs_created_at ON call_logs(created_at);
