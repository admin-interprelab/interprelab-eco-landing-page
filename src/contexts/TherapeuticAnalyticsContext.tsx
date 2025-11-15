import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useTherapeuticAnalytics } from '../hooks/useTherapeuticAnalytics';
import { PrivacyConsent, TherapeuticUserSession } from '../types/therapeutic-analytics';
import { EmotionalState, JourneyStage, PainPoint } from '../types/navigation';
import { HopeIndicator } from '../types/empathetic-discovery';
import PrivacyConsentModal from '../components/analytics/PrivacyConsentModal';

interface TherapeuticAnalyticsContextType {
  // Session management
  sessionId: string | null;
  isTracking: boolean;
  session: TherapeuticUserSession | null;

  // Privacy and consent
  privacyConsent: PrivacyConsent | null;
  showConsentModal: boolean;
  updatePrivacyConsent: (consent: Partial<PrivacyConsent>) => void;

  // Journey tracking
  currentJourneyStage: JourneyStage | null;
  currentEmotionalState: EmotionalState | null;
  updateJourneyStage: (stage: JourneyStage, emotionalState?: EmotionalState) => void;
  updateEmotionalState: (state: EmotionalState) => void;

  // Hope tracking
  currentHopeLevel: number;
  trackHopeIndicator: (indicator: HopeIndicator) => void;

  // Pain point tracking
  exploredPainPoints: PainPoint[];
  trackPainPointExploration: (painPoint: PainPoint) => void;

  // Crisis support
  crisisDetected: boolean;
  accessCrisisSupport: (resourceType: string, duration?: number) => void;

  // Analytics
  getSessionAnalytics: () => any;

  // Control methods
  startTracking: () => void;
  stopTracking: () => void;
  resetSession: () => void;
}

const TherapeuticAnalyticsContext = createContext<TherapeuticAnalyticsContextType | undefined>(undefined);

interface TherapeuticAnalyticsProviderProps {
  children: ReactNode;
  userId?: string;
  autoStart?: boolean;
  requireConsent?: boolean;
}

