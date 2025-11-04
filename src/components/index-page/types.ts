/**
 * Index Page Component Types
 */

export interface IndexPageProps {
  className?: string;
  customContent?: {
    showHero?: boolean;
    showVideoSection?: boolean;
    showProductShowcase?: boolean;
    showStats?: boolean;
    showTestimonials?: boolean;
  };
}

export interface MainContentProps {
  showHero?: boolean;
  showVideoSection?: boolean;
  showProductShowcase?: boolean;
  showStats?: boolean;
  showTestimonials?: boolean;
  className?: string;
}
