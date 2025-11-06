-- Fix security warning: Set search_path for function
DROP FUNCTION IF EXISTS calculate_rounded_duration(integer, text);

CREATE OR REPLACE FUNCTION calculate_rounded_duration(
  actual_seconds integer,
  rounding_method text
) RETURNS integer
LANGUAGE plpgsql
IMMUTABLE
SECURITY DEFINER
SET search_path = public
AS $$
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
$$;