import { useState, useCallback, useMemo, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight, RotateCw, Volume2, CheckCircle, XCircle, BarChart3, Shuffle } from 'lucide-react';
import './flashcard-animations.css';

// Constants for better maintainability
const ANIMATION_DURATION = 300;
const DEFAULT_CARD_HEIGHT = 500;
const PROGRESS_BAR_HEIGHT = 2;

// Types for better type safety
interface FlashcardData {
  id: string;
  front: string;
  back: string;
  image?: string;
  pronunciation?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
  category?: string;
  tags?: string[];
  lastReviewed?: Date;
  correctCount?: number;
  incorrectCount?: number;
}

interface FlashcardDeckProps {
  /** Type of cards to display */
  cardType: string;
  /** Custom cards data (optional) */
  cards?: FlashcardData[];
  /** Whether to show progress tracking */
  showProgress?: boolean;
  /** Whether to enable audio pronunciation */
  enableAudio?: boolean;
  /** Whether to show difficulty indicators */
  showDifficulty?: boolean;
  /** Callback when card is marked as known */
  onCardKnown?: (cardId: string) => void;
  /** Callback when card needs practice */
  onCardNeedsPractice?: (cardId: string) => void;
  /** Whether to shuffle cards */
  shuffleCards?: boolean;
}

interface StudyStats {
  totalCards: number;
  reviewedCards: number;
  knownCards: number;
  practiceCards: number;
  accuracy: number;
}

/**
 * Generates sample flashcard data based on card type
 * @param cardType - The type of cards to generate
 * @returns Array of flashcard data
 */
const generateSampleCards = (cardType: string): FlashcardData[] => {
  const baseCards = {
    'root-words': [
      {
        id: '1',
        front: 'Cardio',
        back: 'Heart',
        pronunciation: '/ˈkɑːr.di.oʊ/',
        difficulty: 'easy' as const,
        category: 'Medical Roots',
        tags: ['anatomy', 'cardiovascular'],
      },
      {
        id: '2',
        front: 'Gastro',
        back: 'Stomach',
        pronunciation: '/ˈɡæs.troʊ/',
        difficulty: 'easy' as const,
        category: 'Medical Roots',
        tags: ['anatomy', 'digestive'],
      },
      {
        id: '3',
        front: 'Neuro',
        back: 'Nerve/Brain',
        pronunciation: '/ˈnʊr.oʊ/',
        difficulty: 'medium' as const,
        category: 'Medical Roots',
        tags: ['anatomy', 'neurological'],
      },
    ],
    'term-translation': [
      {
        id: '1',
        front: 'Diagnosis',
        back: 'Diagnóstico',
        pronunciation: '/di.aɡˈnos.ti.ko/',
        difficulty: 'medium' as const,
        category: 'Medical Terms',
        tags: ['medical', 'spanish'],
      },
      {
        id: '2',
        front: 'Treatment',
        back: 'Tratamiento',
        pronunciation: '/tɾa.taˈmjen.to/',
        difficulty: 'medium' as const,
        category: 'Medical Terms',
        tags: ['medical', 'spanish'],
      },
      {
        id: '3',
        front: 'Prescription',
        back: 'Receta médica',
        pronunciation: '/re.ˈse.ta ˈme.ði.ka/',
        difficulty: 'hard' as const,
        category: 'Medical Terms',
        tags: ['medical', 'spanish', 'pharmacy'],
      },
    ],
    'term-definition': [
      {
        id: '1',
        front: 'Hypertension',
        back: 'High blood pressure, a condition where blood pressure in the arteries is persistently elevated',
        pronunciation: '/ˌhaɪ.pɚˈten.ʃən/',
        difficulty: 'hard' as const,
        category: 'Medical Definitions',
        tags: ['cardiovascular', 'conditions'],
      },
      {
        id: '2',
        front: 'Anesthesia',
        back: 'Loss of sensation or awareness, typically induced by drugs before surgery',
        pronunciation: '/ˌæn.əsˈθi.ʒə/',
        difficulty: 'medium' as const,
        category: 'Medical Definitions',
        tags: ['surgery', 'procedures'],
      },
    ],
    'custom': [
      {
        id: '1',
        front: 'Custom Term 1',
        back: 'Custom Definition 1',
        difficulty: 'easy' as const,
        category: 'Custom',
      },
    ],
  };

  return baseCards[cardType as keyof typeof baseCards] || baseCards['term-translation'];
};

/**
 * Progress Bar Component
 * Shows current progress through the deck
 */
interface ProgressBarProps {
  current: number;
  total: number;
  reviewedCards: number;
}

