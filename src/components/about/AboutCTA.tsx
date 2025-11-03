/**
 * About CTA Component
 */

import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { AboutCTAProps } from './types';
import { DEFAULT_CTA } from './constants';

/**
 * About CTA Component
 *
 * Call-to-action section for the About page
 */
export const AboutCTA = ({
  className = '',
  title = DEFAULT_CTA.title,
  description = DEFAULT_CTA.description,
  primaryAction = DEFAULT_CTA.primaryAction,
  secondaryAction = DEFAULT_CTA.secondaryAction,
}: AboutCTAProps) => {
  return (
    <section
      className={`py-20 ${className}`}
      data-section-id="cta"
    >
      <div className="container mx-auto px-6">
        <div className="glass rounded-2xl p-12 text-center border border-border/50">
          <h2 className="text-3xl font-bold mb-4">{title}</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            {description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to={primaryAction.href}>
              <Button size="lg" className="glass-button">
                {primaryAction.text}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            {secondaryAction && (
              <Link to={secondaryAction.href}>
                <Button variant="outline" size="lg">
                  {secondaryAction.text}
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
