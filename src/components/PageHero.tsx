import React from 'react';
import { Badge } from '@/components/ui/badge';

interface PageHeroProps {
  badgeText: string;
  title: string;
  subtitle: string;
  badgeIcon?: React.ReactNode;
}

export const PageHero: React.FC<PageHeroProps> = ({ badgeText, title, subtitle, badgeIcon }) => {
  return (
    <section className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-6 text-center">
        <Badge className="mb-6 bg-primary/10 text-primary border-primary/20">
          {badgeIcon}
          {badgeText}
        </Badge>
        <h1 className="text-4xl md:text-6xl font-bold mb-6 gradient-text">
          {title}
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
          {subtitle}
        </p>
      </div>
    </section>
  );
};

export default PageHero;
