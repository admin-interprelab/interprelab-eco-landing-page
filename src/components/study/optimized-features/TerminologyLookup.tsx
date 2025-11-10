import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Plus, BookMarked, Volume2, Trash2, Edit, Save } from 'lucide-react';
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
  example?: string;
  imageUrl?: string;
}

export const TerminologyLookup = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [result, setResult] = useState<TermResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [glossaryTerms, setGlossaryTerms] = useState<GlossaryTerm[]>([]);
  const [editingTerm, setEditingTerm] = useState<GlossaryTerm | null>(null);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      loadGlossaryTerms();
    }
  }, [user]);

  const loadGlossaryTerms = async () => {
    if (!user?.id) return;

    const { data, error } = await supabase
      .from('glossary_terms')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      toast({
        title: 'Error loading glossary',
        description: error.message,
        variant: 'destructive',
      });
    } else if (data) {
      setGlossaryTerms(data as GlossaryTerm[]);
    }
  };

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;

    setIsLoading(true);

    try {
      const response = await fetch(import.meta.env.VITE_GLOSSARY_FUNCTION_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ term: searchTerm }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch term definition.');
      }

      const data = await response.json();

      // For now, we'll use a placeholder for translation as the backend doesn't provide it yet.
      setResult({
        english: searchTerm,
        translation: 'Diagnóstico', // Placeholder
        pronunciation: data.pronunciation,
        definition: data.definition,
        example: data.example,
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Could not look up the term.',
        variant: 'destructive',
      });
      setResult(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddToGlossary = async () => {
    if (!result || !user?.id) return;

    const newTerm = {
      user_id: user.id,
      term: result.english,
      definition: result.definition,
      pronunciation: result.pronunciation,
      target_language: result.translation,
      source_language: 'English',
      category: 'Medical', // Or derive from context if available
    };

    const { data, error } = await supabase
      .from('glossary_terms')
      .insert([newTerm])
      .select();

    if (error) {
      toast({
        title: 'Error adding term',
        description: error.message,
        variant: 'destructive',
      });
    } else if (data) {
      toast({
        title: 'Success',
        description: `"${result.english}" has been added to your glossary.`,
      });
      setGlossaryTerms([data[0] as GlossaryTerm, ...glossaryTerms]);
    }
  };

  const deleteTerm = async (termId: string) => {
    const { error } = await supabase.from('glossary_terms').delete().eq('id', termId);

    if (error) {
      toast({
        title: 'Error deleting term',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      setGlossaryTerms(glossaryTerms.filter((term) => term.id !== termId));
      toast({ title: 'Term removed from glossary.' });
    }
  };

  const handleUpdateTerm = async () => {
    if (!editingTerm) return;

    const { data, error } = await supabase
      .from('glossary_terms')
      .update({
        term: editingTerm.term,
        definition: editingTerm.definition,
        pronunciation: editingTerm.pronunciation,
        target_language: editingTerm.target_language,
      })
      .eq('id', editingTerm.id)
      .select();

    if (error) {
      toast({ title: 'Error updating term', description: error.message, variant: 'destructive' });
    } else if (data) {
      toast({ title: 'Success', description: 'Term updated successfully.' });
      setGlossaryTerms(glossaryTerms.map(t => t.id === editingTerm.id ? data[0] : t));
      setEditingTerm(null);
    }
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

                {result.example && (
                  <div className="pt-4 border-t border-border/50">
                    <p className="text-sm font-semibold mb-2">Example:</p>
                    <p className="text-sm text-muted-foreground italic">"{result.example}"</p>
                  </div>
                )}
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
                <Card key={term.id} className="glass border-border/30 overflow-hidden">
                  {editingTerm?.id === term.id ? (
                    <CardContent className="p-4 space-y-3 bg-primary/5">
                      <Input
                        value={editingTerm.term}
                        onChange={(e) => setEditingTerm({ ...editingTerm, term: e.target.value })}
                        className="font-semibold"
                      />
                      <Input
                        value={editingTerm.definition}
                        onChange={(e) => setEditingTerm({ ...editingTerm, definition: e.target.value })}
                        placeholder="Definition"
                      />
                      <Input
                        value={editingTerm.pronunciation || ''}
                        onChange={(e) => setEditingTerm({ ...editingTerm, pronunciation: e.target.value })}
                        placeholder="Pronunciation"
                      />
                      <Input
                        value={editingTerm.target_language || ''}
                        onChange={(e) => setEditingTerm({ ...editingTerm, target_language: e.target.value })}
                        placeholder="Translation"
                      />
                      <div className="flex gap-2 justify-end">
                        <Button variant="ghost" size="sm" onClick={() => setEditingTerm(null)}>Cancel</Button>
                        <Button size="sm" onClick={handleUpdateTerm}><Save className="w-4 h-4 mr-2" />Save</Button>
                      </div>
                    </CardContent>
                  ) : (
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
                        <div className="flex flex-col gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setEditingTerm(term)}
                            className="h-8 w-8"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => deleteTerm(term.id)}
                            className="text-destructive hover:text-destructive h-8 w-8"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
