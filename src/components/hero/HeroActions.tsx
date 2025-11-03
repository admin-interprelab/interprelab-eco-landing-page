/**
 * Hero Actions Component
 * Call-to-action buttons for hero section
 */

import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import type { HeroAction } from './types';
import { getActionTarget, getActionRel, isExternalAction } from './utils';
import { useHeroActions } from './hooks';

interface HeroActionsProps {
  actions: HeroAction[];
  className?: string;
  layout?: 'horizontal' | 'vertical' | 'responsive';
}

/**
 * Hero Actions Component
 *
 * Displays hero action buttons with:
 * - Multiple button variants
 * - Icon support (left or right)
 * - Hover effects and animations
 * - External link handling
 * - Keyboard navigation
 * - Responsive layout
 */
export const HeroActions = ({
  actions,
  className = '',
  layout = 'responsive'
}: HeroActionsProps) => {
  const { hoveredAction, handleActionHover, handleActionClick, handleKeyDown } = useHeroActions();

  const getLayoutClasses = () => {
    switch (layout) {
      case 'horizontal':
        return 'flex gap-4 justify-center items-center';
      case 'vertical':
        return 'flex flex-col gap-4 items-center';
      case 'responsive':
      default:
        return 'flex flex-col sm:flex-row gap-4 justify-center items-center';
    }
  };

  return (
    <div className={`${getLayoutClasses()} animate-slide-up ${className}`}>
      {actions.map((action) => {
        const isHovered = hoveredAction === action.id;
        const isExternal = isExternalAction(action);

        const buttonContent = (
          <>
            {action.icon && action.iconPosition === 'left' && (
              <action.icon className="w-5 h-5 mr-2" />
            )}
            {action.label}
            {action.icon && action.iconPosition === 'right' && (
              <action.icon className={`w-5 h-5 ml-2 transition-transform duration-200 ${
                isHovered ? 'translate-x-1' : ''
              }`} />
            )}
          </>
        );

        const buttonProps = {
          variant: action.variant,
          size: action.size || 'xl',
          className: `group transition-all duration-300 ${
            isHovered ? 'scale-105' : ''
          }`,
          onMouseEnter: () => handleActionHover(action.id),
          onMouseLeave: () => handleActionHover(null),
          onClick: () => handleActionClick(action.id),
          onKeyDown: (e: React.KeyboardEvent) => handleKeyDown(e, action.id),
        };

        if (isExternal) {
          return (
            <Button
              key={action.id}
              {...buttonProps}
              asChild
            >
              <a
                href={action.href}
                target={getActionTarget(action)}
                rel={getActionRel(action)}
                aria-label={`${action.label} (opens in new tab)`}
              >
                {buttonContent}
              </a>
            </Button>
          );
        }

        return (
          <Button
            key={action.id}
            {...buttonProps}
            asChild
          >
            <Link to={action.href}>
              {buttonContent}
            </Link>
          </Button>
        );
      })}
    </div>
  );
};
