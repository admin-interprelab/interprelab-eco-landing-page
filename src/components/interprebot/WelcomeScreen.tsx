/**
 * Welcome Screen Component
 * Initial screen with competency overview and start button
 */

import { Button } from '@/components/ui/button';
import { Brain, Sparkles } from 'lucide-react';
import { CompetencyCard } from './CompetencyCard';
import type { WelcomeScreenProps } from './types';

/**
 * Welcome Screen Component
 *
 * Displays the welcome interface with:
 * - Animated logo and welcome message
 * - Competency areas grid
 * - Start assessment button
 * - Minimize option
 */
export const WelcomeScreen = ({
  onStartAssessment,
  onMinimize,
  competencies,
}: WelcomeScreenProps) => {
  return (
    <div className="space-y-4">
      {/* Welcome Header */}
      <div className="text-center space-y-3">
        <div className="relative mx-auto w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
          <Brain className="w-8 h-8 text-white animate-pulse" />
          <Sparkles className="w-4 h-4 text-yellow-300 absolute -top-1 -right-1 animate-pulse" />
        </div>

        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">
            🧠✨ Welcome to InterpreLab! I'm your Advanced AI Training & Comprehensive Linguistic Assessment Agent.
          </p>
          <p className="text-sm font-medium">
            Ready for realistic scenario simulation and deep performance analysis across 6 core competencies?
          </p>
        </div>
      </div>

      {/* Competency Areas Grid */}
      <div className="grid grid-cols-2 gap-2">
        {competencies.map((competency, index) => (
          <CompetencyCard
            key={competency.id}
            competency={competency}
            index={index}
          />
        ))}
      </div>

      {/* Action Buttons */}
      <div className="space-y-2">
        <Button
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:scale-105 transition-transform"
          onClick={onStartAssessment}
        >
          🚀 Start Advanced Assessment
        </Button>
        <Button
          variant="outline"
          className="w-full"
          onClick={onMinimize}
        >
          Minimize to Dock
        </Button>
      </div>
    </div>
  );
};
