-- Complete InterpreLab Database Schema
-- This migration adds all necessary tables for the InterpreLab ecosystem

-- Drop existing tables if they exist (to avoid conflicts)
DROP TABLE IF EXISTS call_records CASCADE;
DROP TABLE IF EXISTS user_preferences CASCADE;

-- User Settings Table (replaces user_preferences with better structure)
CREATE TABLE user_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  pay_rate DECIMAL(10,2) DEFAULT 0.75,
  pay_rate_type TEXT DEFAULT 'per_minute' CHECK (pay_rate_type IN ('per_hour', 'per_minute')),
  preferred_currency TEXT DEFAULT 'USD',
  preferred_language TEXT DEFAULT 'en',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Call Logs Table (replaces call_records with better structure)
CREATE TABLE call_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  start_time TIMESTAMPTZ NOT NULL,
  end_time TIMESTAMPTZ NOT NULL,
  duration_seconds INTEGER NOT NULL,
  earnings DECIMAL(10,2) DEFAULT 0,
  currency TEXT DEFAULT 'USD',
  platform TEXT,
  call_type TEXT CHECK (call_type IN ('VRI', 'OPI', 'Phone', 'Video', 'Other')),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Study Progress Table
CREATE TABLE study_progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  module_id TEXT NOT NULL,
  module_type TEXT NOT NULL CHECK (module_type IN ('ethics', 'terminology', 'practice')),
  completed_at TIMESTAMPTZ DEFAULT NOW(),
  score INTEGER CHECK (score >= 0 AND score <= 100),
  time_spent_seconds INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, module_id)
);

-- User Profiles Table
CREATE TABLE user_profiles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  languages TEXT[], -- Array of language codes
  certifications TEXT[], -- Array of certification names
  experience_years INTEGER DEFAULT 0,
  specializations TEXT[], -- Array of specialization areas
  bio TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Enable Row Level Security
ALTER TABLE user_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE call_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE study_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- User Settings Policies
CREATE POLICY "Users can view own settings" ON user_settings
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own settings" ON user_settings
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own settings" ON user_settings
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own settings" ON user_settings
  FOR DELETE USING (auth.uid() = user_id);

-- Call Logs Policies
CREATE POLICY "Users can view own call logs" ON call_logs
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own call logs" ON call_logs
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own call logs" ON call_logs
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own call logs" ON call_logs
  FOR DELETE USING (auth.uid() = user_id);

-- Study Progress Policies
CREATE POLICY "Users can view own study progress" ON study_progress
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own study progress" ON study_progress
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own study progress" ON study_progress
  FOR UPDATE USING (auth.uid() = user_id);

-- User Profiles Policies
CREATE POLICY "Users can view own profile" ON user_profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own profile" ON user_profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own profile" ON user_profiles
  FOR UPDATE USING (auth.uid() = user_id);

-- Create update timestamp function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply update triggers
CREATE TRIGGER update_user_settings_updated_at BEFORE UPDATE ON user_settings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_call_logs_updated_at BEFORE UPDATE ON call_logs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_profiles_updated_at BEFORE UPDATE ON user_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX idx_call_logs_user_id ON call_logs(user_id);
CREATE INDEX idx_call_logs_start_time ON call_logs(start_time);
CREATE INDEX idx_study_progress_user_id ON study_progress(user_id);
CREATE INDEX idx_user_profiles_user_id ON user_profiles(user_id);
