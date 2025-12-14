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
    const { sourceText, interpretedText, sourceLang, targetLang } = await req.json();

    if (!sourceText || !interpretedText) {
      return new Response(
        JSON.stringify({ error: 'Source and interpreted text are required' }),
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

    const systemPrompt = `You are an expert linguistic assessor for medical interpreters. Your goal is to evaluate the accuracy and quality of an interpretation.
    
    Analyze the following interpretation:
    1. **Accuracy**: Did the interpreter convey the full meaning? Any omissions, additions, or distortions?
    2. **Grammar & Syntax**: Evaluate the grammatical correctness of the interpreted text (target language).
    3. **Terminology**: specific medical key terms used correctly?
    4. **Register**: Was the appropriate register maintained?
    
    Provide the output in the following JSON format ONLY:
    {
      "score": number (0-100),
      "feedback": "overall summary",
      "errors": [
        { "type": "omission/grammar/terminology/other", "description": "explanation", "severity": "minor/major/critical" }
      ],
      "corrected_version": "the ideal interpretation"
    }`;

    const userPrompt = `Source Language: ${sourceLang || 'Auto-detect'}
    Target Language: ${targetLang || 'Auto-detect'}
    
    Source Text: "${sourceText}"
    Interpreted Text: "${interpretedText}"`;

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
                temperature: 0.3,
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
    const analysis = JSON.parse(resultText);

    return new Response(
      JSON.stringify(analysis),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Assessment error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error', details: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
