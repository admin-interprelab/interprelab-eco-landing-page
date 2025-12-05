import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { cardType, specialty, count = 10 } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const prompt = `Generate ${count} flashcards for medical interpreters studying ${specialty || 'general medical'} terminology.

Card Type: ${cardType}
- If "root-words": provide medical root words with meanings
- If "term-translation": provide medical terms with Spanish translations and pronunciations
- If "term-definition": provide medical terms with clear definitions
- If "custom": provide mixed content cards

Return ONLY a JSON array of flashcard objects with this structure:
[
  {
    "front": "term or question",
    "back": "translation, definition, or answer",
    "pronunciation": "phonetic pronunciation (if applicable)",
    "example": "usage example (optional)"
  }
]

Focus on commonly used ${specialty || 'medical'} terms that interpreters need to master.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: "You are a medical terminology expert creating flashcards for interpreter training." },
          { role: "user", content: prompt }
        ],
      }),
    });

    if (!response.ok) {
      throw new Error("AI gateway error");
    }

    const data = await response.json();
    let content = data.choices[0].message.content;
    
    // Extract JSON from markdown code blocks if present
    const jsonMatch = content.match(/```(?:json)?\s*(\[[\s\S]*?\])\s*```/);
    if (jsonMatch) {
      content = jsonMatch[1];
    }
    
    const flashcards = JSON.parse(content);

    return new Response(JSON.stringify({ flashcards }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("generate-flashcards error:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});