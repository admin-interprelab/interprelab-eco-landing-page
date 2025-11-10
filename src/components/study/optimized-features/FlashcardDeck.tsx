import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, RotateCw } from 'lucide-react';
import './flashcard-animations.css';

interface FlashcardDeckProps {
  cardType: string;
}

interface FlashcardData {
  front: string;
  back: string;
  image?: string;
  pronunciation?: string;
}

export const FlashcardDeck = ({ cardType }: FlashcardDeckProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [direction, setDirection] = useState<'next' | 'prev' | null>(null);

  // Sample data - will be replaced with real data
  const sampleCards: FlashcardData[] = [
    {
      front: 'Diagnosis',
      back: 'Diagnóstico',
      pronunciation: '/di.aɡˈnos.ti.ko/',
    },
    {
      front: 'Treatment',
      back: 'Tratamiento',
      pronunciation: '/tɾa.taˈmjen.to/',
    },
    {
      front: 'Prescription',
      back: 'Receta médica',
      pronunciation: '/re.ˈse.ta ˈme.ði.ka/',
    },
  ];

  const currentCard = sampleCards[currentIndex];

  const handleNext = () => {
    if (currentIndex < sampleCards.length - 1) {
      setDirection('next');
      setIsFlipped(false);
      setTimeout(() => {
        setCurrentIndex(currentIndex + 1);
        setDirection(null);
      }, 300);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setDirection('prev');
      setIsFlipped(false);
      setTimeout(() => {
        setCurrentIndex(currentIndex - 1);
        setDirection(null);
      }, 300);
    }
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      {/* Progress indicator */}
      <div className="mb-8 text-center">
        <p className="text-sm text-muted-foreground mb-2">
          Card {currentIndex + 1} of {sampleCards.length}
        </p>
        <div className="w-full bg-muted rounded-full h-2">
          <div
            className="bg-primary rounded-full h-2 transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / sampleCards.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Flashcard Stack */}
      <div className="flashcard-container">
        {/* Background cards for depth effect */}
        {currentIndex + 1 < sampleCards.length && (
          <div className="flashcard-stack flashcard-stack-2" />
        )}
        {currentIndex + 2 < sampleCards.length && (
          <div className="flashcard-stack flashcard-stack-3" />
        )}

        {/* Main Card */}
        <div
          className={`flashcard-3d ${isFlipped ? 'flipped' : ''} ${direction === 'next' ? 'slide-out-left' : ''} ${direction === 'prev' ? 'slide-out-right' : ''}`}
          onClick={handleFlip}
        >
          <Card className="flashcard-face flashcard-front">
            <div className="flex flex-col items-center justify-center h-full p-12">
              <div className="text-center space-y-4">
                <h2 className="text-5xl font-bold text-foreground">
                  {currentCard.front}
                </h2>
                <p className="text-sm text-muted-foreground">
                  Click to reveal translation
                </p>
              </div>
            </div>
          </Card>

          <Card className="flashcard-face flashcard-back">
            <div className="flex flex-col items-center justify-center h-full p-12">
              <div className="text-center space-y-6">
                <h2 className="text-5xl font-bold text-primary">
                  {currentCard.back}
                </h2>
                {currentCard.pronunciation && (
                  <p className="text-xl text-muted-foreground font-mono">
                    {currentCard.pronunciation}
                  </p>
                )}
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4 mt-8">
        <Button
          variant="outline"
          size="lg"
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="hover-lift"
        >
          <ChevronLeft className="w-5 h-5" />
          Previous
        </Button>

        <Button
          variant="outline"
          size="lg"
          onClick={handleFlip}
          className="hover-lift"
        >
          <RotateCw className="w-5 h-5 mr-2" />
          Flip Card
        </Button>

        <Button
          variant="outline"
          size="lg"
          onClick={handleNext}
          disabled={currentIndex === sampleCards.length - 1}
          className="hover-lift"
        >
          Next
          <ChevronRight className="w-5 h-5" />
        </Button>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center gap-4 mt-6">
        <Button variant="success" className="hover-lift">
          Know It
        </Button>
        <Button variant="destructive" className="hover-lift">
          Need Practice
        </Button>
      </div>
    </div>
  );
};
