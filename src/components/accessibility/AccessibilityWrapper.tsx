import React from 'react';
import { AccessibilityProvider } from '@/contexts/AccessibilityContext';
import { TherapeuticAriaProvider } from './TherapeuticAriaProvider';
import { StressAwareFocusManager } from './StressAwareFocusManager';

interface AccessibilityWrapperProps {
  children: React.ReactNode;
  onCrisisSupport?: () => void;
  onPeerSupport?: () => void;
  onCalmingContent?: () => void;
}

export const AccessibilityWrapper: React.FC<AccessibilityWrapperProps> = ({
  children,
  onCrisisSupport,
  onPeerSupport,
  onCalmingContent
}) => {
  const handleCrisisSupport = () => {
    // Default crisis support action - could navigate to crisis support page
    if (onCrisisSupport) {
      onCrisisSupport();
    } else {
      // Default behavior - scroll to crisis support section or show modal
      const crisisSection = document.getElementById('crisis-support');
      if (crisisSection) {
        crisisSection.scrollIntoView({ behavior: 'smooth' });
        crisisSection.focus();
      } else {
        // Fallback - could show a crisis support modal
        alert('Crisis support resources are available. Please contact your local emergency services if you need immediate help.');
      }
    }
  };

  const handlePeerSupport = () => {
    if (onPeerSupport) {
      onPeerSupport();
    } else {
      // Default behavior - navigate to community/peer support
      const peerSection = document.getElementById('peer-support');
      if (peerSection) {
        peerSection.scrollIntoView({ behavior: 'smooth' });
        peerSection.focus();
      }
    }
  };

  const handleCalmingContent = () => {
    if (onCalmingContent) {
      onCalmingContent();
    } else {
      // Default behavior - navigate to calming content
      const calmingSection = document.getElementById('calming-content');
      if (calmingSection) {
        calmingSection.scrollIntoView({ behavior: 'smooth' });
        calmingSection.focus();
      }
    }
  };

  return (
    <AccessibilityProvider>
      <TherapeuticAriaProvider>
        <StressAwareFocusManager
          onCrisisSupport={handleCrisisSupport}
          onPeerSupport={handlePeerSupport}
          onCalmingContent={handleCalmingContent}
        >
          {/* Skip to content link for keyboard users */}
          <a
            href="#main-content"
            className="skip-to-content"
            onClick={(e) => {
              e.preventDefault();
              const mainContent = document.getElementById('main-content');
              if (mainContent) {
                mainContent.focus();
                mainContent.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            Skip to main content
          </a>

          {children}
        </StressAwareFocusManager>
      </TherapeuticAriaProvider>
    </AccessibilityProvider>
  );
};
