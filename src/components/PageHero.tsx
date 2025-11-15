import React from 'react';
import { Hero, HeroContent } from '@/components/hero';
import { DEFAULT_HERO_CONTENT } from '@/components/hero/constants';

interface PageHeroProps {
  badgeText: string;
  title: string;
  subtitle: string;
}

export const PageHero: React.FC<PageHeroProps> = ({ badgeText, title, subtitle }) => {
  const heroContent: HeroContent = {
    ...DEFAULT_HERO_CONTENT,
    badge: {
      ...DEFAULT_HERO_CONTENT.badge,
      text: badgeText,
    },
    headline: {
      primary: title,
      secondary: '',
    },
    subtitle: subtitle,
    actions: [], // Overriding default actions to be empty
    trustIndicators: {
        ...DEFAULT_HERO_CONTENT.trustIndicators,
        items: [], // Overriding default trust indicators to be empty
    }
  };

  return <Hero content={heroContent} showAnimations={false} />;
};
