/**
 * Contact Hero Component
 */

import React from 'react';
import { Badge } from '@/components/ui/badge';
import type { ContactHeroProps } from './types';

/**
 * ContactHero Component
 *
 * Hero section for the contact page with:
 * - Customizable title and description
 * - Badge display
 * - Gradient background
 * - Responsive design
 */
export const ContactHero = React.memo<ContactHeroProps>(({
  title = "Get in Touch",
  description = "Have questions about our services? Want to discuss a partnership? We'd love to hear from you and explore how we can help.",
  badge = "Contact Us",
  className = "",
}) => {
  return (
    <section className={`py-20 bg-gradient-subtle ${className}`}>
      <div className="container mx-auto px-6 text-center">
        <Badge className="mb-6 bg-primary/10 text-primary border-primary/20">
          {badge}
        </Badge>
        <h1 className="text-4xl md:text-6xl font-bold mb-6 gradient-text">
          {title}
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
          {description}
        </p>
      </div>
    </section>
  );
});
