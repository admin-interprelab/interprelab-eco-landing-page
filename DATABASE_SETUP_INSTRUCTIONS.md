# Database Setup Instructions

## Quick Setup Steps

1. **Go to your Supabase Dashboard**:
   - Visit: https://supabase.com/dashboard/project/iokgkrnbawhizmuejluz
   - Click on "SQL Editor" in the left sidebar

2. **Run the Database Migration**:
   - Copy the entire content from `supabase/migrations/20241205000000_complete_interprelab_schema.sql`
   - Paste it into the SQL Editor
   - Click "Run" to execute the migration

3. **Verify Tables Created**:
   - Go to "Table Editor" in the left sidebar
   - You should see these tables:
     - `user_settings`
     - `call_logs`
     - `study_progress`
     - `user_profiles`

4. **Test Authentication**:
   - Go to "Authentication" > "Users" in your Supabase dashboard
   - Try creating a test user or signing up through your app

## What This Migration Does

- Creates all necessary tables for the InterpreLab ecosystem
- Sets up Row Level Security (RLS) policies
- Creates proper indexes for performance
- Adds update triggers for timestamp management

## Troubleshooting

If you get authentication errors (400 Bad Request):
1. Make sure the migration has been run successfully
2. Check that RLS policies are enabled
3. Try creating a user directly in the Supabase dashboard first

## After Setup

Once the database is set up, you can:
- Sign up for a new account in your app
- Test the call tracking functionality
- Use the study modules
- Access the community platform

Your app should work perfectly after running this migration!
