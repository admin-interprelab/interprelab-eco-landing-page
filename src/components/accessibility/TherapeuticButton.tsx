import React, { forwardRef } from 'react';
import { Button, ButtonProps } from '@/components/ui/button';
import { useTherapeuticAria } from './TherapeuticAriaProvider';

interface TherapeuticButtonProps extends ButtonProps {
  therapeuticContext?: 'validation' | 'hope-building' | 'solution-exploration' | 'empowerment' | 'crisis-support';
  encouragementMessage?: string;
  validationMessage?: string;
  ariaDescription?: string;
  onTherapeuticClick?: () => void;
}

export const TherapeuticButton = forwardRef<HTMLButtonElement, TherapeuticButtonProps>(
  ({
    children,
    therapeuticContext,
    encouragementMessage,
    validationMessage,
    ariaDescription,
    onTherapeuticClick,
    onClick,
    className = '',
    ...props
  }, ref) => {
    const { announceEncouragement, announceValidation, announce } = useTherapeuticAria();

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      // Call original onClick handler
      onClick?.(event);

      // Call therapeutic click handler
      onTherapeuticClick?.();

      // Provide therapeutic feedback based on context
      if (therapeuticContext === 'crisis-support') {
        announce('Accessing crisis support resources. Help is available.', 'high');
      } else if (encouragementMessage) {
        announceEncouragement('button-interaction');
        setTimeout(() => announce(encouragementMessage, 'low'), 500);
      } else if (validationMessage) {
        announceValidation('button-interaction');
        setTimeout(() => announce(validationMessage, 'medium'), 500);
      }
    };

    // Enhanced ARIA attributes based on therapeutic context
    const getTherapeuticAriaAttributes = () => {
      const baseAttributes = {
        'aria-describedby': ariaDescription ? `${therapeuticContext}-description` : undefined,
      };

      switch (therapeuticContext) {
        case 'crisis-support':
          return {
            ...baseAttributes,
            'aria-label': `${children} - Crisis support button. Provides immediate access to help resources.`,
            'aria-keyshortcuts': 'Control+Shift+H',
            role: 'button',
            'aria-live': 'polite'
          };
        case 'validation':
          return {
            ...baseAttributes,
            'aria-label': `${children} - This action validates your interpreter experience and provides understanding.`,
            'aria-describedby': 'validation-context'
          };
        case 'hope-building':
          return {
            ...baseAttributes,
            'aria-label': `${children} - Discover hope and possibilities for your interpreting career.`,
            'aria-describedby': 'hope-context'
          };
        case 'solution-exploration':
          return {
            ...baseAttributes,
            'aria-label': `${children} - Explore AI solutions designed to help interpreters succeed.`,
            'aria-describedby': 'solution-context'
          };
        case 'empowerment':
          return {
            ...baseAttributes,
            'aria-label': `${children} - Take empowering action for your professional development.`,
            'aria-describedby': 'empowerment-context'
          };
        default:
          return baseAttributes;
      }
    };

    const therapeuticAriaAttributes = getTherapeuticAriaAttributes();

    return (
      <>
        <Button
          ref={ref}
          onClick={handleClick}
          className={`therapeutic-button therapeutic-button--${therapeuticContext} ${className}`}
          data-therapeutic-context={therapeuticContext}
          {...therapeuticAriaAttributes}
          {...props}
        >
          {children}
        </Button>

        {/* Hidden descriptions for screen readers */}
        {ariaDescription && (
          <span id={`${therapeuticContext}-description`} className="sr-only">
            {ariaDescription}
          </span>
        )}

        {/* Context descriptions */}
        <span id="validation-context" className="sr-only">
          This section validates your experiences and challenges as an interpreter.
        </span>
        <span id="hope-context" className="sr-only">
          This section provides hope and inspiration for your professional journey.
        </span>
        <span id="solution-context" className="sr-only">
          This section offers AI-powered solutions to common interpreter challenges.
        </span>
        <span id="empowerment-context" className="sr-only">
          This section empowers you to take action and invest in your professional growth.
        </span>
      </>
    );
  }
);
