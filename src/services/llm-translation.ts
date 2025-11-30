import { GoogleGenerativeAI } from "@google/generative-ai";

/**
 * LLM Translation Service
 * Handles AI-powered translation and definition lookup
 */

// Types for translation service
export interface TranslationRequest {
  term: string;
  sourceLanguage: string;
  targetLanguage: string;
  context?: string;
  specialty?: string;
}

export interface TranslationResult {
  id: string;
  term: string;
  translation: string;
  pronunciation: string;
  definition: string;
  etymology?: string;
  usageExamples: string[];
  synonyms: string[];
  relatedTerms: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  category: string;
  subcategory?: string;
  confidence: number;
  sources: string[];
  imageUrl?: string;
  audioUrl?: string;
}

export interface LLMError {
  code: string;
  message: string;
  details?: unknown;
}

/**
 * LLM Translation Service
 * Connects to Google Gemini for AI-powered translations.
 */
class LLMTranslationService {
  private readonly genAI: GoogleGenerativeAI | null;
  private readonly isConfigured: boolean;

  constructor() {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

    if (!apiKey || apiKey === 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX' || apiKey === 'your-api-key-here') {
      console.warn("VITE_GEMINI_API_KEY is not properly configured. LLM translation features will be disabled.");
      this.genAI = null;
      this.isConfigured = false;
    } else {
      this.genAI = new GoogleGenerativeAI(apiKey);
      this.isConfigured = true;
    }
  }

  /**
   * Translate and define a term using AI
   */
  async translateTerm(request: TranslationRequest): Promise<TranslationResult> {
    if (!this.isConfigured || !this.genAI) {
      return this.createFallbackResult(request);
    }

    try {
      const model = this.genAI.getGenerativeModel({ model: "gemini-pro" });
      const prompt = this.createPrompt(request);
      const result = await model.generateContent(prompt);
      const response = result.response;
      const text = response.text();

      // The response from Gemini is expected to be a JSON string.
      const translationResult = JSON.parse(text) as Omit<TranslationResult, 'id' | 'term'>;

      return {
        id: `term_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`,
        term: request.term,
        ...translationResult,
      };
    } catch (error) {
      console.warn("LLM translation failed, falling back to basic result:", error);
      return this.createFallbackResult(request);
    }
  }

  /**
   * Get multiple translations for batch processing
   */
  async translateBatch(requests: TranslationRequest[]): Promise<TranslationResult[]> {
    if (!this.isConfigured) {
      return requests.map(request => this.createFallbackResult(request));
    }

    const results = await Promise.allSettled(
      requests.map(request => this.translateTerm(request))
    );

    return results
      .filter((result): result is PromiseFulfilledResult<TranslationResult> =>
        result.status === 'fulfilled'
      )
      .map(result => result.value);
  }

  /**
   * Create a fallback result when LLM is not available
   */
  private createFallbackResult(request: TranslationRequest): TranslationResult {
    return {
      id: `fallback_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`,
      term: request.term,
      translation: `[Translation for "${request.term}"]`,
      pronunciation: `[Pronunciation for "${request.term}"]`,
      definition: `[Definition for "${request.term}" - LLM service not configured]`,
      etymology: "Etymology not available",
      usageExamples: [`Example usage of "${request.term}"`],
      synonyms: ["synonym1", "synonym2"],
      relatedTerms: ["related1", "related2"],
      difficulty: 'intermediate' as const,
      category: request.specialty || 'general',
      subcategory: 'terminology',
      confidence: 0.5,
      sources: ['Fallback service'],
      imageUrl: undefined,
      audioUrl: undefined,
    };
  }

  /**
   * Get pronunciation audio URL
   */
  async getPronunciationAudio(term: string, language: string = 'en'): Promise<string> {
    // This would ideally call a Text-to-Speech API.
    // For now, we'll return a placeholder.
    return `https://api.pronunciation.com/audio/${language}/${encodeURIComponent(term)}.mp3`;
  }

  private createPrompt(request: TranslationRequest): string {
    return `
      Provide a detailed translation and definition for the term "${request.term}" from ${request.sourceLanguage} to ${request.targetLanguage}.
      The user has provided the following context: "${request.context || 'none'}".
      The specialty is ${request.specialty || 'general'}.

      Please return the response as a JSON object with the following structure:
      {
        "translation": "...",
        "pronunciation": "...",
        "definition": "...",
        "etymology": "...",
        "usageExamples": ["...", "..."],
        "synonyms": ["...", "..."],
        "relatedTerms": ["...", "..."],
        "difficulty": "beginner" | "intermediate" | "advanced" | "expert",
        "category": "...",
        "subcategory": "...",
        "confidence": 0.0 to 1.0,
        "sources": ["...", "..."]
      }
    `;
  }

  private handleError(error: unknown): LLMError {
    console.error("Error in LLMTranslationService:", error);
    return {
      code: 'TRANSLATION_ERROR',
      message: 'Failed to translate term',
      details: error
    };
  }
}

// Lazy initialization to avoid startup errors
let _llmTranslationService: LLMTranslationService | null = null;

export const llmTranslationService = {
  getInstance(): LLMTranslationService {
    if (!_llmTranslationService) {
      _llmTranslationService = new LLMTranslationService();
    }
    return _llmTranslationService;
  },

  async translateTerm(request: TranslationRequest): Promise<TranslationResult> {
    return this.getInstance().translateTerm(request);
  },

  async translateBatch(requests: TranslationRequest[]): Promise<TranslationResult[]> {
    return this.getInstance().translateBatch(requests);
  },

  async getPronunciationAudio(term: string, language: string = 'en'): Promise<string> {
    return this.getInstance().getPronunciationAudio(term, language);
  }
};
