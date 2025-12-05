import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { corsHeaders } from "../_shared/cors.ts";
import { createSupabaseClient } from "../_shared/supabase-client.ts";

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabase = createSupabaseClient(req);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Unauthorized");

    // For scalability, this function should process data in chunks, e.g., daily.
    // We'll assume it's triggered by a cron job for the previous day.
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const targetDate = yesterday.toISOString().split('T')[0];

    // Instead of pulling all data, we call a database function to do the heavy lifting.
    // This is far more scalable than processing in the Edge Function.
    const { error: rpcError } = await supabase.rpc('update_heatmap_for_date', {
      p_user_id: user.id,
      p_date: targetDate,
    });

    if (rpcError) throw rpcError;

    return new Response(JSON.stringify({ success: true, message: `Heatmap updated for ${targetDate}` }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