export function TherapeuticAnalyticsProvider({
  children,
  userId,
  autoStart = true,
  requireConsent = true
}: TherapeuticAnalyticsProviderProps) {
  // Core analytics hook
  const analytics = useTherapeuticAnalytics({
    userId,
    autoStart: !requireConsent && autoStart
  });

  // State management
  const [privacyConsent, setPrivacyConsent] = useState<PrivacyConsent | null>(null);
  const [showConsentModal, setShowConsentModal] = useState(false);
  const [currentJourneyStage, setCurrentJourneyStage] = useState<JourneyStage | null>(null);
  const [currentEmotionalState, setCurrentEmotionalState] = useState<EmotionalState | null>(null);
  const [currentHopeLevel, setCurrentHopeLevel] = useState<number>(5);
  const [exploredPainPoints, setExploredPainPoints] = useState<PainPoint[]>([]);
  const [crisisDetected, setCrisisDetected] = useState<boolean>(false);

  // Load saved consent from localStorage
  useEffect(() => {
    const savedConsent = localStorage.getItem('therapeutic-analytics-consent');
    if (savedConsent) {
      try {
        const consent = JSON.parse(savedConsent) as PrivacyConsent;
        setPrivacyConsent(consent);

        // Start analytics if consent is given and autoStart is enabled
        if (autoStart && consent.analyticsConsent) {
          analytics.startSession(consent);
        }
      } catch (error) {
        console.error('Error parsing saved consent:', error);
      }
    } else if (requireConsent) {
      // Show consent modal if no saved consent and consent is required
      setShowConsentModal(true);
    }
  }, [autoStart, requireConsent, analytics]);

  // Update session state when analytics session changes
  useEffect(() => {
    if (analytics.session) {
      // Update journey stage from session
      const lastJourneyPoint = analytics.session.emotionalJourney[analytics.session.emotionalJourney.length - 1];
      if (lastJourneyPoint) {
        setCurrentJourneyStage(lastJourneyPoint.journeyStage);
        setCurrentEmotionalState(lastJourneyPoint.emotionalState);
        setCurrentHopeLevel(lastJourneyPoint.hopeLevel);
      }

      // Update explored pain points
      setExploredPainPoints(analytics.session.painPointsExplored);

      // Check for crisis indicators
      const hasCrisisIndicators = analytics.session.stressIndicators.some(
        indicator => indicator.severity === 'crisis'
      );
      setCrisisDetected(hasCrisisIndicators);
    }
  }, [analytics.session]);

  // Handle privacy consent
  const handlePrivacyConsent = (consent: PrivacyConsent) => {
    setPrivacyConsent(consent);
    setShowConsentModal(false);

    // Save consent to localStorage
    localStorage.setItem('therapeutic-analytics-consent', JSON.stringify(consent));

    // Start analytics session if consent is given
    if (consent.analyticsConsent) {
      analytics.startSession(consent);
    }
  };

  // Update privacy consent
  const updatePrivacyConsent = (partialConsent: Partial<PrivacyConsent>) => {
    if (privacyConsent) {
      const updatedConsent = { ...privacyConsent, ...partialConsent };
      setPrivacyConsent(updatedConsent);
      localStorage.setItem('therapeutic-analytics-consent', JSON.stringify(updatedConsent));
      analytics.updatePrivacyConsent(partialConsent);
    }
  };

  // Journey stage management
  const updateJourneyStage = (stage: JourneyStage, emotionalState?: EmotionalState) => {
    setCurrentJourneyStage(stage);
    if (emotionalState) {
      setCurrentEmotionalState(emotionalState);
    }

    if (analytics.isTracking && (emotionalState || currentEmotionalState)) {
      analytics.trackJourneyPoint(stage, emotionalState || currentEmotionalState!);
    }
  };

  const updateEmotionalState = (state: EmotionalState) => {
    setCurrentEmotionalState(state);

    if (analytics.isTracking && currentJourneyStage) {
      analytics.trackJourneyPoint(currentJourneyStage, state);
    }
  };

  // Hope tracking
  const trackHopeIndicator = (indicator: HopeIndicator) => {
    setCurrentHopeLevel(indicator.intensity);
    analytics.trackHopeIndicator(indicator);
  };

  // Pain point tracking
  const trackPainPointExploration = (painPoint: PainPoint) => {
    setExploredPainPoints(prev => {
      const existing = prev.find(pp => pp.type === painPoint.type);
      if (existing) {
        // Update existing pain point if severity is higher
        if (painPoint.severity > existing.severity) {
          return prev.map(pp => pp.type === painPoint.type ? painPoint : pp);
        }
        return prev;
      } else {
        return [...prev, painPoint];
      }
    });

    analytics.trackPainPointExploration(painPoint);
  };

  // Crisis support
  const accessCrisisSupport = (resourceType: string, duration: number = 0) => {
    analytics.trackSupportInteraction({
      type: 'crisis-help-viewed',
      timestamp: new Date(),
      duration,
      outcome: 'helped',
      supportResourceId: resourceType,
      followUpNeeded: true
    });
  };

  // Control methods
  const startTracking = () => {
    if (privacyConsent?.analyticsConsent) {
      analytics.startSession(privacyConsent);
    } else {
      setShowConsentModal(true);
    }
  };

  const stopTracking = () => {
    analytics.endSession();
  };

  const resetSession = () => {
    analytics.endSession();
    setCurrentJourneyStage(null);
    setCurrentEmotionalState(null);
    setCurrentHopeLevel(5);
    setExploredPainPoints([]);
    setCrisisDetected(false);

    if (privacyConsent?.analyticsConsent) {
      analytics.startSession(privacyConsent);
    }
  };

  const contextValue: TherapeuticAnalyticsContextType = {
    // Session management
    sessionId: analytics.sessionId,
    isTracking: analytics.isTracking,
    session: analytics.session,

    // Privacy and consent
    privacyConsent,
    showConsentModal,
    updatePrivacyConsent,

    // Journey tracking
    currentJourneyStage,
    currentEmotionalState,
    updateJourneyStage,
    updateEmotionalState,

    // Hope tracking
    currentHopeLevel,
    trackHopeIndicator,

    // Pain point tracking
    exploredPainPoints,
    trackPainPointExploration,

    // Crisis support
    crisisDetected,
    accessCrisisSupport,

    // Analytics
    getSessionAnalytics: analytics.getSessionAnalytics,

    // Control methods
    startTracking,
    stopTracking,
    resetSession
  };

  return (
    <TherapeuticAnalyticsContext.Provider value={contextValue}>
      {children}

      {/* Privacy Consent Modal */}
      <PrivacyConsentModal
        isOpen={showConsentModal}
        onClose={() => setShowConsentModal(false)}
        onConsent={handlePrivacyConsent}
        initialConsent={privacyConsent || undefined}
      />
    </TherapeuticAnalyticsContext.Provider>
  );
}

// Hook to use the therapeutic analytics context
export function useTherapeuticAnalyticsContext(): TherapeuticAnalyticsContextType {
  const context = useContext(TherapeuticAnalyticsContext);
  if (context === undefined) {
    throw new Error('useTherapeuticAnalyticsContext must be used within a TherapeuticAnalyticsProvider');
  }
  return context;
}

// Convenience hooks for specific functionality
export function useJourneyStageTracking() {
  const context = useTherapeuticAnalyticsContext();
  return {
    currentStage: context.currentJourneyStage,
    currentEmotionalState: context.currentEmotionalState,
    updateJourneyStage: context.updateJourneyStage,
    updateEmotionalState: context.updateEmotionalState,
    isTracking: context.isTracking
  };
}

export function useHopeTracking() {
  const context = useTherapeuticAnalyticsContext();
  return {
    hopeLevel: context.currentHopeLevel,
    trackHopeIndicator: context.trackHopeIndicator,
    isTracking: context.isTracking
  };
}

export function usePainPointTracking() {
  const context = useTherapeuticAnalyticsContext();
  return {
    exploredPainPoints: context.exploredPainPoints,
    trackPainPointExploration: context.trackPainPointExploration,
    isTracking: context.isTracking
  };
}

export function useCrisisDetection() {
  const context = useTherapeuticAnalyticsContext();
  return {
    crisisDetected: context.crisisDetected,
    accessCrisisSupport: context.accessCrisisSupport,
    isTracking: context.isTracking
  };
}

export default TherapeuticAnalyticsContext;
