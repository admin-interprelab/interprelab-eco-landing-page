-- Premium Dashboard Features Migration
-- This migration adds all necessary tables for premium dashboard functionality

-- User Goals Table
CREATE TABLE user_goals (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  target_value DECIMAL(10,2) NOT NULL,
  current_value DECIMAL(10,2) DEFAULT 0,
  unit TEXT NOT NULL CHECK (unit IN ('dollars', 'hours', 'calls')),
  goal_type TEXT NOT NULL CHECK (goal_type IN ('daily', 'weekly', 'monthly', 'yearly')),
  deadline TIMESTAMPTZ NOT NULL,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'completed', 'paused', 'cancelled')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Performance Heatmap Data
CREATE TABLE performance_heatmap (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  date_recorded DATE NOT NULL,
  hour_of_day INTEGER NOT NULL CHECK (hour_of_day >= 0 AND hour_of_day <= 23),
  day_of_week INTEGER NOT NULL CHECK (day_of_week >= 0 AND day_of_week <= 6),
  total_calls INTEGER DEFAULT 0,
  total_earnings DECIMAL(10,2) DEFAULT 0,
  avg_duration_seconds INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, date_recorded, hour_of_day)
);

-- Platform Performance Metrics
CREATE TABLE platform_metrics (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  platform_name TEXT NOT NULL,
  period_start DATE NOT NULL,
  period_end DATE NOT NULL,
  total_calls INTEGER DEFAULT 0,
  total_earnings DECIMAL(10,2) DEFAULT 0,
  avg_duration_seconds INTEGER DEFAULT 0,
  change_percent DECIMAL(5,2) DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, platform_name, period_start, period_end)
);

-- Learning Metrics (Enhanced)
CREATE TABLE learning_metrics (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  study_hours DECIMAL(5,2) DEFAULT 0,
  terms_learned INTEGER DEFAULT 0,
  quizzes_completed INTEGER DEFAULT 0,
  scenarios_practiced INTEGER DEFAULT 0,
  bot_conversations INTEGER DEFAULT 0,
  current_streak INTEGER DEFAULT 0,
  longest_streak INTEGER DEFAULT 0,
  last_activity TIMESTAMPTZ DEFAULT NOW(),
  period_start DATE NOT NULL,
  period_end DATE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, period_start, period_end)
);

-- External Integrations
CREATE TABLE user_integrations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  integration_name TEXT NOT NULL,
  integration_type TEXT NOT NULL CHECK (integration_type IN ('interpreStudy', 'interpreBot', 'platform', 'other')),
  status TEXT DEFAULT 'disconnected' CHECK (status IN ('connected', 'disconnected', 'syncing', 'error')),
  last_sync TIMESTAMPTZ,
  sync_frequency TEXT DEFAULT 'daily' CHECK (sync_frequency IN ('realtime', 'hourly', 'daily', 'weekly')),
  data_points_collected INTEGER DEFAULT 0,
  error_message TEXT,
  configuration JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, integration_name)
);

-- Earnings Projections (AI Generated)
CREATE TABLE earnings_projections (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  projection_date DATE NOT NULL,
  actual_earnings DECIMAL(10,2),
  projected_earnings DECIMAL(10,2) NOT NULL,
  conservative_estimate DECIMAL(10,2) NOT NULL,
  optimistic_estimate DECIMAL(10,2) NOT NULL,
  confidence_score DECIMAL(3,2) DEFAULT 0.5 CHECK (confidence_score >= 0 AND confidence_score <= 1),
  model_version TEXT DEFAULT 'v1.0',
  generated_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '24 hours'),
  UNIQUE(user_id, projection_date)
);

-- Enable Row Level Security
ALTER TABLE user_goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE performance_heatmap ENABLE ROW LEVEL SECURITY;
ALTER TABLE platform_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE learning_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_integrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE earnings_projections ENABLE ROW LEVEL SECURITY;
-- Row Level Security Policies

-- User Goals Policies
CREATE POLICY "Users can view own goals" ON user_goals
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own goals" ON user_goals
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own goals" ON user_goals
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own goals" ON user_goals
  FOR DELETE USING (auth.uid() = user_id);

-- Performance Heatmap Policies
CREATE POLICY "Users can view own performance data" ON performance_heatmap
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own performance data" ON performance_heatmap
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own performance data" ON performance_heatmap
  FOR UPDATE USING (auth.uid() = user_id);

-- Platform Metrics Policies
CREATE POLICY "Users can view own platform metrics" ON platform_metrics
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own platform metrics" ON platform_metrics
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own platform metrics" ON platform_metrics
  FOR UPDATE USING (auth.uid() = user_id);

