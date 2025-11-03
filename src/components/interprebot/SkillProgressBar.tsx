/**
 * Skill Progress Bar Component
 * Individual skill assessment display with animated progress
 */

import { Badge } from '@/components/ui/badge';
import type { SkillProgressBarProps } from './types';
import { getPerformanceColor, getSkillAnimationDelay } from './utils';

/**
 * Skill Progress Bar Component
 *
 * Displays individual skill with:
 * - Animated progress bar
 * - Score badge with color coding
 * - Skill icon and name
 * - Performance level indication
 * - Click interaction for details
 */
export const SkillProgressBar = ({
  skill,
  index,
  isAnimating,
  showDetails = true,
  onClick,
}: SkillProgressBarProps) => {
  const performanceColor = getPerformanceColor(skill.score);
  const animationDelay = getSkillAnimationDelay(index);

  return (
    <div
      className={`space-y-1 ${onClick ? 'cursor-pointer hover:bg-muted/20 p-2 rounded transition-colors' : ''}`}
      onClick={() => onClick?.(skill)}
      style={{ animationDelay }}
    >
      {/* Skill Header */}
      <div className="flex justify-between items-center text-xs">
        <span className="flex items-center gap-1">
          <span role="img" aria-label={skill.skill}>
            {skill.icon}
          </span>
          <span className="font-medium">{skill.skill}</span>
        </span>

        <Badge
          variant="outline"
          className={`text-xs ${performanceColor}`}
        >
          {skill.score}%
        </Badge>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-muted/30 rounded-full h-1">
        <div
          className={`
            bg-gradient-to-r from-purple-500 to-pink-500 h-1 rounded-full
            transition-all duration-1000 ease-out
            ${isAnimating ? 'animate-pulse' : ''}
          `}
          style={{
            width: `${skill.score}%`,
            transitionDelay: animationDelay,
          }}
        />
      </div>

      {/* Skill Details */}
      {showDetails && skill.description && (
        <div className="text-xs text-muted-foreground">
          {skill.description}
        </div>
      )}

      {/* Improvement Suggestion */}
      {showDetails && skill.improvement && skill.score < 90 && (
        <div className="text-xs text-warning bg-warning/10 p-2 rounded mt-1">
          💡 {skill.improvement}
        </div>
      )}
    </div>
  );
};
