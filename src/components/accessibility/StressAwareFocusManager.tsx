import React, { useEffect, useRef } from 'react';
import { useStressAwareKeyboard } from '@/hooks/useStressAwareKeyboard';

interface StressAwareFocusManagerProps {
  children: React.ReactNode;
  onCrisisSupport?: () => void;
  onPeerSupport?: () => void;
  onCalmingContent?: () => void;
  className?: string;
}

export const StressAwareFocusManager: React.FC<StressAwareFocusManagerProps> = ({
  children,
  onCrisisSupport,
  onPeerSupport,
  onCalmingContent,
  className = ''
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { stressLevel, isTabbing } = useStressAwareKeyboard({
    enableCrisisShortcuts: true,
    calmFocusIndicators: true,
    predictableTabOrder: true,
    onCrisisSupport,
    onPeerSupport,
    onCalmingContent
  });

  // Apply stress-aware styling based on current stress level
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Remove existing stress level classes
    container.classList.remove('stress-low', 'stress-moderate', 'stress-high', 'stress-crisis');

    // Add current stress level class
    container.classList.add(`stress-${stressLevel}`);

    // Add tabbing indicator
    if (isTabbing) {
      container.classList.add('keyboard-navigation-active');
    } else {
      container.classList.remove('keyboard-navigation-active');
    }
  }, [stressLevel, isTabbing]);

  return (
    <div
      ref={containerRef}
      className={`stress-aware-focus-container ${className}`}
      data-stress-level={stressLevel}
      data-keyboard-active={isTabbing}
    >
      {children}

      {/* Crisis support overlay for high stress situations */}
      {stressLevel === 'crisis' && (
        <div className="fixed top-4 right-4 z-50 bg-red-500/90 text-white p-4 rounded-lg shadow-lg backdrop-blur-sm">
          <p className="text-sm font-medium mb-2">Need immediate support?</p>
          <div className="flex gap-2">
            <button
              onClick={onCrisisSupport}
              className="px-3 py-1 bg-white/20 rounded text-xs hover:bg-white/30 transition-colors"
            >
              Crisis Help (Ctrl+Shift+H)
            </button>
            <button
              onClick={onPeerSupport}
              className="px-3 py-1 bg-white/20 rounded text-xs hover:bg-white/30 transition-colors"
            >
              Peer Support (Ctrl+Shift+P)
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
