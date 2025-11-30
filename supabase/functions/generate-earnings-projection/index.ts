import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { corsHeaders } from "../_shared/cors.ts";
import { createSupabaseClient } from "../_shared/supabase-client.ts";

/**
 * Calls the Gemini API to generate an earnings projection.
 */
async function getAiProjection(apiKey: string, prompt: string): Promise<any> {
  const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`;
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Gemini API request failed: ${response.statusText} - ${errorBody}`);
  }

  const data = await response.json();
  const rawText = data.candidates[0]?.content?.parts[0]?.text;
  if (!rawText) {
    throw new Error("Invalid response structure from Gemini API.");
  }

  // Clean the response which might be wrapped in markdown
  const cleanedResponse = rawText.replace(/```json|```/g, "").trim();
  return JSON.parse(cleanedResponse);
}

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabase = createSupabaseClient(req);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Unauthorized");

    // 1. Fetch user's historical call data for the last 90 days
    const ninetyDaysAgo = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString();
    const { data: callHistory, error: historyError } = await supabase
      .from("call_logs")
      .select("start_time, earnings, duration_seconds")
      .eq("user_id", user.id)
      .gte("start_time", ninetyDaysAgo);

    if (historyError) throw historyError;
    if (!callHistory || callHistory.length < 5) {
      return new Response(JSON.stringify({ message: "Not enough data for a projection." }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // 2. Create a prompt for the Gemini AI
    const prompt = `
      Based on the following interpreter call history data (last 90 days), generate a realistic earnings projection for the next 30 days.
      Analyze trends, seasonality, and recent activity.
      Data: ${JSON.stringify(callHistory)}
      Provide the output in a structured JSON format with three keys: "projected_earnings", "conservative_estimate", and "optimistic_estimate".
      Example: {"projected_earnings": 5500.50, "conservative_estimate": 4800.00, "optimistic_estimate": 6200.00}
    `;

    // 3. Call the Gemini API and get a structured response
    const geminiApiKey = Deno.env.get("GEMINI_API_KEY");
    if (!geminiApiKey) throw new Error("GEMINI_API_KEY is not set.");
    const projection = await getAiProjection(geminiApiKey, prompt);

    // 4. Cache the projection in the database
    const { error: insertError } = await supabase.from("earnings_projections").upsert({
      user_id: user.id,
      projection_date: new Date().toISOString().split("T")[0],
      projected_earnings: projection.projected_earnings,
      conservative_estimate: projection.conservative_estimate,
      optimistic_estimate: projection.optimistic_estimate,
      generated_at: new Date().toISOString(),
    }, { onConflict: 'user_id, projection_date' });

    if (insertError) console.warn("Failed to cache projection:", insertError.message);

    return new Response(JSON.stringify(projection), {
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
