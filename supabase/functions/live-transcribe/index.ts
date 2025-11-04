console.info('live-transcribe function starting');
Deno.serve(async (req)=>{
  try {
    // Require Bearer auth header with a function key
    const auth = req.headers.get('authorization') || '';
    if (!auth.startsWith('Bearer ')) return new Response('Unauthorized', {
      status: 401
    });
    const key = auth.split(' ')[1];
    if (!key) return new Response('Unauthorized', {
      status: 401
    });
    // Accept POST with audio bytes (wav/webm) and optional session-id header
    if (req.method !== 'POST') return new Response('Method Not Allowed', {
      status: 405
    });
    const sessionId = req.headers.get('x-session-id') || null;
    // Read audio body
    const audioBuffer = await req.arrayBuffer();
    // Proxy to Gemini Speech-to-Text (placeholder). The deployer must set GEMINI_API_KEY in project secrets.
    const geminiKey = Deno.env.get('GEMINI_API_KEY');
    if (!geminiKey) return new Response('Gemini API key not configured', {
      status: 500
    });
    // Construct multipart/form-data boundary
    const boundary = '----supabase-boundary-' + crypto.randomUUID();
    const crlf = '\r\n';
    const bodyParts = [];
    bodyParts.push(`--${boundary}${crlf}`);
    bodyParts.push(`Content-Disposition: form-data; name="file"; filename="audio.webm"${crlf}`);
    bodyParts.push(`Content-Type: application/octet-stream${crlf}${crlf}`);
    const header = bodyParts.join('');
    const footer = `${crlf}--${boundary}--${crlf}`;
    const headerBuf = new TextEncoder().encode(header);
    const footerBuf = new TextEncoder().encode(footer);
    const proxiedBody = new Uint8Array(headerBuf.length + audioBuffer.byteLength + footerBuf.length);
    proxiedBody.set(headerBuf, 0);
    proxiedBody.set(new Uint8Array(audioBuffer), headerBuf.length);
    proxiedBody.set(footerBuf, headerBuf.length + audioBuffer.byteLength);
    // Call Gemini / OpenAI speech-to-text endpoint (replace URL if different)
    const resp = await fetch('https://api.openai.com/v1/audio/transcriptions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${geminiKey}`,
        'Content-Type': `multipart/form-data; boundary=${boundary}`
      },
      body: proxiedBody
    });
    if (!resp.ok) {
      const txt = await resp.text();
      console.error('Gemini error', resp.status, txt);
      return new Response('Transcription provider error', {
        status: 502
      });
    }
    const json = await resp.json();
    // Return transcript JSON directly. Do not store.
    return new Response(JSON.stringify({
      session_id: sessionId,
      transcript: json
    }), {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (err) {
    console.error('live-transcribe error', err);
    return new Response('Internal Server Error', {
      status: 500
    });
  }
});
