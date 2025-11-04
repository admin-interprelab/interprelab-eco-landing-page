-- Fix user_insights table INSERT policy
-- Check if the table exists first
DO $$
BEGIN
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'user_insights') THEN
        -- Add INSERT policy for user_insights table
        CREATE POLICY IF NOT EXISTS "Users can insert their own insights" ON public.user_insights
            FOR INSERT WITH CHECK (auth.uid() = user_id);

        -- Also add a policy for system/service role to insert insights
        CREATE POLICY IF NOT EXISTS "Service role can insert insights" ON public.user_insights
            FOR INSERT WITH CHECK (auth.role() = 'service_role');
    END IF;
END
$$;
