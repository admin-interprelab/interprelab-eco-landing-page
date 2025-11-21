/**
 * Solution Hero Headline Component
 */

import type { SolutionHeroHeadlineProps } from './types';

/**
 * Solution Hero Headline Component
 *
 * Displays the main headline with primary/secondary text and descriptions
 */
export const SolutionHeroHeadline = ({
  primary,
  secondary,
  description,
  subDescription,
  className = '',
}: SolutionHeroHeadlineProps) => {
  return (
    <div className={`text-center mb-16 space-y-6 animate-fade-in ${className}`}>
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight">
        <span className="bg-gradient-primary bg-clip-text text-transparent">
          {primary}
        </span>
        <br />
        <span className="text-foreground">{secondary}</span>
      </h1>

      <p className="text-xl md:text-2xl text-muted-foreground/90 max-w-4xl mx-auto font-sans leading-relaxed">
        {description}
      </p>

      {subDescription && (
        <p className="text-lg md:text-xl text-muted-foreground/80 max-w-3xl mx-auto font-sans leading-relaxed">
          {subDescription}
        </p>
      )}
    </div>
  );
};
