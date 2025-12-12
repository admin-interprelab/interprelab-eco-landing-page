import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { responses } = await req.json() as { responses: string };

    if (!responses || responses.trim().length === 0) {
      return new Response(
        JSON.stringify({ error: 'Responses are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY');
    if (!GEMINI_API_KEY) {
      console.error('GEMINI_API_KEY not configured');
      return new Response(
        JSON.stringify({ error: 'Service configuration error' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // System prompt for debriefing analysis
    const systemPrompt = `You are a compassionate wellness analyst for medical interpreters. Analyze their debriefing responses and provide:

1. Recognition of their emotional state and experiences
2. Identification of key stress factors or concerns
3. Personalized coping strategies specific to medical interpreters
4. Recommendations for self-care
5. Gentle guidance on when to seek professional support if needed

Keep your analysis warm, supportive, and actionable (3-4 paragraphs). Focus on validation and practical next steps.`;

    const userPrompt = `Please analyze these debriefing responses from a medical interpreter:\n\n${responses}`;

    // Call Gemini API
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              role: 'user',
              parts: [{ text: systemPrompt }]
            },
            {
              role: 'model',
              parts: [{ text: 'I understand. I will analyze the debriefing responses with compassion and provide actionable insights.' }]
            },
            {
              role: 'user',
              parts: [{ text: userPrompt }]
            }
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 600,
          },
        }),
      }
    );

    if (!response.ok) {
      const error = await response.text();
      console.error('Gemini API error:', error);
      return new Response(
        JSON.stringify({ error: 'Failed to analyze responses' }),
        { status: response.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const data = await response.json();
    const analysis = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Unable to generate analysis at this time.';

    return new Response(
      JSON.stringify({ analysis }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Debriefing error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
