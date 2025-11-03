import { useState, useEffect, useCallback, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import {
  Search,
  Plus,
  BookMarked,
  Volume2,
  Trash2,
  Star,
  Copy,
  History,
  Sparkles,
  RefreshCw,
  Heart,
  Clock,
  Eye,
  TrendingUp
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { llmTranslationService, type TranslationResult } from '@/services/llm-translation';
import type { GlossaryTerm, SearchHistory, TerminologyStats } from '@/types/terminology';

// Constants
const DEFAULT_SOURCE_LANGUAGE = 'en';
const DEFAULT_TARGET_LANGUAGE = 'es';
const DEFAULT_SPECIALTY = 'medical';
const MAX_SEARCH_HISTORY = 50;

const LANGUAGE_OPTIONS = [
  { value: 'en', label: 'English', flag: '🇺🇸' },
  { value: 'es', label: 'Spanish', flag: '🇪🇸' },
  { value: 'fr', label: 'French', flag: '🇫🇷' },
  { value: 'de', label: 'German', flag: '🇩🇪' },
] as const;

const SPECIALTY_OPTIONS = [
  { value: 'medical', label: 'Medical', icon: '🏥' },
  { value: 'legal', label: 'Legal', icon: '⚖️' },
  { value: 'business', label: 'Business', icon: '💼' },
  { value: 'general', label: 'General', icon: '🌐' },
] as const;

/**
 * Search Bar Component
 */
interface SearchBarProps {
  searchTerm: string;
  onSearchTermChange: (term: string) => void;
  onSearch: (term: string) => void;
  isLoading: boolean;
  sourceLanguage: string;
  targetLanguage: string;
  specialty: string;
  onSourceLanguageChange: (lang: string) => void;
  onTargetLanguageChange: (lang: string) => void;
  onSpecialtyChange: (spec: string) => void;
}

const SearchBar = ({
  searchTerm,
  onSearchTermChange,
  onSearch,
  isLoading,
  sourceLanguage,
  targetLanguage,
  specialty,
  onSourceLanguageChange,
  onTargetLanguageChange,
  onSpecialtyChange,
}: SearchBarProps) => (
  <Card className="glass border-border/50">
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <Search className="w-6 h-6 text-primary" />
        AI-Powered Terminology Lookup
      </CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label>From Language</Label>
          <Select value={sourceLanguage} onValueChange={onSourceLanguageChange}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {LANGUAGE_OPTIONS.map((lang) => (
                <SelectItem key={lang.value} value={lang.value}>
                  {lang.flag} {lang.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>To Language</Label>
          <Select value={targetLanguage} onValueChange={onTargetLanguageChange}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {LANGUAGE_OPTIONS.map((lang) => (
                <SelectItem key={lang.value} value={lang.value}>
                  {lang.flag} {lang.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Specialty</Label>
          <Select value={specialty} onValueChange={onSpecialtyChange}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {SPECIALTY_OPTIONS.map((spec) => (
                <SelectItem key={spec.value} value={spec.value}>
                  {spec.icon} {spec.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex gap-2">
        <Input
          value={searchTerm}
          onChange={(e) => onSearchTermChange(e.target.value)}
          placeholder="Enter term to translate and define..."
          onKeyDown={(e) => e.key === 'Enter' && !isLoading && onSearch(searchTerm)}
          className="flex-1"
        />
        <Button
          onClick={() => onSearch(searchTerm)}
          disabled={isLoading || !searchTerm.trim()}
        >
          {isLoading ? <RefreshCw className="w-4 h-4 mr-2 animate-spin" /> : <Search className="w-4 h-4 mr-2" />}
          {isLoading ? 'Searching...' : 'Search'}
        </Button>
      </div>
    </CardContent>
  </Card>
);

/**
 * Translation Result Component
 */
interface TranslationResultProps {
  result: TranslationResult;
  onAddToGlossary: (result: TranslationResult) => void;
  onPlayPronunciation: (text: string) => void;
}

const TranslationResultCard = ({ result, onAddToGlossary, onPlayPronunciation }: TranslationResultProps) => (
  <Card className="glass border-primary/20 animate-fade-in">
    <CardContent className="p-6 space-y-6">
      <div className="flex items-start justify-between">
        <div className="space-y-3 flex-1">
          <div className="flex items-center gap-3">
            <h3 className="text-2xl font-bold">{result.term}</h3>
            <Badge variant="outline">English</Badge>
            <Button variant="ghost" size="sm" onClick={() => onPlayPronunciation(result.term)}>
              <Volume2 className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex items-center gap-3">
            <h3 className="text-2xl font-bold text-primary">{result.translation}</h3>
            <Badge>Spanish</Badge>
            <Button variant="ghost" size="sm" onClick={() => onPlayPronunciation(result.translation)}>
              <Volume2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
        <Button variant="outline" size="sm" onClick={() => onAddToGlossary(result)}>
          <Plus className="w-4 h-4 mr-2" />
          Add to Glossary
        </Button>
      </div>

      <div className="text-muted-foreground">
        <span className="font-mono text-lg">{result.pronunciation}</span>
      </div>

      <div className="flex flex-wrap gap-2">
        <Badge variant="outline">{result.category}</Badge>
        <Badge variant={result.difficulty === 'beginner' ? 'default' : 'secondary'}>
          {result.difficulty}
        </Badge>
      </div>

      <div className="space-y-2">
        <h4 className="font-semibold">Definition</h4>
        <p className="text-sm text-muted-foreground">{result.definition}</p>
      </div>

      {result.usageExamples.length > 0 && (
        <div className="space-y-2">
          <h4 className="font-semibold">Usage Examples</h4>
          <ul className="space-y-1">
            {result.usageExamples.map((example, index) => (
              <li key={index} className="text-sm text-muted-foreground">• {example}</li>
            ))}
          </ul>
        </div>
      )}
    </CardContent>
  </Card>
);

/**
 * Loading State Component
 */
const LoadingState = () => (
  <Card className="glass border-border/50">
    <CardContent className="p-6">
      <div className="flex flex-col items-center justify-center space-y-4 py-8">
        <RefreshCw className="w-8 h-8 text-primary animate-spin" />
        <div className="text-center space-y-2">
          <p className="font-medium">AI is analyzing your term...</p>
          <p className="text-sm text-muted-foreground">Getting translation and definition</p>
        </div>
      </div>
    </CardContent>
  </Card>
);

/**
 * Glossary Manager Component
 */
interface GlossaryManagerProps {
  terms: GlossaryTerm[];
  onDeleteTerm: (termId: string) => void;
  onToggleFavorite: (termId: string) => void;
  onPlayPronunciation: (text: string) => void;
}

const GlossaryManager = ({ terms, onDeleteTerm, onToggleFavorite, onPlayPronunciation }: GlossaryManagerProps) => {
  const [searchFilter, setSearchFilter] = useState('');

  const filteredTerms = useMemo(() => {
    if (!searchFilter) return terms;
    return terms.filter(term =>
      term.term.toLowerCase().includes(searchFilter.toLowerCase()) ||
      term.translation.toLowerCase().includes(searchFilter.toLowerCase())
    );
  }, [terms, searchFilter]);

  return (
    <Card className="glass border-border/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookMarked className="w-6 h-6 text-primary" />
          Your Personal Glossary ({terms.length})
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input
          placeholder="Search your glossary..."
          value={searchFilter}
          onChange={(e) => setSearchFilter(e.target.value)}
        />

        {filteredTerms.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <BookMarked className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p className="font-medium">
              {terms.length === 0 ? 'No terms saved yet' : 'No terms match your search'}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredTerms.map((term) => (
              <Card key={term.id} className="glass border-border/30">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold">{term.term}</h4>
                        <span className="text-muted-foreground">→</span>
                        <span className="font-medium text-primary">{term.translation}</span>
                        {term.isFavorite && <Heart className="w-4 h-4 text-red-500 fill-current" />}
                      </div>

                      {term.pronunciation && (
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-sm text-muted-foreground">{term.pronunciation}</span>
                          <Button variant="ghost" size="sm" onClick={() => onPlayPronunciation(term.term)}>
                            <Volume2 className="w-3 h-3" />
                          </Button>
                        </div>
                      )}

                      <p className="text-sm text-muted-foreground">{term.definition}</p>

                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>{new Date(term.createdAt).toLocaleDateString()}</span>
                        <Badge variant="outline" className="text-xs">{term.category}</Badge>
                      </div>
                    </div>

                    <div className="flex flex-col gap-1 ml-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onToggleFavorite(term.id)}
                        className={term.isFavorite ? 'text-red-500' : 'text-muted-foreground'}
                      >
                        <Heart className={`w-4 h-4 ${term.isFavorite ? 'fill-current' : ''}`} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onDeleteTerm(term.id)}
                        className="text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

/**
 * Main Terminology Lookup Component
 */
export const TerminologyLookup = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [translationResult, setTranslationResult] = useState<TranslationResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [glossaryTerms, setGlossaryTerms] = useState<GlossaryTerm[]>([]);
  const [sourceLanguage, setSourceLanguage] = useState(DEFAULT_SOURCE_LANGUAGE);
  const [targetLanguage, setTargetLanguage] = useState(DEFAULT_TARGET_LANGUAGE);
  const [specialty, setSpecialty] = useState(DEFAULT_SPECIALTY);

  const { user } = useAuth();
  const { toast } = useToast();

  // Load glossary terms from localStorage
  const loadGlossaryTerms = useCallback(() => {
    if (!user?.id) return;
    try {
      const stored = localStorage.getItem(`glossary_${user.id}`);
      if (stored) {
        setGlossaryTerms(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Error loading glossary:', error);
    }
  }, [user?.id]);

  // Save glossary terms to localStorage
  const saveGlossaryTerms = useCallback((terms: GlossaryTerm[]) => {
    if (!user?.id) return;
    try {
      localStorage.setItem(`glossary_${user.id}`, JSON.stringify(terms));
      setGlossaryTerms(terms);
    } catch (error) {
      console.error('Error saving glossary:', error);
    }
  }, [user?.id]);

  // Load glossary on mount
  useEffect(() => {
    loadGlossaryTerms();
  }, [loadGlossaryTerms]);

  // Search for term
  const handleSearch = useCallback(async (query: string) => {
    if (!query.trim()) return;

    setIsLoading(true);
    try {
      // Check local glossary first
      const localMatch = glossaryTerms.find(term =>
        term.term.toLowerCase() === query.toLowerCase()
      );

      if (localMatch) {
        setTranslationResult({
          id: localMatch.id,
          term: localMatch.term,
          translation: localMatch.translation,
          pronunciation: localMatch.pronunciation,
          definition: localMatch.definition,
          etymology: localMatch.etymology,
          usageExamples: localMatch.usageExamples,
          synonyms: localMatch.synonyms,
          relatedTerms: localMatch.relatedTerms,
          difficulty: localMatch.difficulty,
          category: localMatch.category,
          subcategory: localMatch.subcategory,
          confidence: localMatch.confidence,
          sources: localMatch.sources,
        });
        setIsLoading(false);
        return;
      }

      // Use LLM service
      const result = await llmTranslationService.translateTerm({
        term: query,
        sourceLanguage,
        targetLanguage,
        specialty,
      });

      setTranslationResult(result);
    } catch (error) {
      console.error('Search error:', error);
      toast({
        title: 'Search Error',
        description: 'Failed to search for term. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }, [glossaryTerms, sourceLanguage, targetLanguage, specialty, toast]);

  // Add term to glossary
  const handleAddToGlossary = useCallback((result: TranslationResult) => {
    const newTerm: GlossaryTerm = {
      id: result.id,
      userId: user?.id || 'anonymous',
      term: result.term,
      translation: result.translation,
      pronunciation: result.pronunciation,
      definition: result.definition,
      etymology: result.etymology,
      usageExamples: result.usageExamples,
      synonyms: result.synonyms,
      relatedTerms: result.relatedTerms,
      category: result.category,
      subcategory: result.subcategory,
      difficulty: result.difficulty,
      tags: [result.category.toLowerCase(), specialty],
      isFavorite: false,
      isPublic: false,
      confidence: result.confidence,
      sources: result.sources,
      createdAt: new Date(),
      updatedAt: new Date(),
      reviewCount: 0,
    };

    const updatedTerms = [newTerm, ...glossaryTerms];
    saveGlossaryTerms(updatedTerms);

    toast({
      title: 'Term Added',
      description: `"${result.term}" has been added to your glossary!`,
    });
  }, [glossaryTerms, saveGlossaryTerms, specialty, user?.id, toast]);

  // Delete term
  const handleDeleteTerm = useCallback((termId: string) => {
    const updatedTerms = glossaryTerms.filter(term => term.id !== termId);
    saveGlossaryTerms(updatedTerms);
    toast({
      title: 'Term Removed',
      description: 'Term has been removed from your glossary.',
    });
  }, [glossaryTerms, saveGlossaryTerms, toast]);

  // Toggle favorite
  const handleToggleFavorite = useCallback((termId: string) => {
    const updatedTerms = glossaryTerms.map(term =>
      term.id === termId ? { ...term, isFavorite: !term.isFavorite } : term
    );
    saveGlossaryTerms(updatedTerms);
  }, [glossaryTerms, saveGlossaryTerms]);

  // Play pronunciation
  const handlePlayPronunciation = useCallback((text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
    }
  }, []);

  return (
    <div className="space-y-6">
      <SearchBar
        searchTerm={searchQuery}
        onSearchTermChange={setSearchQuery}
        onSearch={handleSearch}
        isLoading={isLoading}
        sourceLanguage={sourceLanguage}
        targetLanguage={targetLanguage}
        specialty={specialty}
        onSourceLanguageChange={setSourceLanguage}
        onTargetLanguageChange={setTargetLanguage}
        onSpecialtyChange={setSpecialty}
      />

      {isLoading && <LoadingState />}

      {translationResult && !isLoading && (
        <TranslationResultCard
          result={translationResult}
          onAddToGlossary={handleAddToGlossary}
          onPlayPronunciation={handlePlayPronunciation}
        />
      )}

      <GlossaryManager
        terms={glossaryTerms}
        onDeleteTerm={handleDeleteTerm}
        onToggleFavorite={handleToggleFavorite}
        onPlayPronunciation={handlePlayPronunciation}
      />

      <Card className="glass border-border/50 border-l-4 border-l-primary">
        <CardContent className="p-6">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            AI-Powered Features
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
            <ul className="space-y-2">
              <li>• Instant AI translation with context</li>
              <li>• Comprehensive definitions and etymology</li>
              <li>• Usage examples and synonyms</li>
            </ul>
            <ul className="space-y-2">
              <li>• Personal glossary with favorites</li>
              <li>• Audio pronunciation support</li>
              <li>• Multi-language and specialty support</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
