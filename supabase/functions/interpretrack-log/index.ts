import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from '@supabase/supabase-js';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY');

    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error('Missing request environment variables');
    }

    const supabaseClient = createClient(
      supabaseUrl,
      supabaseAnonKey,
      { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
    );

    const {
      data: { user },
    } = await supabaseClient.auth.getUser();

    if (!user) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    let body;
    try {
        body = await req.json();
    } catch (e) {
        return new Response(
            JSON.stringify({ error: 'Invalid JSON body' }),
            { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
    }

    const { action, sessionId, metadata } = body;

    if (!action || !['start', 'end'].includes(action)) {
       return new Response(
        JSON.stringify({ error: 'Invalid action. Must be "start" or "end".' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    let result;

    if (action === 'start') {
        const { data, error } = await supabaseClient
            .from('call_logs')
            .insert({
                user_id: user.id,
                start_time: new Date().toISOString(),
                metadata: metadata || {}
            })
            .select()
            .single();
        
        if (error) throw error;
        result = data;
    } else {
        if (!sessionId) {
            return new Response(
                JSON.stringify({ error: 'Session ID required for end action' }),
                { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            );
        }

        const { data, error } = await supabaseClient
            .from('call_logs')
            .update({
                end_time: new Date().toISOString()
            })
            .eq('id', sessionId)
            .eq('user_id', user.id)
            .select()
            .single();

        if (error) throw error;
        result = data;
    }

    return new Response(
      JSON.stringify(result),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('InterpreTrack error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error', details: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
