-- Function to handle goal progress updates
create or replace function public.handle_new_call_log_for_goals()
returns trigger
language plpgsql
security definer -- required to run with elevated privileges
as $$
begin
  -- Update goals based on earnings ('dollars')
  update public.user_goals
  set
    current_value = current_value + new.earnings,
    updated_at = now(),
    status = case
      when (current_value + new.earnings) >= target_value then 'completed'
      else 'active'
    end
  where
    user_id = new.user_id
    and unit = 'dollars'
    and status = 'active'
    and deadline >= now();

  -- Update goals based on duration ('hours')
  update public.user_goals
  set
    current_value = current_value + (new.duration_seconds / 3600.0),
    updated_at = now(),
    status = case
      when (current_value + (new.duration_seconds / 3600.0)) >= target_value then 'completed'
      else 'active'
    end
  where
    user_id = new.user_id
    and unit = 'hours'
    and status = 'active'
    and deadline >= now();

  -- Update goals based on call count ('calls')
  update public.user_goals
  set
    current_value = current_value + 1,
    updated_at = now(),
    status = case
      when (current_value + 1) >= target_value then 'completed'
      else 'active'
    end
  where
    user_id = new.user_id
    and unit = 'calls'
    and status = 'active'
    and deadline >= now();

  return new;
end;
$$;

-- Trigger to execute the function after a new call log is inserted
create trigger on_new_call_log
  after insert on public.call_logs
  for each row execute procedure public.handle_new_call_log_for_goals();
