import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { corsHeaders } from "../_shared/cors.ts";
import { createSupabaseClient } from "../_shared/supabase-client.ts";

async function fetchExternalLearningData(userId: string) {
  console.log(`Fetching data for user ${userId} from external services...`);
  await new Promise(resolve => setTimeout(resolve, 500)); // Mock API call
  return {
    study_hours: Math.random() * 10,
    terms_learned: Math.floor(Math.random() * 50),
    quizzes_completed: Math.floor(Math.random() * 5),
    scenarios_practiced: Math.floor(Math.random() * 3),
  };
}

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabase = createSupabaseClient(req);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Unauthorized");

    const externalData = await fetchExternalLearningData(user.id);

    const today = new Date();
    const periodStart = new Date(today.getFullYear(), today.getMonth(), 1).toISOString().split("T")[0];
    const periodEnd = new Date(today.getFullYear(), today.getMonth() + 1, 0).toISOString().split("T")[0];

    const { error } = await supabase.from("learning_metrics").upsert({
      user_id: user.id,
      period_start: periodStart,
      period_end: periodEnd,
      ...externalData,
    }, { onConflict: 'user_id, period_start, period_end' });

    if (error) throw error;

    return new Response(JSON.stringify({ success: true, syncedData: externalData }), {
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
