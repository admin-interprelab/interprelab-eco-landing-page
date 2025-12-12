-- Add call type and rounding settings to database

-- Add call_type column to call_logs
ALTER TABLE call_logs ADD COLUMN IF NOT EXISTS call_type text CHECK (call_type IN ('VRI', 'OPI'));

-- Add rounding settings to user_settings
ALTER TABLE user_settings ADD COLUMN IF NOT EXISTS time_rounding_method text DEFAULT 'actual' CHECK (time_rounding_method IN ('round_down', 'roll_over', 'actual'));

-- Add rounded duration tracking
ALTER TABLE call_logs ADD COLUMN IF NOT EXISTS rounded_duration_seconds integer;
ALTER TABLE call_logs ADD COLUMN IF NOT EXISTS rounded_earnings numeric;

-- Create function to calculate rounded duration
CREATE OR REPLACE FUNCTION calculate_rounded_duration(
  actual_seconds integer,
  rounding_method text
) RETURNS integer AS $$
BEGIN
  CASE rounding_method
    WHEN 'round_down' THEN
      -- Round down to completed minutes only
      RETURN (actual_seconds / 60) * 60;
    WHEN 'roll_over' THEN
      -- Round up any partial minute
      RETURN CEIL(actual_seconds / 60.0) * 60;
    ELSE
      -- Actual time
      RETURN actual_seconds;
  END CASE;
END;
$$ LANGUAGE plpgsql IMMUTABLE;