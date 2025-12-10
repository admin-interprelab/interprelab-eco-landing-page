
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';

const DEFAULT_MODEL = "gemini-2.0-flash"; // Using a standard available model

interface GeminiResponse {
  candidates?: {
    content?: {
      parts?: {
        text?: string;
      }[];
    };
  }[];
  error?: {
    message: string;
  };
}

export const callGemini = async (prompt: string, model: string = DEFAULT_MODEL): Promise<string> => {
  if (!GEMINI_API_KEY) {
    console.error("Gemini API key is missing. Please set VITE_GEMINI_API_KEY in your .env file.");
    return "Error: API Key missing.";
  }

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_API_KEY}`;
  const payload = {
    contents: [{ parts: [{ text: prompt }] }]
  };

  let attempt = 0;
  const maxRetries = 3;
  const delays = [1000, 2000, 4000];

  while (attempt < maxRetries) {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        if (response.status === 429) {
          console.warn(`Rate limit exceeded (Attempt ${attempt + 1}). Retrying...`);
          throw new Error("Rate limit exceeded");
        }
        const errorData = await response.json() as GeminiResponse;
        throw new Error(`API Error: ${response.status} - ${errorData.error?.message || response.statusText}`);
      }

      const data = await response.json() as GeminiResponse;
      return data.candidates?.[0]?.content?.parts?.[0]?.text || "No content generated.";

    } catch (error) {
      attempt++;
      if (attempt >= maxRetries) {
        console.error("Gemini API call failed after retries:", error);
        return "Connection error. Please try again later.";
      }
      await new Promise(resolve => setTimeout(resolve, delays[attempt - 1]));
    }
  }
  return "Unexpected error.";
};
