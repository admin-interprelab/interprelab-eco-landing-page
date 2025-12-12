import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FlashcardDeck } from './FlashcardDeck';
import { Plus, Layers } from 'lucide-react';

type CardType = 'root-words' | 'term-translation' | 'term-definition' | 'custom';

export const FlashcardBuilder = () => {
  const [selectedType, setSelectedType] = useState<CardType>('root-words');
  const [showDeck, setShowDeck] = useState(false);

  const cardTypes = [
    { value: 'root-words', label: 'Root Words (Vocabulary Training)' },
    { value: 'term-translation', label: 'Terminology & Translations' },
    { value: 'term-definition', label: 'Terminology & Definitions' },
    { value: 'custom', label: 'Custom Flashcards' },
  ];

  const generateDeck = async () => {
    setShowDeck(true);
  };

  return (
    <div className="space-y-8">
      <Card className="glass border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Layers className="w-6 h-6 text-primary" />
            Build Your Flashcard Deck
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <label className="text-sm font-medium">Select Card Type</label>
            <Select value={selectedType} onValueChange={(value) => setSelectedType(value as CardType)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Choose card type" />
              </SelectTrigger>
              <SelectContent>
                {cardTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button
              onClick={generateDeck}
              className="w-full"
            >
              <Plus className="w-4 h-4 mr-2" />
              Generate AI Deck
            </Button>
            <Button variant="outline" className="w-full">
              <Layers className="w-4 h-4 mr-2" />
              View Saved Decks
            </Button>
          </div>
        </CardContent>
      </Card>

      {showDeck && (
        <div className="animate-fade-in">
          <FlashcardDeck cardType={selectedType} />
        </div>
      )}

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {cardTypes.map((type, index) => (
          <Card
            key={type.value}
            className="glass border-border/50 hover:border-primary/50 transition-all duration-300 cursor-pointer hover-lift"
            onClick={() => setSelectedType(type.value as CardType)}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <CardContent className="p-6">
              <h3 className="font-semibold mb-2">{type.label}</h3>
              <p className="text-sm text-muted-foreground">
                {type.value === 'root-words' && 'Practice vocabulary roots and build linguistic foundations'}
                {type.value === 'term-translation' && 'Master terminology across languages with translations'}
                {type.value === 'term-definition' && 'Learn precise definitions of technical terms'}
                {type.value === 'custom' && 'Create your own personalized study cards'}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