const ProgressBar = ({ current, total, reviewedCards }: ProgressBarProps) => (
  <div className="mb-8 text-center space-y-3">
    <div className="flex items-center justify-between text-sm text-muted-foreground">
      <span>Card {current + 1} of {total}</span>
      <span>{reviewedCards} reviewed</span>
    </div>
    <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
      <div className="flex h-full">
        <div
          className="bg-primary rounded-full transition-all duration-300"
          style={{ width: `${((current + 1) / total) * 100}%` }}
        />
        <div
          className="bg-accent/50 transition-all duration-300"
          style={{ width: `${(reviewedCards / total) * 100}%` }}
        />
      </div>
    </div>
  </div>
);

/**
 * Card Stats Component
 * Shows difficulty and category information
 */
interface CardStatsProps {
  card: FlashcardData;
  showDifficulty: boolean;
}

const CardStats = ({ card, showDifficulty }: CardStatsProps) => (
  <div className="flex items-center gap-2 mb-4">
    {showDifficulty && card.difficulty && (
      <Badge
        variant={card.difficulty === 'easy' ? 'default' : card.difficulty === 'medium' ? 'secondary' : 'destructive'}
        className="text-xs"
      >
        {card.difficulty}
      </Badge>
    )}
    {card.category && (
      <Badge variant="outline" className="text-xs">
        {card.category}
      </Badge>
    )}
    {card.tags && card.tags.slice(0, 2).map(tag => (
      <Badge key={tag} variant="outline" className="text-xs opacity-70">
        {tag}
      </Badge>
    ))}
  </div>
);

/**
 * Audio Pronunciation Component
 * Handles text-to-speech functionality
 */
interface AudioPronunciationProps {
  text: string;
  pronunciation?: string;
  enabled: boolean;
}

const AudioPronunciation = ({ text, pronunciation, enabled }: AudioPronunciationProps) => {
  const playPronunciation = useCallback(() => {
    if (!enabled || !('speechSynthesis' in window)) return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 0.8;
    speechSynthesis.speak(utterance);
  }, [text, enabled]);

  if (!enabled) return null;

  return (
    <div className="flex items-center gap-2 mt-4">
      {pronunciation && (
        <span className="text-lg font-mono text-muted-foreground">
          {pronunciation}
        </span>
      )}
      <Button
        variant="ghost"
        size="sm"
        onClick={playPronunciation}
        className="hover:bg-primary/10"
      >
        <Volume2 className="w-4 h-4" />
      </Button>
    </div>
  );
};

/**
 * Study Action Buttons Component
 * Handles marking cards as known or needing practice
 */
interface StudyActionsProps {
  onKnown: () => void;
  onNeedsPractice: () => void;
  disabled?: boolean;
}

const StudyActions = ({ onKnown, onNeedsPractice, disabled }: StudyActionsProps) => (
  <div className="flex justify-center gap-4 mt-6">
    <Button
      variant="default"
      className="hover-lift bg-green-600 hover:bg-green-700"
      onClick={onKnown}
      disabled={disabled}
    >
      <CheckCircle className="w-4 h-4 mr-2" />
      Know It
    </Button>
    <Button
      variant="destructive"
      className="hover-lift"
      onClick={onNeedsPractice}
      disabled={disabled}
    >
      <XCircle className="w-4 h-4 mr-2" />
      Need Practice
    </Button>
  </div>
);

/**
 * Custom hook for managing flashcard state
 * Handles navigation, flipping, and study tracking
 */
