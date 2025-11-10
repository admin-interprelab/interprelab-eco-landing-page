import React, { createContext, useContext, useEffect, useState } from 'react';

interface AccessibilityPreferences {
  reducedMotion: boolean;
  highContrast: boolean;
  calmingMode: boolean;
  fontSize: 'small' | 'medium' | 'large' | 'extra-large';
  colorTheme: 'standard' | 'calming' | 'high-contrast' | 'warm';
  focusIndicatorStyle: 'subtle' | 'standard' | 'enhanced';
  audioSensitivity: 'normal' | 'reduced' | 'none';
}

interface AccessibilityContextType {
  preferences: AccessibilityPreferences;
  updatePreference: <K extends keyof AccessibilityPreferences>(
    key: K,
    value: AccessibilityPreferences[K]
  ) => void;
  resetPreferences: () => void;
  isHighStressMode: boolean;
  setHighStressMode: (enabled: boolean) => void;
}

const defaultPreferences: AccessibilityPreferences = {
  reducedMotion: false,
  highContrast: false,
  calmingMode: false,
  fontSize: 'medium',
  colorTheme: 'standard',
  focusIndicatorStyle: 'standard',
  audioSensitivity: 'normal'
};

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
};

export const AccessibilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [preferences, setPreferences] = useState<AccessibilityPreferences>(() => {
    const stored = localStorage.getItem('accessibility-preferences');
    if (stored) {
      try {
        return { ...defaultPreferences, ...JSON.parse(stored) };
      } catch {
        return defaultPreferences;
      }
    }

    // Check system preferences
    const systemPreferences: Partial<AccessibilityPreferences> = {};

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      systemPreferences.reducedMotion = true;
    }

    if (window.matchMedia('(prefers-contrast: high)').matches) {
      systemPreferences.highContrast = true;
    }

    return { ...defaultPreferences, ...systemPreferences };
  });

  const [isHighStressMode, setHighStressMode] = useState(false);

  const updatePreference = <K extends keyof AccessibilityPreferences>(
    key: K,
    value: AccessibilityPreferences[K]
  ) => {
    setPreferences(prev => {
      const updated = { ...prev, [key]: value };
      localStorage.setItem('accessibility-preferences', JSON.stringify(updated));
      return updated;
    });
  };

  const resetPreferences = () => {
    setPreferences(defaultPreferences);
    localStorage.removeItem('accessibility-preferences');
  };

  // Apply accessibility preferences to document
  useEffect(() => {
    const root = document.documentElement;

    // Remove existing accessibility classes
    root.classList.remove(
      'reduced-motion',
      'high-contrast',
      'calming-mode',
      'font-small',
      'font-medium',
      'font-large',
      'font-extra-large',
      'theme-standard',
      'theme-calming',
      'theme-high-contrast',
      'theme-warm',
      'focus-subtle',
      'focus-standard',
      'focus-enhanced',
      'audio-normal',
      'audio-reduced',
      'audio-none',
      'high-stress-mode'
    );

    // Apply current preferences
    if (preferences.reducedMotion) root.classList.add('reduced-motion');
    if (preferences.highContrast) root.classList.add('high-contrast');
    if (preferences.calmingMode) root.classList.add('calming-mode');
    if (isHighStressMode) root.classList.add('high-stress-mode');

    root.classList.add(`font-${preferences.fontSize}`);
    root.classList.add(`theme-${preferences.colorTheme}`);
    root.classList.add(`focus-${preferences.focusIndicatorStyle}`);
    root.classList.add(`audio-${preferences.audioSensitivity}`);

    // Set CSS custom properties for dynamic theming
    const setThemeProperties = () => {
      switch (preferences.colorTheme) {
        case 'calming':
          root.style.setProperty('--primary', '200 50% 60%'); // Soft blue
          root.style.setProperty('--secondary', '150 30% 70%'); // Soft green
          root.style.setProperty('--background', '210 20% 98%'); // Very light blue-gray
          root.style.setProperty('--foreground', '210 15% 20%'); // Dark blue-gray
          break;
        case 'warm':
          root.style.setProperty('--primary', '25 70% 50%'); // Warm orange
          root.style.setProperty('--secondary', '45 60% 60%'); // Warm yellow
          root.style.setProperty('--background', '30 20% 98%'); // Warm white
          root.style.setProperty('--foreground', '30 15% 20%'); // Warm dark
          break;
        case 'high-contrast':
          root.style.setProperty('--primary', '220 100% 50%'); // Pure blue
          root.style.setProperty('--secondary', '0 0% 20%'); // Dark gray
          root.style.setProperty('--background', '0 0% 100%'); // Pure white
          root.style.setProperty('--foreground', '0 0% 0%'); // Pure black
          break;
        default:
          // Reset to default theme values
          root.style.removeProperty('--primary');
          root.style.removeProperty('--secondary');
          root.style.removeProperty('--background');
          root.style.removeProperty('--foreground');
      }
    };

    setThemeProperties();
  }, [preferences, isHighStressMode]);

  // Listen for system preference changes
  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const contrastQuery = window.matchMedia('(prefers-contrast: high)');

    const handleMotionChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem('accessibility-preferences')) {
        updatePreference('reducedMotion', e.matches);
      }
    };

    const handleContrastChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem('accessibility-preferences')) {
        updatePreference('highContrast', e.matches);
      }
    };

    motionQuery.addEventListener('change', handleMotionChange);
    contrastQuery.addEventListener('change', handleContrastChange);

    return () => {
      motionQuery.removeEventListener('change', handleMotionChange);
      contrastQuery.removeEventListener('change', handleContrastChange);
    };
  }, []);

  const contextValue: AccessibilityContextType = {
    preferences,
    updatePreference,
    resetPreferences,
    isHighStressMode,
    setHighStressMode
  };

  return (
    <AccessibilityContext.Provider value={contextValue}>
      {children}
    </AccessibilityContext.Provider>
  );
};
