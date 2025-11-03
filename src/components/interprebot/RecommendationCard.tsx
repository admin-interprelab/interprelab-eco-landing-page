/**
 * Recommendation Card Component
 * AI-generated recommendations and insights display
 */

import type { RecommendationCardProps } from './types';

/**
 * Recommendation Card Component
 *
 * Displays AI recommendations with:
 * - Type-specific styling
 * - Icon support
 * - Color-coded backgrounds
 * - Responsive design
 */
export const RecommendationCard = ({
  title,
  content,
  type,
  icon: Icon,
}: RecommendationCardProps) => {
  const getTypeStyles = () => {
    switch (type) {
      case 'recommendation':
        return {
          background: 'bg-primary/10',
          border: 'border-primary/20',
          titleColor: 'text-primary',
        };
      case 'strength':
        return {
          background: 'bg-success/10',
          border: 'border-success/20',
          titleColor: 'text-success',
        };
      case 'improvement':
        return {
          background: 'bg-warning/10',
          border: 'border-warning/20',
          titleColor: 'text-warning',
        };
      case 'next-step':
        return {
          background: 'bg-secondary/10',
          border: 'border-secondary/20',
          titleColor: 'text-secondary',
        };
      default:
        return {
          background: 'bg-muted/10',
          border: 'border-muted/20',
          titleColor: 'text-foreground',
        };
    }
  };

  const styles = getTypeStyles();

  return (
    <div className={`p-3 rounded border ${styles.background} ${styles.border}`}>
      <div className={`text-xs font-medium mb-1 flex items-center gap-1 ${styles.titleColor}`}>
        {Icon && <Icon className="w-3 h-3" />}
        {title}
      </div>
      <div className="text-xs text-muted-foreground leading-relaxed">
        {content}
      </div>
    </div>
  );
};