const useFlashcardDeck = (cards: FlashcardData[], shuffleCards: boolean = false) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [direction, setDirection] = useState<'next' | 'prev' | null>(null);
  const [reviewedCards, setReviewedCards] = useState(new Set<string>());
  const [knownCards, setKnownCards] = useState(new Set<string>());
  const [practiceCards, setPracticeCards] = useState(new Set<string>());

  // Shuffle cards if requested
  const processedCards = useMemo(() => {
    if (!shuffleCards) return cards;
    return [...cards].sort(() => Math.random() - 0.5);
  }, [cards, shuffleCards]);

  const currentCard = processedCards[currentIndex];

  const navigateCard = useCallback((newIndex: number, animationDirection: 'next' | 'prev') => {
    if (newIndex < 0 || newIndex >= processedCards.length) return;

    setDirection(animationDirection);
    setIsFlipped(false);

    setTimeout(() => {
      setCurrentIndex(newIndex);
      setDirection(null);
    }, ANIMATION_DURATION);
  }, [processedCards.length]);

  const handleNext = useCallback(() => {
    navigateCard(currentIndex + 1, 'next');
  }, [currentIndex, navigateCard]);

  const handlePrev = useCallback(() => {
    navigateCard(currentIndex - 1, 'prev');
  }, [currentIndex, navigateCard]);

  const handleFlip = useCallback(() => {
    setIsFlipped(prev => !prev);
    if (!isFlipped && currentCard) {
      setReviewedCards(prev => new Set([...prev, currentCard.id]));
    }
  }, [isFlipped, currentCard]);

  const markAsKnown = useCallback(() => {
    if (!currentCard) return;
    setKnownCards(prev => new Set([...prev, currentCard.id]));
    setPracticeCards(prev => {
      const newSet = new Set(prev);
      newSet.delete(currentCard.id);
      return newSet;
    });
    handleNext();
  }, [currentCard, handleNext]);

  const markAsNeedsPractice = useCallback(() => {
    if (!currentCard) return;
    setPracticeCards(prev => new Set([...prev, currentCard.id]));
    setKnownCards(prev => {
      const newSet = new Set(prev);
      newSet.delete(currentCard.id);
      return newSet;
    });
    handleNext();
  }, [currentCard, handleNext]);

  const stats: StudyStats = useMemo(() => ({
    totalCards: processedCards.length,
    reviewedCards: reviewedCards.size,
    knownCards: knownCards.size,
    practiceCards: practiceCards.size,
    accuracy: reviewedCards.size > 0 ? (knownCards.size / reviewedCards.size) * 100 : 0,
  }), [processedCards.length, reviewedCards.size, knownCards.size, practiceCards.size]);

  return {
    currentIndex,
    currentCard,
    isFlipped,
    direction,
    processedCards,
    stats,
    handleNext,
    handlePrev,
    handleFlip,
    markAsKnown,
    markAsNeedsPractice,
    canGoNext: currentIndex < processedCards.length - 1,
    canGoPrev: currentIndex > 0,
  };
};

/**
 * Flashcard Deck Component
 *
 * A comprehensive flashcard study system that provides:
 * - Interactive 3D card flipping animations
 * - Progress tracking and study statistics
 * - Audio pronunciation support
 * - Difficulty and category indicators
 * - Study action buttons for spaced repetition
 * - Customizable card types and data
 *
 * Features:
 * - Smooth 3D animations with depth effects
 * - Keyboard navigation support
 * - Audio pronunciation with speech synthesis
 * - Progress tracking with visual indicators
 * - Study statistics and accuracy tracking
 * - Responsive design for all screen sizes
 * - Customizable card types and content
 *
 * @param cardType - Type of cards to display
 * @param cards - Custom cards data (optional)
 * @param showProgress - Whether to show progress tracking (default: true)
 * @param enableAudio - Whether to enable audio pronunciation (default: true)
 * @param showDifficulty - Whether to show difficulty indicators (default: true)
 * @param onCardKnown - Callback when card is marked as known
 * @param onCardNeedsPractice - Callback when card needs practice
 * @param shuffleCards - Whether to shuffle cards (default: false)
 */
