import React, { useEffect, useRef } from 'react';
import { useTherapeuticAria } from './TherapeuticAriaProvider';

interface SemanticSectionProps {
  children: React.ReactNode;
  sectionType: 'validation' | 'hope-building' | 'solution-exploration' | 'empowerment' | 'crisis-support';
  title: string;
  description?: string;
  priority?: 'low' | 'medium' | 'high';
  announceOnEnter?: boolean;
  className?: string;
}

export const SemanticSection: React.FC<SemanticSectionProps> = ({
  children,
  sectionType,
  title,
  description,
  priority = 'medium',
  announceOnEnter = true,
  className = ''
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const { announce, setUserStage } = useTherapeuticAria();
  const hasAnnouncedRef = useRef(false);

  // Map section types to semantic roles and ARIA attributes
  const getSectionAttributes = () => {
    const baseAttributes = {
      'aria-labelledby': `${sectionType}-heading`,
      'aria-describedby': description ? `${sectionType}-description` : undefined,
    };

    switch (sectionType) {
      case 'crisis-support':
        return {
          ...baseAttributes,
          role: 'alert',
          'aria-live': 'assertive',
          'aria-atomic': 'true',
          'aria-label': 'Crisis support and immediate help resources'
        };
      case 'validation':
        return {
          ...baseAttributes,
          role: 'region',
          'aria-label': 'Validation and understanding of interpreter challenges'
        };
      case 'hope-building':
        return {
          ...baseAttributes,
          role: 'region',
          'aria-label': 'Hope and inspiration for professional growth'
        };
      case 'solution-exploration':
        return {
          ...baseAttributes,
          role: 'main',
          'aria-label': 'AI solutions and tools for interpreters'
        };
      case 'empowerment':
        return {
          ...baseAttributes,
          role: 'region',
          'aria-label': 'Professional empowerment and action steps'
        };
      default:
        return baseAttributes;
    }
  };

  // Announce section entry for screen readers
  useEffect(() => {
    if (!announceOnEnter || hasAnnouncedRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnnouncedRef.current) {
            hasAnnouncedRef.current = true;

            // Update user stage based on section type
            if (sectionType !== 'crisis-support') {
              setUserStage(sectionType as any);
            }

            // Announce section entry
            const announcementMessages = {
              'validation': `Entering ${title}. This section validates your experiences as an interpreter.`,
              'hope-building': `Entering ${title}. Discover hope and possibilities for your career.`,
              'solution-exploration': `Entering ${title}. Explore AI tools designed to help interpreters.`,
              'empowerment': `Entering ${title}. Take action toward professional empowerment.`,
              'crisis-support': `Crisis support section available. Immediate help resources are accessible.`
            };

            const message = announcementMessages[sectionType] || `Entering ${title}`;
            announce(message, priority);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [sectionType, title, priority, announceOnEnter, announce, setUserStage]);

  const sectionAttributes = getSectionAttributes();

  return (
    <section
      ref={sectionRef}
      className={`therapeutic-section therapeutic-section--${sectionType} ${className}`}
      data-section-type={sectionType}
      data-priority={priority}
      {...sectionAttributes}
    >
      <h2
        id={`${sectionType}-heading`}
        className="sr-only"
      >
        {title}
      </h2>

      {description && (
        <p
          id={`${sectionType}-description`}
          className="sr-only"
        >
          {description}
        </p>
      )}

      {children}
    </section>
  );
};
