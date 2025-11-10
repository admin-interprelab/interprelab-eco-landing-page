import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { prompt } = JSON.parse(req.body);

  if (!prompt) {
    return res.status(400).json({ message: 'Prompt is required' });
  }

  try {
    const response = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "dall-e-3",
        prompt: `Create an abstract, therapeutic, and visually soothing piece of art that represents the following feeling or situation: "${prompt}". The style should be soft, ethereal, and calming.`,
        n: 1,
        size: "1024x1024",
      }),
    });

    const data = await response.json();
    const imageUrl = data.data[0]?.url;
    res.status(200).json({ imageUrl });
  } catch (error) {
    console.error('DALL-E API Error:', error);
    res.status(500).json({ message: 'Failed to generate conversation art.' });
  }
}