export const FlashcardDeck = ({
  cardType,
  cards,
  showProgress = true,
  enableAudio = true,
  showDifficulty = true,
  onCardKnown,
  onCardNeedsPractice,
  shuffleCards = false,
}: FlashcardDeckProps) => {
  const deckCards = cards || generateSampleCards(cardType);

  const {
    currentIndex,
    currentCard,
    isFlipped,
    direction,
    processedCards,
    stats,
    handleNext,
    handlePrev,
    handleFlip,
    markAsKnown,
    markAsNeedsPractice,
    canGoNext,
    canGoPrev,
  } = useFlashcardDeck(deckCards, shuffleCards);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowLeft':
          event.preventDefault();
          handlePrev();
          break;
        case 'ArrowRight':
          event.preventDefault();
          handleNext();
          break;
        case ' ':
          event.preventDefault();
          handleFlip();
          break;
        case '1':
          event.preventDefault();
          markAsKnown();
          break;
        case '2':
          event.preventDefault();
          markAsNeedsPractice();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleNext, handlePrev, handleFlip, markAsKnown, markAsNeedsPractice]);

  const handleCardKnown = useCallback(() => {
    markAsKnown();
    onCardKnown?.(currentCard.id);
  }, [markAsKnown, onCardKnown, currentCard]);

  const handleCardNeedsPractice = useCallback(() => {
    markAsNeedsPractice();
    onCardNeedsPractice?.(currentCard.id);
  }, [markAsNeedsPractice, onCardNeedsPractice, currentCard]);

  if (!currentCard) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No cards available for this type.</p>
      </div>
    );
  }

  return (
    <div className="relative w-full max-w-4xl mx-auto space-y-6">
      {/* Study Statistics */}
      {showProgress && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-muted/30 rounded-lg">
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground">{stats.totalCards}</div>
            <div className="text-xs text-muted-foreground">Total Cards</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{stats.reviewedCards}</div>
            <div className="text-xs text-muted-foreground">Reviewed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{stats.knownCards}</div>
            <div className="text-xs text-muted-foreground">Known</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-accent">
              {stats.accuracy.toFixed(0)}%
            </div>
            <div className="text-xs text-muted-foreground">Accuracy</div>
          </div>
        </div>
      )}

      {/* Progress indicator */}
      {showProgress && (
        <ProgressBar
          current={currentIndex}
          total={processedCards.length}
          reviewedCards={stats.reviewedCards}
        />
      )}

      {/* Card Stats */}
      <div className="text-center">
        <CardStats card={currentCard} showDifficulty={showDifficulty} />
      </div>

      {/* Flashcard Stack */}
      <div className="flashcard-container">
        {/* Background cards for depth effect */}
        {currentIndex + 1 < processedCards.length && (
          <div className="flashcard-stack flashcard-stack-2" />
        )}
        {currentIndex + 2 < processedCards.length && (
          <div className="flashcard-stack flashcard-stack-3" />
        )}

        {/* Main Card */}
        <div
          className={`flashcard-3d ${isFlipped ? 'flipped' : ''} ${
            direction === 'next' ? 'slide-out-left' : ''
          } ${direction === 'prev' ? 'slide-out-right' : ''}`}
          onClick={handleFlip}
          role="button"
          tabIndex={0}
          aria-label={`Flashcard ${currentIndex + 1} of ${processedCards.length}. ${
            isFlipped ? 'Showing back' : 'Showing front'
          }`}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleFlip();
            }
          }}
        >
          <Card className="flashcard-face flashcard-front">
            <div className="flex flex-col items-center justify-center h-full p-8 md:p-12">
              <div className="text-center space-y-4">
                <h2 className="text-3xl md:text-5xl font-bold text-foreground break-words">
                  {currentCard.front}
                </h2>
                <p className="text-sm text-muted-foreground">
                  Click to reveal {cardType.includes('translation') ? 'translation' : 'definition'}
                </p>
                <AudioPronunciation
                  text={currentCard.front}
                  pronunciation={currentCard.pronunciation}
                  enabled={enableAudio}
                />
              </div>
            </div>
          </Card>

          <Card className="flashcard-face flashcard-back">
            <div className="flex flex-col items-center justify-center h-full p-8 md:p-12">
              <div className="text-center space-y-4">
                <h2 className="text-2xl md:text-4xl font-bold text-primary break-words">
                  {currentCard.back}
                </h2>
                <AudioPronunciation
                  text={currentCard.back}
                  pronunciation={currentCard.pronunciation}
                  enabled={enableAudio}
                />
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-center gap-4 mt-8">
        <Button
          variant="outline"
          size="lg"
          onClick={handlePrev}
          disabled={!canGoPrev}
          className="hover-lift"
          aria-label="Previous card"
        >
          <ChevronLeft className="w-5 h-5" />
          <span className="hidden sm:inline">Previous</span>
        </Button>

        <Button
          variant="outline"
          size="lg"
          onClick={handleFlip}
          className="hover-lift"
          aria-label={isFlipped ? 'Show front of card' : 'Show back of card'}
        >
          <RotateCw className="w-5 h-5 mr-2" />
          Flip Card
        </Button>

        <Button
          variant="outline"
          size="lg"
          onClick={handleNext}
          disabled={!canGoNext}
          className="hover-lift"
          aria-label="Next card"
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight className="w-5 h-5" />
        </Button>
      </div>

      {/* Study Action Buttons */}
      <StudyActions
        onKnown={handleCardKnown}
        onNeedsPractice={handleCardNeedsPractice}
        disabled={!isFlipped}
      />

      {/* Keyboard Shortcuts Help */}
      <div className="text-center text-xs text-muted-foreground mt-4 space-y-1">
        <p>Keyboard shortcuts: ← → (navigate) • Space (flip) • 1 (know it) • 2 (need practice)</p>
      </div>

      {/* Completion Message */}
      {currentIndex === processedCards.length - 1 && stats.reviewedCards === processedCards.length && (
        <div className="text-center p-6 bg-primary/10 rounded-lg border border-primary/20">
          <BarChart3 className="w-12 h-12 mx-auto mb-4 text-primary" />
          <h3 className="text-lg font-semibold mb-2">Deck Complete!</h3>
          <p className="text-sm text-muted-foreground mb-4">
            You've reviewed all {processedCards.length} cards with {stats.accuracy.toFixed(0)}% accuracy.
          </p>
          <div className="flex justify-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.location.reload()}
            >
              <Shuffle className="w-4 h-4 mr-2" />
              Study Again
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
