import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { text, context } = await req.json();

    if (!text) {
        return new Response(
            JSON.stringify({ error: 'Input text is required' }),
            { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
    }

    const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY');
    if (!GEMINI_API_KEY) {
        return new Response(
            JSON.stringify({ error: 'Service configuration error' }),
            { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
    }

    const systemPrompt = `You are InterpreCoach, a real-time AI assistant for medical interpreters.
    Your goal is to provide immediate, helpful context and terminology support.
    
    Analyze the incoming transcript chunk.
    1. Identify key medical terms, medications, or complex concepts.
    2. For medications, provide Brand/Generic pairs if applicable.
    3. If there is a critical instruction (dosage, frequency), highlight it.
    
    Output JSON format:
    {
        "terms": [
            { "term": "original term", "translation": "suggested translation (if clear)", "definition": "brief context" }
        ],
        "medications": [
            { "name": "mentioned name", "generic": "generic name", "brand": "brand name" }
        ],
        "key_points": ["bullet point 1", "bullet point 2"]
    }`;

    const userPrompt = `Context: ${context || 'Medical appointment'}
    
    Transcript Chunk: "${text}"`;

    const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [
                    { role: 'user', parts: [{ text: systemPrompt }] },
                    { role: 'user', parts: [{ text: userPrompt }] }
                ],
                generationConfig: {
                    temperature: 0.1,
                    response_mime_type: "application/json"
                }
            })
        }
    );

    if (!response.ok) {
        throw new Error(`Gemini API Error: ${await response.text()}`);
    }

    const data = await response.json();
    const resultText = data.candidates?.[0]?.content?.parts?.[0]?.text;
    const assistance = JSON.parse(resultText);

    return new Response(
        JSON.stringify(assistance),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('InterpreCoach error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error', details: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
