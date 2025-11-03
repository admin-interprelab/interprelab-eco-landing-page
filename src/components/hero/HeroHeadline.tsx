/**
 * Hero Headline Component
 * Main hero headline with gradient text effect
 */

interface HeroHeadlineProps {
  primary: string;
  secondary: string;
  className?: string;
  size?: 'default' | 'large' | 'small';
}

/**
 * Hero Headline Component
 *
 * Displays the main hero headline with:
 * - Gradient text effect on primary text
 * - Responsive typography
 * - Proper line breaks
 * - Accessibility support
 */
export const HeroHeadline = ({
  primary,
  secondary,
  className = '',
  size = 'default'
}: HeroHeadlineProps) => {
  const getSizeClasses = () => {
    switch (size) {
      case 'small':
        return 'text-4xl md:text-5xl lg:text-6xl';
      case 'large':
        return 'text-7xl md:text-8xl lg:text-9xl';
      case 'default':
      default:
        return 'text-6xl md:text-7xl lg:text-8xl';
    }
  };

  return (
    <h1 className={`${getSizeClasses()} font-bold tracking-tight leading-tight ${className}`}>
      <span className="bg-gradient-primary bg-clip-text text-transparent">
        {primary}
      </span>
      <br />
      <span className="text-foreground">
        {secondary}
      </span>
    </h1>
  );
};
