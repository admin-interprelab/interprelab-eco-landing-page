import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Plus, BookMarked, Volume2, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface GlossaryTerm {
  id: string;
  user_id: string | null;
  term: string;
  definition: string;
  pronunciation: string | null;
  category: string | null;
  subcategory: string | null;
  language_code: string | null;
  source_language: string | null;
  target_language: string | null;
  difficulty_level: string | null;
  usage_example: string | null;
  notes: string | null;
  tags: string[] | null;
  is_public: boolean | null;
  is_verified: boolean | null;
  usage_count: number | null;
  created_at: string;
  updated_at: string;
}

interface TermResult {
  english: string;
  translation: string;
  pronunciation: string;
  definition: string;
  imageUrl?: string;
}

export const TerminologyLookup = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [result, setResult] = useState<TermResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [glossaryTerms, setGlossaryTerms] = useState<GlossaryTerm[]>([]);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      loadGlossaryTerms();
    }
  }, [user]);

  const loadGlossaryTerms = async () => {
    if (!user?.id) return;

    // TODO: glossary_terms table needs to be created
    // Temporarily disabled until database migration is complete
    console.log('Glossary terms feature coming soon');
    setGlossaryTerms([]);
  };

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;

    setIsLoading(true);

    // TODO: Database lookup disabled until glossary_terms table is created
    // Simulate AI lookup for demo purposes

    // Simulate AI lookup for demo purposes
    setTimeout(() => {
      setResult({
        english: searchTerm,
        translation: 'Diagnóstico',
        pronunciation: '/di.aɡˈnos.ti.ko/',
        definition: 'The identification of the nature of an illness or other problem by examination of the symptoms.',
        imageUrl: undefined,
      });
      setIsLoading(false);
    }, 1000);
  };

  const handleAddToGlossary = async () => {
    if (!result || !user?.id) return;

    // TODO: glossary_terms table needs to be created
    toast({
      title: 'Coming Soon',
      description: 'Glossary feature will be available after database setup.',
    });
  };

  const deleteTerm = async (termId: string) => {
    // TODO: glossary_terms table needs to be created
    toast({
      title: 'Coming Soon',
      description: 'Glossary feature will be available after database setup.',
    });
  };

  const playPronunciation = () => {
    if (result?.pronunciation && 'speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(result.english);
      utterance.lang = 'en-US';
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="glass border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="w-6 h-6 text-primary" />
            Terminology Lookup
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Enter term in English or target language..."
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
            <Button onClick={handleSearch} disabled={isLoading}>
              <Search className="w-4 h-4 mr-2" />
              Search
            </Button>
          </div>

          {isLoading && (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
              <p className="text-sm text-muted-foreground mt-2">Looking up term...</p>
            </div>
          )}

          {result && !isLoading && (
            <Card className="glass border-primary/20 animate-fade-in">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <h3 className="text-2xl font-bold">{result.english}</h3>
                      <Badge variant="outline">English</Badge>
                    </div>
                    <div className="flex items-center gap-3">
                      <h3 className="text-2xl font-bold text-primary">{result.translation}</h3>
                      <Badge>Spanish</Badge>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleAddToGlossary}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add to Glossary
                  </Button>
                </div>

                <div className="flex items-center gap-2 text-muted-foreground">
                  <span className="font-mono text-lg">{result.pronunciation}</span>
                  <Button variant="ghost" size="sm" onClick={playPronunciation}>
                    <Volume2 className="w-4 h-4" />
                  </Button>
                </div>

                <div className="pt-4 border-t border-border/50">
                  <p className="text-sm font-semibold mb-2">Definition:</p>
                  <p className="text-sm text-muted-foreground">{result.definition}</p>
                </div>

                {result.imageUrl && (
                  <div className="pt-4 border-t border-border/50">
                    <img
                      src={result.imageUrl}
                      alt={result.english}
                      className="rounded-lg max-w-full h-auto"
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>

      {/* Custom Glossary Section */}
      <Card className="glass border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookMarked className="w-6 h-6 text-primary" />
            Your Custom Glossary
          </CardTitle>
        </CardHeader>
        <CardContent>
          {glossaryTerms.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <BookMarked className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p className="text-sm">No terms saved yet. Start searching and add terms to build your glossary!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {glossaryTerms.map((term) => (
                <Card key={term.id} className="glass border-border/30">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-semibold">{term.term}</h4>
                          {term.category && (
                            <Badge variant="outline" className="text-xs">
                              {term.category}
                            </Badge>
                          )}
                          {term.difficulty_level && (
                            <Badge variant="secondary" className="text-xs">
                              {term.difficulty_level}
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{term.definition}</p>
                        {term.pronunciation && (
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span className="font-mono">{term.pronunciation}</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                if ('speechSynthesis' in window) {
                                  const utterance = new SpeechSynthesisUtterance(term.term);
                                  utterance.lang = 'en-US';
                                  speechSynthesis.speak(utterance);
                                }
                              }}
                            >
                              <Volume2 className="w-3 h-3" />
                            </Button>
                          </div>
                        )}
                        {term.target_language && (
                          <p className="text-sm text-primary mt-1">
                            Translation: {term.target_language}
                          </p>
                        )}
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteTerm(term.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
