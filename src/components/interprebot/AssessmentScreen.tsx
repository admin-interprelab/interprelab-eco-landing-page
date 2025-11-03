/**
 * Assessment Screen Component
 * Assessment progress and results display
 */

import { BarChart3 } from 'lucide-react';
import { SkillProgressBar } from './SkillProgressBar';
import { RecommendationCard } from './RecommendationCard';
import type { AssessmentScreenProps } from './types';
import { useSkillAnimations } from './hooks';

/**
 * Assessment Screen Component
 *
 * Displays assessment interface with:
 * - Analysis progress indicator
 * - Animated skill progress bars
 * - AI recommendations
 * - Real-time feedback
 */
export const AssessmentScreen = ({
  skills,
  isAnalyzing,
  progress,
  onComplete,
}: AssessmentScreenProps) => {
  const { animatedSkills, isSkillVisible } = useSkillAnimations(skills, isAnalyzing);

  return (
    <div className="space-y-4">
      {/* Analysis Header */}
      <div className="text-center">
        <div className="relative w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-3 animate-pulse">
          <BarChart3 className="w-6 h-6 text-white" />
          {isAnalyzing && (
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-ping opacity-20" />
          )}
        </div>

        <div className="space-y-1">
          <p className="text-sm font-medium">
            {isAnalyzing ? '🔬 Deep Analysis in Progress...' : '✅ Assessment Complete'}
          </p>
          <p className="text-xs text-muted-foreground">
            {isAnalyzing
              ? 'Evaluating core competencies & generating personalized insights'
              : 'Your comprehensive skill assessment is ready'
            }
          </p>
        </div>

        {/* Progress Bar */}
        {isAnalyzing && (
          <div className="mt-3">
            <div className="w-full bg-muted/30 rounded-full h-1">
              <div
                className="bg-gradient-to-r from-purple-500 to-pink-500 h-1 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {Math.round(progress)}% Complete
            </p>
          </div>
        )}
      </div>

      {/* Skills Assessment */}
      <div className="space-y-3">
        {animatedSkills.map((skill, index) => (
          <SkillProgressBar
            key={skill.id}
            skill={skill}
            index={index}
            isAnimating={isAnalyzing}
            showDetails={!isAnalyzing}
          />
        ))}
      </div>

      {/* AI Recommendations */}
      {!isAnalyzing && (
        <div className="space-y-3">
          <RecommendationCard
            title="🤖 AI Mentor Recommendation"
            content="Focus on medical terminology precision and cultural context awareness for optimal performance."
            type="recommendation"
          />

          {/* Additional Insights */}
          <div className="grid grid-cols-1 gap-2 text-xs">
            <div className="p-2 bg-success/10 rounded border border-success/20">
              <div className="font-medium text-success mb-1">💪 Strengths</div>
              <div className="text-muted-foreground">
                Excellent fluency and natural delivery patterns
              </div>
            </div>

            <div className="p-2 bg-warning/10 rounded border border-warning/20">
              <div className="font-medium text-warning mb-1">🎯 Focus Areas</div>
              <div className="text-muted-foreground">
                Medical terminology and cultural sensitivity
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
