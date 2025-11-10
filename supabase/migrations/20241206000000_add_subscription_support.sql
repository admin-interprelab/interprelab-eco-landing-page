-- Add subscription support to the InterpreLab database
-- This migration adds tables for managing user subscriptions and premium features

-- Subscription Plans Table
CREATE TABLE subscription_plans (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price_monthly DECIMAL(10,2),
  price_yearly DECIMAL(10,2),
  features JSONB DEFAULT '{}',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- User Subscriptions Table
CREATE TABLE user_subscriptions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  plan_id UUID REFERENCES subscription_plans(id) ON DELETE SET NULL,
  status TEXT NOT NULL CHECK (status IN ('active', 'canceled', 'past_due', 'trialing', 'incomplete')),
  current_period_start TIMESTAMPTZ,
  current_period_end TIMESTAMPTZ,
  trial_start TIMESTAMPTZ,
  trial_end TIMESTAMPTZ,
  canceled_at TIMESTAMPTZ,
  stripe_subscription_id TEXT,
  stripe_customer_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Premium Feature Usage Table (for tracking feature usage and limits)
CREATE TABLE premium_feature_usage (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  feature_name TEXT NOT NULL,
  usage_count INTEGER DEFAULT 0,
  last_used_at TIMESTAMPTZ DEFAULT NOW(),
  period_start TIMESTAMPTZ DEFAULT NOW(),
  period_end TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '1 month'),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, feature_name, period_start)
);

-- Enable Row Level Security
ALTER TABLE subscription_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE premium_feature_usage ENABLE ROW LEVEL SECURITY;

-- Subscription Plans Policies (public read for plan information)
CREATE POLICY "Anyone can view active subscription plans" ON subscription_plans
  FOR SELECT USING (is_active = true);

-- User Subscriptions Policies
CREATE POLICY "Users can view own subscription" ON user_subscriptions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own subscription" ON user_subscriptions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own subscription" ON user_subscriptions
  FOR UPDATE USING (auth.uid() = user_id);

-- Premium Feature Usage Policies
CREATE POLICY "Users can view own feature usage" ON premium_feature_usage
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own feature usage" ON premium_feature_usage
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own feature usage" ON premium_feature_usage
  FOR UPDATE USING (auth.uid() = user_id);

-- Apply update triggers
CREATE TRIGGER update_subscription_plans_updated_at BEFORE UPDATE ON subscription_plans
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_subscriptions_updated_at BEFORE UPDATE ON user_subscriptions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_premium_feature_usage_updated_at BEFORE UPDATE ON premium_feature_usage
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX idx_user_subscriptions_user_id ON user_subscriptions(user_id);
CREATE INDEX idx_user_subscriptions_status ON user_subscriptions(status);
CREATE INDEX idx_premium_feature_usage_user_id ON premium_feature_usage(user_id);
CREATE INDEX idx_premium_feature_usage_feature_name ON premium_feature_usage(feature_name);

-- Insert default subscription plans
INSERT INTO subscription_plans (name, description, price_monthly, price_yearly, features) VALUES
(
  'Free',
  'Basic features for getting started',
  0.00,
  0.00,
  '{
    "earningsProjection": false,
    "goalsTracker": false,
    "performanceHeatmap": false,
    "platformComparison": false,
    "advancedAnalytics": false,
    "learningIntegration": false,
    "integrationMonitoring": false
  }'
),
(
  'Premium',
  'Advanced features for professional interpreters',
  19.99,
  199.99,
  '{
    "earningsProjection": true,
    "goalsTracker": true,
    "performanceHeatmap": true,
    "platformComparison": true,
    "advancedAnalytics": true,
    "learningIntegration": true,
    "integrationMonitoring": true
  }'
);

-- Function to check if user has premium access
CREATE OR REPLACE FUNCTION has_premium_access(user_uuid UUID)
RETURNS BOOLEAN AS $$
DECLARE
  subscription_status TEXT;
  trial_end_date TIMESTAMPTZ;
BEGIN
  SELECT status, trial_end INTO subscription_status, trial_end_date
  FROM user_subscriptions
  WHERE user_id = user_uuid;

  -- If no subscription found, user is on free plan
  IF subscription_status IS NULL THEN
    RETURN FALSE;
  END IF;

  -- Check if subscription is active or in trial
  IF subscription_status = 'active' THEN
    RETURN TRUE;
  END IF;

  -- Check if user is in trial period
  IF subscription_status = 'trialing' AND trial_end_date > NOW() THEN
    RETURN TRUE;
  END IF;

  RETURN FALSE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get user's subscription tier
CREATE OR REPLACE FUNCTION get_user_subscription_tier(user_uuid UUID)
RETURNS TEXT AS $$
DECLARE
  subscription_status TEXT;
  trial_end_date TIMESTAMPTZ;
  plan_name TEXT;
BEGIN
  SELECT us.status, us.trial_end, sp.name
  INTO subscription_status, trial_end_date, plan_name
  FROM user_subscriptions us
  LEFT JOIN subscription_plans sp ON us.plan_id = sp.id
  WHERE us.user_id = user_uuid;

  -- If no subscription found, user is on free plan
  IF subscription_status IS NULL THEN
    RETURN 'free';
  END IF;

  -- Check if subscription is active or in trial
  IF subscription_status = 'active' OR (subscription_status = 'trialing' AND trial_end_date > NOW()) THEN
    RETURN LOWER(plan_name);
  END IF;

  RETURN 'free';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
