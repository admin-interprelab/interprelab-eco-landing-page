# Supabase Setup Guide for InterpreLab

This guide will help you set up Supabase for the InterpreLab ecosystem, including authentication, database tables, and Row Level Security (RLS) policies.

## Prerequisites

- Supabase account (https://supabase.com)
- Node.js and npm/yarn installed
- InterpreLab project cloned locally

## 1. Create a New Supabase Project

1. Go to https://supabase.com and sign in
2. Click "New Project"
3. Choose your organization
4. Enter project details:
   - Name: `interprelab-ecosystem`
   - Database Password: (generate a strong password)
   - Region: Choose closest to your users
5. Click "Create new project"

## 2. Environment Variables

Create a `.env.local` file in your project root with the following variables:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

You can find these values in your Supabase project dashboard under Settings > API.

## 3. Database Schema

Run the following SQL commands in your Supabase SQL Editor to create the necessary tables:

### User Settings Table

```sql
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
```

### Call Logs Table

```sql
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
```

### Study Progress Table

```sql
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
```

### User Profiles Table

```sql
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
```

## 4. Row Level Security (RLS) Policies

Enable RLS and create policies for each table:

### Enable RLS

```sql
ALTER TABLE user_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE call_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE study_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
```

### User Settings Policies

```sql
-- Users can view their own settings
CREATE POLICY "Users can view own settings" ON user_settings
  FOR SELECT USING (auth.uid() = user_id);

-- Users can insert their own settings
CREATE POLICY "Users can insert own settings" ON user_settings
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can update their own settings
CREATE POLICY "Users can update own settings" ON user_settings
  FOR UPDATE USING (auth.uid() = user_id);

-- Users can delete their own settings
CREATE POLICY "Users can delete own settings" ON user_settings
  FOR DELETE USING (auth.uid() = user_id);
```

### Call Logs Policies

```sql
-- Users can view their own call logs
CREATE POLICY "Users can view own call logs" ON call_logs
  FOR SELECT USING (auth.uid() = user_id);

-- Users can insert their own call logs
CREATE POLICY "Users can insert own call logs" ON call_logs
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can update their own call logs
CREATE POLICY "Users can update own call logs" ON call_logs
  FOR UPDATE USING (auth.uid() = user_id);

-- Users can delete their own call logs
CREATE POLICY "Users can delete own call logs" ON call_logs
  FOR DELETE USING (auth.uid() = user_id);
```

## 5. Database Functions

Create helpful database functions:

### Update Timestamp Function

```sql
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';
```

### Apply Update Triggers

```sql
CREATE TRIGGER update_user_settings_updated_at BEFORE UPDATE ON user_settings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_call_logs_updated_at BEFORE UPDATE ON call_logs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_profiles_updated_at BEFORE UPDATE ON user_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

## 6. Authentication Setup

### Email Templates (Optional)

You can customize email templates in Authentication > Templates:

1. **Confirm signup**: Welcome message with confirmation link
2. **Reset password**: Password reset instructions
3. **Magic link**: Sign-in link for passwordless authentication

### Auth Settings

In Authentication > Settings, configure:

- **Site URL**: Your production domain
- **Redirect URLs**: Add your development and production URLs
- **Email Auth**: Enable/disable as needed
- **Phone Auth**: Configure if using phone authentication
