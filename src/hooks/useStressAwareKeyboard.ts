import { useEffect, useCallback, useRef } from 'react';

interface StressAwareKeyboardOptions {
  enableCrisisShortcuts?: boolean;
  calmFocusIndicators?: boolean;
  predictableTabOrder?: boolean;
  onCrisisSupport?: () => void;
  onPeerSupport?: () => void;
  onCalmingContent?: () => void;
}

interface KeyboardState {
  isTabbing: boolean;
  lastKeyPressed: string | null;
  focusHistory: HTMLElement[];
  stressIndicators: {
    rapidKeyPresses: number;
    backtrackingCount: number;
    escapeAttempts: number;
  };
}

export const useStressAwareKeyboard = (options: StressAwareKeyboardOptions = {}) => {
  const {
    enableCrisisShortcuts = true,
    calmFocusIndicators = true,
    predictableTabOrder = true,
    onCrisisSupport,
    onPeerSupport,
    onCalmingContent
  } = options;

  const keyboardStateRef = useRef<KeyboardState>({
    isTabbing: false,
    lastKeyPressed: null,
    focusHistory: [],
    stressIndicators: {
      rapidKeyPresses: 0,
      backtrackingCount: 0,
      escapeAttempts: 0
    }
  });

  const rapidKeyPressTimerRef = useRef<NodeJS.Timeout>();

  // Crisis support shortcuts
  const handleCrisisShortcuts = useCallback((event: KeyboardEvent) => {
    if (!enableCrisisShortcuts) return;

    // Ctrl/Cmd + Shift + H = Help/Crisis Support
    if ((event.ctrlKey || event.metaKey) && event.shiftKey && event.key === 'H') {
      event.preventDefault();
      onCrisisSupport?.();
      return;
    }

    // Ctrl/Cmd + Shift + P = Peer Support
    if ((event.ctrlKey || event.metaKey) && event.shiftKey && event.key === 'P') {
      event.preventDefault();
      onPeerSupport?.();
      return;
    }

    // Ctrl/Cmd + Shift + C = Calming Content
    if ((event.ctrlKey || event.metaKey) && event.shiftKey && event.key === 'C') {
      event.preventDefault();
      onCalmingContent?.();
      return;
    }
  }, [enableCrisisShortcuts, onCrisisSupport, onPeerSupport, onCalmingContent]);

  // Track stress indicators
  const trackStressIndicators = useCallback((event: KeyboardEvent) => {
    const state = keyboardStateRef.current;

    // Track rapid key presses
    if (rapidKeyPressTimerRef.current) {
      clearTimeout(rapidKeyPressTimerRef.current);
      state.stressIndicators.rapidKeyPresses++;
    }

    rapidKeyPressTimerRef.current = setTimeout(() => {
      state.stressIndicators.rapidKeyPresses = Math.max(0, state.stressIndicators.rapidKeyPresses - 1);
    }, 1000);

    // Track escape attempts (potential stress indicator)
    if (event.key === 'Escape') {
      state.stressIndicators.escapeAttempts++;
      setTimeout(() => {
        state.stressIndicators.escapeAttempts = Math.max(0, state.stressIndicators.escapeAttempts - 1);
      }, 5000);
    }

    // Track backtracking (Shift+Tab repeatedly)
    if (event.key === 'Tab' && event.shiftKey) {
      if (state.lastKeyPressed === 'Tab' && event.shiftKey) {
        state.stressIndicators.backtrackingCount++;
      }
    }

    state.lastKeyPressed = event.key;
  }, []);

  // Enhanced focus management for stress-aware navigation
  const handleFocusChange = useCallback((event: FocusEvent) => {
    const target = event.target as HTMLElement;
    const state = keyboardStateRef.current;

    if (target && state.isTabbing) {
      // Add to focus history
      state.focusHistory.push(target);
      if (state.focusHistory.length > 10) {
        state.focusHistory.shift();
      }

      // Apply calm focus indicators
      if (calmFocusIndicators) {
        target.classList.add('stress-aware-focus');

        // Remove focus class after a delay to prevent visual noise
        setTimeout(() => {
          target.classList.remove('stress-aware-focus');
        }, 300);
      }
    }
  }, [calmFocusIndicators]);

  // Handle tab key for predictable navigation
  const handleTabNavigation = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Tab') {
      keyboardStateRef.current.isTabbing = true;

      // Reset tabbing state after a delay
      setTimeout(() => {
        keyboardStateRef.current.isTabbing = false;
      }, 100);

      if (predictableTabOrder) {
        // Ensure focus stays within main content areas
        const focusableElements = document.querySelectorAll(
          'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );

        const currentIndex = Array.from(focusableElements).indexOf(document.activeElement as Element);

        // Skip hidden or non-interactive elements that might confuse stressed users
        if (currentIndex !== -1) {
          const nextElement = focusableElements[event.shiftKey ? currentIndex - 1 : currentIndex + 1];
          if (nextElement && (nextElement as HTMLElement).offsetParent === null) {
            // Element is hidden, skip to next
            event.preventDefault();
            const skipIndex = event.shiftKey ? currentIndex - 2 : currentIndex + 2;
            const skipElement = focusableElements[skipIndex] as HTMLElement;
            skipElement?.focus();
          }
        }
      }
    }
  }, [predictableTabOrder]);

  // Get current stress level based on indicators
  const getStressLevel = useCallback((): 'low' | 'moderate' | 'high' | 'crisis' => {
    const indicators = keyboardStateRef.current.stressIndicators;
    const totalStressScore = indicators.rapidKeyPresses + indicators.backtrackingCount + (indicators.escapeAttempts * 2);

    if (totalStressScore >= 10) return 'crisis';
    if (totalStressScore >= 6) return 'high';
    if (totalStressScore >= 3) return 'moderate';
    return 'low';
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      trackStressIndicators(event);
      handleCrisisShortcuts(event);
      handleTabNavigation(event);
    };

    const handleFocus = (event: FocusEvent) => {
      handleFocusChange(event);
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('focusin', handleFocus);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('focusin', handleFocus);
      if (rapidKeyPressTimerRef.current) {
        clearTimeout(rapidKeyPressTimerRef.current);
      }
    };
  }, [trackStressIndicators, handleCrisisShortcuts, handleTabNavigation, handleFocusChange]);

  return {
    stressLevel: getStressLevel(),
    keyboardState: keyboardStateRef.current,
    isTabbing: keyboardStateRef.current.isTabbing
  };
};
