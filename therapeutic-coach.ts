import type { NextApiRequest, NextApiResponse } from 'next';

// Define the structure of a chat message
interface ChatMessage {
  author: 'user' | 'bot';
  text: string;
}

// This is a simplified example using the OpenAI API.
// In a real application, you would use the official SDK.
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { messages }: { messages: ChatMessage[] } = JSON.parse(req.body);

  // System prompt to guide the LLM's behavior
  const systemPrompt = {
    role: 'system',
    content: `You are a compassionate, non-professional therapeutic coach for language interpreters.
    Your role is to be an empathetic, listening ear. Do NOT give advice.
    Your primary function is to validate their feelings and acknowledge their difficult experiences.
    Keep your responses supportive, encouraging, and brief. You must not store any user data.
    Start every conversation by reminding the user that this is a safe, confidential space and that no data is stored.`,
  };

  const apiRequestBody = {
    model: 'gpt-3.5-turbo', // Or any other model you prefer
    messages: [systemPrompt, ...messages.map(msg => ({
      role: msg.author === 'bot' ? 'assistant' : 'user',
      content: msg.text
    }))],
  };

  // Use Google Gemini if specified in environment variables
  if (process.env.LLM_PROVIDER === 'google') {
    // Gemini has a different API structure
    const googleApiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GOOGLE_API_KEY}`;

    // Convert messages to Gemini's format
    const geminiContents = messages.map(msg => ({
      role: msg.author === 'bot' ? 'model' : 'user',
      parts: [{ text: msg.text }],
    }));

    // Prepend system prompt to the first user message for Gemini
    if (geminiContents.length > 0 && geminiContents[0].role === 'user') {
      geminiContents[0].parts[0].text = `${systemPrompt.content}\n\n${geminiContents[0].parts[0].text}`;
    }

    try {
      const response = await fetch(googleApiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: geminiContents }),
      });

      const data = await response.json();
      const botResponse = data.candidates[0]?.content?.parts[0]?.text || "I'm here to listen. Please continue.";
      res.status(200).json({ response: botResponse });
    } catch (error) {
      console.error('Google LLM API Error:', error);
      res.status(500).json({ response: "I'm having a little trouble connecting right now. Please try again in a moment." });
    }
  } else {
    // Default to OpenAI
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify(apiRequestBody),
      });

      const data = await response.json();
      const botResponse = data.choices[0]?.message?.content || "I'm here to listen. Please continue.";
      res.status(200).json({ response: botResponse });
    } catch (error) {
      console.error('OpenAI LLM API Error:', error);
      res.status(500).json({ response: "I'm having a little trouble connecting right now. Please try again in a moment." });
    }
  }
}
