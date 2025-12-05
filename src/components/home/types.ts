/**
 * Home Page Component Types
 */

export interface PainPoint {
  videoSrc: string;
  title: string;
  description: string;
}

export interface HomePageProps {
  className?: string;
  customContent?: {
    painPoints?: PainPoint[];
    showStats?: boolean;
    showTestimonials?: boolean;
    showSolutionHero?: boolean;
  };
}

export interface VideoHeroSectionProps {
  painPoints: PainPoint[];
  className?: string;
}

export interface MainContentProps {
  showSolutionHero?: boolean;
  showStats?: boolean;
  showTestimonials?: boolean;
  className?: string;
}
