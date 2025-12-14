-- Create call_logs table
create table if not exists call_logs (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  start_time timestamptz default now(),
  end_time timestamptz,
  duration_seconds int generated always as (
    extract(epoch from (end_time - start_time))
  ) stored,
  metadata jsonb,
  created_at timestamptz default now()
);

-- Enable Row Level Security
alter table call_logs enable row level security;

-- Policies
create policy "Users can insert their own call logs"
  on call_logs for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own call logs"
  on call_logs for update
  using (auth.uid() = user_id);

create policy "Users can view their own call logs"
  on call_logs for select
  using (auth.uid() = user_id);
