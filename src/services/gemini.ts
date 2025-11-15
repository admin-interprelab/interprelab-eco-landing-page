import {
  GoogleGenerativeAI,
  GenerationConfig,
  HarmCategory,
  HarmBlockThreshold,
} from '@google/generative-ai';

const API_KEY = 'YOUR_GEMINI_API_KEY'; // TODO: Replace with your actual API key

const genAI = new GoogleGenerativeAI(API_KEY);

const generationConfig: GenerationConfig = {
  temperature: 0.7,
  topP: 1,
  topK: 1,
  maxOutputTokens: 2048,
};

const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
];

export const runChat = async (prompt: string) => {
  const model = genAI.getGenerativeModel({
    model: 'gemini-1.0-pro',
    generationConfig,
    safetySettings,
  });

  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
};
