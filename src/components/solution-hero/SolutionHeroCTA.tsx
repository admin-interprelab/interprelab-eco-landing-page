/**
 * Solution Hero CTA Component
 */

import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import type { SolutionHeroCTAProps } from './types';
import { DEFAULT_CTA } from './constants';

/**
 * Solution Hero CTA Component
 *
 * Call-to-action section with primary and secondary buttons
 */
export const SolutionHeroCTA = ({
  className = '',
  primaryAction = DEFAULT_CTA.primaryAction,
  secondaryAction,
}: SolutionHeroCTAProps) => {
  return (
    <div
      className={`text-center space-y-6 animate-fade-in ${className}`}
      style={{ animationDelay: '400ms' }}
    >
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        {/* Primary Action */}
        <Link to={primaryAction.link}>
          <Button
            size="lg"
            variant={primaryAction.variant}
            className="bg-gradient-primary hover:opacity-90 text-white shadow-glow group px-8 py-4 font-display"
          >
            {primaryAction.text}
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>

        {/* Secondary Action */}
        {secondaryAction && (
          <Link to={secondaryAction.link}>
            <Button
              size="lg"
              variant={secondaryAction.variant}
              className="group px-8 py-4 font-display"
            >
              {secondaryAction.text}
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};