-- Learning Metrics Policies
CREATE POLICY "Users can view own learning metrics" ON learning_metrics
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own learning metrics" ON learning_metrics
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own learning metrics" ON learning_metrics
  FOR UPDATE USING (auth.uid() = user_id);

-- User Integrations Policies
CREATE POLICY "Users can view own integrations" ON user_integrations
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own integrations" ON user_integrations
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own integrations" ON user_integrations
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own integrations" ON user_integrations
  FOR DELETE USING (auth.uid() = user_id);

-- Earnings Projections Policies
CREATE POLICY "Users can view own projections" ON earnings_projections
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own projections" ON earnings_projections
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own projections" ON earnings_projections
  FOR UPDATE USING (auth.uid() = user_id);

-- Apply update triggers
CREATE TRIGGER update_user_goals_updated_at BEFORE UPDATE ON user_goals
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_platform_metrics_updated_at BEFORE UPDATE ON platform_metrics
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_learning_metrics_updated_at BEFORE UPDATE ON learning_metrics
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_integrations_updated_at BEFORE UPDATE ON user_integrations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX idx_user_goals_user_id ON user_goals(user_id);
CREATE INDEX idx_user_goals_status ON user_goals(status);
CREATE INDEX idx_user_goals_deadline ON user_goals(deadline);

CREATE INDEX idx_performance_heatmap_user_id ON performance_heatmap(user_id);
CREATE INDEX idx_performance_heatmap_date ON performance_heatmap(date_recorded);
CREATE INDEX idx_performance_heatmap_hour ON performance_heatmap(hour_of_day);

CREATE INDEX idx_platform_metrics_user_id ON platform_metrics(user_id);
CREATE INDEX idx_platform_metrics_platform ON platform_metrics(platform_name);
CREATE INDEX idx_platform_metrics_period ON platform_metrics(period_start, period_end);

CREATE INDEX idx_learning_metrics_user_id ON learning_metrics(user_id);
CREATE INDEX idx_learning_metrics_period ON learning_metrics(period_start, period_end);

CREATE INDEX idx_user_integrations_user_id ON user_integrations(user_id);
CREATE INDEX idx_user_integrations_status ON user_integrations(status);
CREATE INDEX idx_user_integrations_type ON user_integrations(integration_type);

CREATE INDEX idx_earnings_projections_user_id ON earnings_projections(user_id);
CREATE INDEX idx_earnings_projections_date ON earnings_projections(projection_date);
CREATE INDEX idx_earnings_projections_expires ON earnings_projections(expires_at);

-- Helper Functions for Premium Dashboard

-- Function to update goal progress based on call logs
CREATE OR REPLACE FUNCTION update_goal_progress()
RETURNS TRIGGER AS $
DECLARE
  goal_record RECORD;
BEGIN
  -- Update relevant goals when a call log is inserted or updated
  FOR goal_record IN
    SELECT id, unit, goal_type, deadline
    FROM user_goals
    WHERE user_id = NEW.user_id
    AND status = 'active'
    AND deadline >= NOW()
  LOOP
    -- Update based on goal unit type
    IF goal_record.unit = 'dollars' THEN
      UPDATE user_goals
      SET current_value = (
        SELECT COALESCE(SUM(earnings), 0)
        FROM call_logs
        WHERE user_id = NEW.user_id
        AND start_time >= CASE
          WHEN goal_record.goal_type = 'daily' THEN CURRENT_DATE
          WHEN goal_record.goal_type = 'weekly' THEN DATE_TRUNC('week', CURRENT_DATE)
          WHEN goal_record.goal_type = 'monthly' THEN DATE_TRUNC('month', CURRENT_DATE)
          WHEN goal_record.goal_type = 'yearly' THEN DATE_TRUNC('year', CURRENT_DATE)
        END
        AND start_time <= goal_record.deadline
      ),
      updated_at = NOW()
      WHERE id = goal_record.id;

    ELSIF goal_record.unit = 'hours' THEN
      UPDATE user_goals
      SET current_value = (
        SELECT COALESCE(SUM(duration_seconds), 0) / 3600.0
        FROM call_logs
        WHERE user_id = NEW.user_id
        AND start_time >= CASE
          WHEN goal_record.goal_type = 'daily' THEN CURRENT_DATE
          WHEN goal_record.goal_type = 'weekly' THEN DATE_TRUNC('week', CURRENT_DATE)
          WHEN goal_record.goal_type = 'monthly' THEN DATE_TRUNC('month', CURRENT_DATE)
          WHEN goal_record.goal_type = 'yearly' THEN DATE_TRUNC('year', CURRENT_DATE)
        END
        AND start_time <= goal_record.deadline
      ),
      updated_at = NOW()
      WHERE id = goal_record.id;

    ELSIF goal_record.unit = 'calls' THEN
      UPDATE user_goals
      SET current_value = (
        SELECT COUNT(*)
        FROM call_logs
        WHERE user_id = NEW.user_id
        AND start_time >= CASE
          WHEN goal_record.goal_type = 'daily' THEN CURRENT_DATE
          WHEN goal_record.goal_type = 'weekly' THEN DATE_TRUNC('week', CURRENT_DATE)
          WHEN goal_record.goal_type = 'monthly' THEN DATE_TRUNC('month', CURRENT_DATE)
          WHEN goal_record.goal_type = 'yearly' THEN DATE_TRUNC('year', CURRENT_DATE)
        END
        AND start_time <= goal_record.deadline
      ),
      updated_at = NOW()
      WHERE id = goal_record.id;
    END IF;

    -- Mark goal as completed if target is reached
    UPDATE user_goals
    SET status = 'completed', updated_at = NOW()
    WHERE id = goal_record.id
    AND current_value >= target_value
    AND status = 'active';

  END LOOP;

  RETURN NEW;
