/**
 * Types for Terminology Lookup System
 */

export interface GlossaryTerm {
  id: string;
  userId: string;
  term: string;
  translation: string;
  pronunciation: string;
  definition: string;
  etymology?: string;
  usageExamples: string[];
  synonyms: string[];
  relatedTerms: string[];
  category: string;
  subcategory?: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  tags: string[];
  isFavorite: boolean;
  isPublic: boolean;
  confidence: number;
  sources: string[];
  createdAt: Date;
  updatedAt: Date;
  lastReviewed?: Date;
  reviewCount: number;
}

export interface SearchFilters {
  category?: string;
  difficulty?: string;
  isFavorite?: boolean;
  tags?: string[];
  dateRange?: {
    start: Date;
    end: Date;
  };
}

export interface SearchResult {
  term: GlossaryTerm;
  relevanceScore: number;
  matchType: 'exact' | 'partial' | 'related';
}

export interface SearchHistory {
  id: string;
  query: string;
  timestamp: Date;
  resultCount: number;
}

export interface TerminologyStats {
  totalTerms: number;
  categoryCounts: Record<string, number>;
  difficultyDistribution: Record<string, number>;
  recentlyAdded: number;
  favoriteCount: number;
  averageConfidence: number;
}
