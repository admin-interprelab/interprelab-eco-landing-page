create or replace function public.update_heatmap_for_date(p_user_id uuid, p_date date)
returns void
language plpgsql
as $$
begin
  insert into public.performance_heatmap (
    user_id,
    date_recorded,
    hour_of_day,
    day_of_week,
    total_calls,
    total_earnings,
    total_duration,
    avg_duration_seconds
  )
  select
    p_user_id,
    p_date,
    extract(hour from start_time at time zone 'utc') as hour_of_day,
    extract(dow from start_time at time zone 'utc') as day_of_week,
    count(*),
    sum(earnings),
    sum(duration_seconds),
    avg(duration_seconds)
  from public.call_logs
  where user_id = p_user_id and date(start_time at time zone 'utc') = p_date
  group by hour_of_day, day_of_week
  on conflict (user_id, date_recorded, hour_of_day) do update set
    total_calls = excluded.total_calls,
    total_earnings = excluded.total_earnings,
    total_duration = excluded.total_duration,
    avg_duration_seconds = excluded.avg_duration_seconds;
end;
$$;