END;
$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to update goal progress when call logs change
CREATE TRIGGER update_goals_on_call_log_change
  AFTER INSERT OR UPDATE ON call_logs
  FOR EACH ROW EXECUTE FUNCTION update_goal_progress();

-- Function to generate performance heatmap data
CREATE OR REPLACE FUNCTION generate_performance_heatmap_data(user_uuid UUID, start_date DATE, end_date DATE)
RETURNS VOID AS $
DECLARE
  call_record RECORD;
BEGIN
  -- Clear existing data for the date range
  DELETE FROM performance_heatmap
  WHERE user_id = user_uuid
  AND date_recorded BETWEEN start_date AND end_date;

  -- Generate heatmap data from call logs
  INSERT INTO performance_heatmap (
    user_id,
    date_recorded,
    hour_of_day,
    day_of_week,
    total_calls,
    total_earnings,
    avg_duration_seconds
  )
  SELECT
    user_id,
    start_time::DATE as date_recorded,
    EXTRACT(HOUR FROM start_time) as hour_of_day,
    EXTRACT(DOW FROM start_time) as day_of_week,
    COUNT(*) as total_calls,
    SUM(earnings) as total_earnings,
    AVG(duration_seconds)::INTEGER as avg_duration_seconds
  FROM call_logs
  WHERE user_id = user_uuid
  AND start_time::DATE BETWEEN start_date AND end_date
  GROUP BY user_id, start_time::DATE, EXTRACT(HOUR FROM start_time), EXTRACT(DOW FROM start_time)
  ON CONFLICT (user_id, date_recorded, hour_of_day)
  DO UPDATE SET
    total_calls = EXCLUDED.total_calls,
    total_earnings = EXCLUDED.total_earnings,
    avg_duration_seconds = EXCLUDED.avg_duration_seconds;
END;
$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to calculate platform metrics
CREATE OR REPLACE FUNCTION calculate_platform_metrics(user_uuid UUID, start_date DATE, end_date DATE)
RETURNS VOID AS $
BEGIN
  -- Clear existing metrics for the period
  DELETE FROM platform_metrics
  WHERE user_id = user_uuid
  AND period_start = start_date
  AND period_end = end_date;

  -- Calculate current period metrics
  INSERT INTO platform_metrics (
    user_id,
    platform_name,
    period_start,
    period_end,
    total_calls,
    total_earnings,
    avg_duration_seconds,
    change_percent
  )
  WITH current_metrics AS (
    SELECT
      platform,
      COUNT(*) as calls,
      SUM(earnings) as earnings,
      AVG(duration_seconds)::INTEGER as avg_duration
    FROM call_logs
    WHERE user_id = user_uuid
    AND start_time::DATE BETWEEN start_date AND end_date
    AND platform IS NOT NULL
    GROUP BY platform
  ),
  previous_metrics AS (
    SELECT
      platform,
      SUM(earnings) as prev_earnings
    FROM call_logs
    WHERE user_id = user_uuid
    AND start_time::DATE BETWEEN (start_date - (end_date - start_date + 1)) AND (start_date - 1)
    AND platform IS NOT NULL
    GROUP BY platform
  )
  SELECT
    user_uuid,
    cm.platform,
    start_date,
    end_date,
    cm.calls,
    cm.earnings,
    cm.avg_duration,
    CASE
      WHEN pm.prev_earnings > 0 THEN
        ((cm.earnings - pm.prev_earnings) / pm.prev_earnings * 100)::DECIMAL(5,2)
      ELSE 0
    END as change_percent
  FROM current_metrics cm
  LEFT JOIN previous_metrics pm ON cm.platform = pm.platform;
END;
$ LANGUAGE plpgsql SECURITY DEFINER;
