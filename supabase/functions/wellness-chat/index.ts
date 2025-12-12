import "jsr:@supabase/functions-js/edge-runtime.d.ts";

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

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
    const { messages } = await req.json() as { messages: Message[] };

    if (!messages || messages.length === 0) {
      return new Response(
        JSON.stringify({ error: 'Messages are required' }),
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

    // System prompt for wellness counselor
    const systemPrompt = `You are a compassionate AI wellness counselor specifically trained to support medical interpreters. You understand:

- The unique psychological toll of medical interpretation (vicarious trauma, compassion fatigue, burnout)
- The challenge of speaking in first person while interpreting traumatic content
- The isolation interpreters feel after difficult calls
- The cognitive load of simultaneous interpretation
- Professional boundaries and ethical considerations

Your approach:
- Be warm, empathetic, and non-judgmental
- Validate their experiences and emotions
- Use active listening techniques
- Offer practical coping strategies specific to interpreters
- Recognize signs of burnout or vicarious trauma
- Encourage professional support when needed
- Keep responses conversational and supportive (2-4 paragraphs)

Remember: You're a supportive companion, not a replacement for professional mental health services. If issues seem severe, gently suggest seeking professional help.`;

    // Convert messages to Gemini format
    const geminiContents = [];
    
    // Add system instruction as first user message
    geminiContents.push({
      role: 'user',
      parts: [{ text: systemPrompt }]
    });
    geminiContents.push({
      role: 'model',
      parts: [{ text: 'I understand. I will be a compassionate wellness counselor for medical interpreters, following these guidelines.' }]
    });

    // Add conversation history
    for (const msg of messages) {
      geminiContents.push({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }]
      });
    }

    // Call Gemini API with streaming
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:streamGenerateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: geminiContents,
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 500,
          },
        }),
      }
    );

    if (!response.ok) {
      const error = await response.text();
      console.error('Gemini API error:', error);
      return new Response(
        JSON.stringify({ error: 'Failed to get response from AI service' }),
        { status: response.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Transform Gemini streaming response to OpenAI format for compatibility
    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        const reader = response.body?.getReader();
        if (!reader) return;

        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) {
              controller.enqueue(encoder.encode('data: [DONE]\n\n'));
              break;
            }

            const text = new TextDecoder().decode(value);
            const lines = text.split('\n').filter(line => line.trim());

            for (const line of lines) {
              try {
                const json = JSON.parse(line);
                const content = json.candidates?.[0]?.content?.parts?.[0]?.text;
                
                if (content) {
                  // Format as OpenAI-compatible SSE
                  const sseData = {
                    choices: [{
                      delta: { content }
                    }]
                  };
                  controller.enqueue(encoder.encode(`data: ${JSON.stringify(sseData)}\n\n`));
                }
              } catch {
                // Skip malformed JSON
              }
            }
          }
        } finally {
          controller.close();
        }
      }
    });

    return new Response(readable, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });

  } catch (error) {
    console.error('Wellness chat error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
