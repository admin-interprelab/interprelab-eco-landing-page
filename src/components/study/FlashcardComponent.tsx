import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RotateCcw, ChevronLeft, ChevronRight, Check, X } from 'lucide-react';

interface Flashcard {
  id: string;
  front: string;
  back: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

interface FlashcardComponentProps {
  flashcards: Flashcard[];
  onComplete: (results: { correct: number; total: number }) => void;
}

export const FlashcardComponent: React.FC<FlashcardComponentProps> = ({
  flashcards,
  onComplete
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [results, setResults] = useState<{ [key: string]: boolean }>({});
  const [showResults, setShowResults] = useState(false);

  const currentCard = flashcards[currentIndex];
  const isLastCard = currentIndex === flashcards.length - 1;
  const correctAnswers = Object.values(results).filter(Boolean).length;

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleAnswer = (correct: boolean) => {
    setResults(prev => ({ ...prev, [currentCard.id]: correct }));

    if (isLastCard) {
      setShowResults(true);
      onComplete({ correct: correctAnswers + (correct ? 1 : 0), total: flashcards.length });
    } else {
      setCurrentIndex(prev => prev + 1);
      setIsFlipped(false);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      setIsFlipped(false);
    }
  };

  const handleNext = () => {
    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setIsFlipped(false);
    }
  };

  const resetSession = () => {
    setCurrentIndex(0);
    setIsFlipped(false);
    setResults({});
    setShowResults(false);
  };

  if (showResults) {
    return (
      <Card className="bg-white/10 backdrop-blur-md border border-white/20 shadow-xl">
        <CardContent className="p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">Session Complete!</h3>
          <div className="text-4xl font-bold text-green-400 mb-2">
            {correctAnswers}/{flashcards.length}
          </div>
          <p className="text-blue-200 mb-6">
            {Math.round((correctAnswers / flashcards.length) * 100)}% Correct
          </p>
          <Button
            onClick={resetSession}
            className="bg-white/20 hover:bg-white/30 text-white border border-white/30"
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Study Again
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {/* Progress */}
      <div className="flex items-center justify-between text-white">
        <span className="text-sm">
          Card {currentIndex + 1} of {flashcards.length}
        </span>
        <span className="text-sm">
          Category: {currentCard.category}
        </span>
      </div>

      {/* Flashcard */}
      <Card
        className="bg-white/10 backdrop-blur-md border border-white/20 shadow-xl cursor-pointer transform transition-transform hover:scale-105"
        onClick={handleFlip}
      >
        <CardContent className="p-8 min-h-[300px] flex items-center justify-center">
          <div className="text-center">
            <div className="text-lg text-white mb-4">
              {isFlipped ? currentCard.back : currentCard.front}
            </div>
            {!isFlipped && (
              <p className="text-blue-200 text-sm">Click to reveal answer</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Controls */}
      <div className="flex items-center justify-between">
        <Button
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          variant="ghost"
          className="text-white hover:bg-white/20"
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Previous
        </Button>

        {isFlipped && (
          <div className="flex gap-2">
            <Button
              onClick={() => handleAnswer(false)}
              variant="destructive"
              className="bg-red-500/20 hover:bg-red-500/30 text-red-200 border border-red-500/30"
            >
              <X className="h-4 w-4 mr-2" />
              Incorrect
            </Button>
            <Button
              onClick={() => handleAnswer(true)}
              className="bg-green-500/20 hover:bg-green-500/30 text-green-200 border border-green-500/30"
            >
              <Check className="h-4 w-4 mr-2" />
              Correct
            </Button>
          </div>
        )}

        <Button
          onClick={handleNext}
          disabled={currentIndex === flashcards.length - 1}
          variant="ghost"
          className="text-white hover:bg-white/20"
        >
          Next
          <ChevronRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};
