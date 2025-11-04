console.info('medical-terms function starting');
Deno.serve(async (req)=>{
  try {
    const auth = req.headers.get('authorization') || '';
    if (!auth.startsWith('Bearer ')) return new Response('Unauthorized', {
      status: 401
    });
    const key = auth.split(' ')[1];
    if (!key) return new Response('Unauthorized', {
      status: 401
    });
    if (req.method !== 'POST') return new Response('Method Not Allowed', {
      status: 405
    });
    const body = await req.json();
    const { session_id, transcript, target_language } = body;
    if (!transcript) return new Response('Bad Request: missing transcript', {
      status: 400
    });
    // Use Gemini to extract medical terms and provide definitions/translations.
    const geminiKey = Deno.env.get('GEMINI_API_KEY');
    if (!geminiKey) return new Response('Gemini API key not configured', {
      status: 500
    });
    const prompt = `You are a medical terminology assistant. Given the following transcript, extract medical terms and for each term provide: term, short definition (plain language), and translation into the desired language (${target_language || 'en'}). Respond in JSON array format. Transcript: ${transcript}`;
    const resp = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${geminiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 800
      })
    });
    if (!resp.ok) {
      const txt = await resp.text();
      console.error('Gemini chat error', resp.status, txt);
      return new Response('Definitions provider error', {
        status: 502
      });
    }
    const json = await resp.json();
    // Extract assistant content
    const content = json?.choices?.[0]?.message?.content || '';
    // Return parsed content
    return new Response(JSON.stringify({
      session_id,
      definitions: content
    }), {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (err) {
    console.error('medical-terms error', err);
    return new Response('Internal Server Error', {
      status: 500
    });
  }
});
