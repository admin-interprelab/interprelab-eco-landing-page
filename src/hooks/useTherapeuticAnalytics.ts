import { useEffect, useRef, useCallback, useState } from 'react';
import { therapeuticAnalytics } from '../services/therapeuticAnalytics';
import {
  TherapeuticUserSession,
  PrivacyConsent,
  SessionOutcome,
  SupportInteraction
} from '../types/therapeutic-analytics';
import { EmotionalState, JourneyStage, PainPoint } from '../types/navigation';
import { HopeIndicator } from '../types/empathetic-discovery';

interface UseTherapeuticAnalyticsOptions {
  userId?: string;
  autoStart?: boolean;
  privacyConsent?: PrivacyConsent;
}

interface TherapeuticAnalyticsHook {
  sessionId: string | null;
  isTracking: boolean;
  startSession: (consent?: PrivacyConsent) => string;
  endSession: (outcome?: SessionOutcome) => void;
  trackJourneyPoint: (journeyStage: JourneyStage, emotionalState: EmotionalState, contentEngagement?: any) => void;
  trackHopeIndicator: (indicator: HopeIndicator) => void;
  trackSupportInteraction: (interaction: SupportInteraction) => void;
  trackPainPointExploration: (painPoint: PainPoint) => void;
  updatePrivacyConsent: (consent: Partial<PrivacyConsent>) => void;
  getSessionAnalytics: () => any;
  session: TherapeuticUserSession | null;
}

export function useTherapeuticAnalytics(options: UseTherapeuticAnalyticsOptions = {}): TherapeuticAnalyticsHook {
  const { userId, autoStart = true, privacyConsent } = options;
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [isTracking, setIsTracking] = useState(false);
  const [session, setSession] = useState<TherapeuticUserSession | null>(null);
  const sessionRef = useRef<string | null>(null);

  // Start a new therapeutic analytics session
  const startSession = useCallback((consent?: PrivacyConsent): string => {
    if (sessionRef.current) {
      // End existing session first
      therapeuticAnalytics.endSession(sessionRef.current);
    }

    const newSessionId = therapeuticAnalytics.startSession(userId, consent || privacyConsent);
    sessionRef.current = newSessionId;
    setSessionId(newSessionId);
    setIsTracking(true);

    // Update session state
    const sessionData = therapeuticAnalytics.getSession(newSessionId);
    setSession(sessionData || null);

    return newSessionId;
  }, [userId, privacyConsent]);

  // End the current session
  const endSession = useCallback((outcome?: SessionOutcome): void => {
    if (sessionRef.current) {
      therapeuticAnalytics.endSession(sessionRef.current, outcome);
      sessionRef.current = null;
      setSessionId(null);
      setIsTracking(false);
      setSession(null);
    }
  }, []);

  // Track emotional journey points
  const trackJourneyPoint = useCallback((
    journeyStage: JourneyStage,
    emotionalState: EmotionalState,
    contentEngagement?: any
  ): void => {
    if (sessionRef.current) {
      therapeuticAnalytics.trackJourneyPoint(
        sessionRef.current,
        journeyStage,
        emotionalState,
        contentEngagement
      );

      // Update session state
      const sessionData = therapeuticAnalytics.getSession(sessionRef.current);
      setSession(sessionData || null);
    }
  }, []);

  // Track hope indicators
  const trackHopeIndicator = useCallback((indicator: HopeIndicator): void => {
    if (sessionRef.current) {
      therapeuticAnalytics.trackHopeIndicator(sessionRef.current, indicator);

      // Update session state
      const sessionData = therapeuticAnalytics.getSession(sessionRef.current);
      setSession(sessionData || null);
    }
  }, []);

  // Track support interactions
  const trackSupportInteraction = useCallback((interaction: SupportInteraction): void => {
    if (sessionRef.current) {
      therapeuticAnalytics.trackSupportInteraction(sessionRef.current, interaction);

      // Update session state
      const sessionData = therapeuticAnalytics.getSession(sessionRef.current);
      setSession(sessionData || null);
    }
  }, []);

  // Track pain point exploration
  const trackPainPointExploration = useCallback((painPoint: PainPoint): void => {
    if (sessionRef.current) {
      therapeuticAnalytics.trackPainPointExploration(sessionRef.current, painPoint);

      // Update session state
      const sessionData = therapeuticAnalytics.getSession(sessionRef.current);
      setSession(sessionData || null);
    }
  }, []);

  // Update privacy consent
  const updatePrivacyConsent = useCallback((consent: Partial<PrivacyConsent>): void => {
    if (sessionRef.current) {
      therapeuticAnalytics.updatePrivacyConsent(sessionRef.current, consent);

      // Update session state
      const sessionData = therapeuticAnalytics.getSession(sessionRef.current);
      setSession(sessionData || null);
    }
  }, []);

  // Get session analytics
  const getSessionAnalytics = useCallback((): any => {
    if (sessionRef.current) {
      return therapeuticAnalytics.getSessionAnalytics(sessionRef.current);
    }
    return null;
  }, []);

  // Auto-start session on mount if enabled
  useEffect(() => {
    if (autoStart && !sessionRef.current) {
      startSession();
    }

    // Cleanup on unmount
    return () => {
      if (sessionRef.current) {
        therapeuticAnalytics.endSession(sessionRef.current);
      }
    };
  }, [autoStart, startSession]);

  // Handle page visibility changes to pause/resume tracking
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && sessionRef.current) {
        // Page is hidden, could indicate user switching away due to stress
        const currentSession = therapeuticAnalytics.getSession(sessionRef.current);
        if (currentSession) {
          // Track potential stress indicator
          therapeuticAnalytics.detectStressIndicators(currentSession, {
            timestamp: new Date(),
            journeyStage: currentSession.emotionalJourney[currentSession.emotionalJourney.length - 1]?.journeyStage || {
              stage: 'validation',
              progress: 0,
              completedMilestones: [],
              nextRecommendedAction: ''
            },
            emotionalState: currentSession.emotionalJourney[currentSession.emotionalJourney.length - 1]?.emotionalState || {
              stressLevel: 'moderate',
              primaryConcerns: [],
              supportNeeds: [],
              preferredCommunicationStyle: 'gentle'
            },
            contentEngagement: {
              contentId: 'page-visibility-change',
              contentType: 'validation',
              timeSpent: 0,
              interactionDepth: 'viewed',
              emotionalResponse: 'neutral',
              painPointRelevance: 5
            },
            supportResourcesAccessed: [],
            hopeLevel: 5,
            stressLevel: 6,
            engagementQuality: 'surface'
          });
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  // Handle beforeunload to end session gracefully
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (sessionRef.current) {
        therapeuticAnalytics.endSession(sessionRef.current, {
          type: 'neutral',
          hopeProgression: 0,
          stressReduction: 0,
          actionsTaken: [],
          nextRecommendedSteps: []
        });
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);

  return {
    sessionId,
    isTracking,
    startSession,
    endSession,
    trackJourneyPoint,
    trackHopeIndicator,
    trackSupportInteraction,
    trackPainPointExploration,
    updatePrivacyConsent,
    getSessionAnalytics,
    session
  };
}

// Specialized hooks for specific use cases

export function useJourneyTracking(initialStage?: JourneyStage, initialEmotionalState?: EmotionalState) {
  const analytics = useTherapeuticAnalytics();
  const [currentStage, setCurrentStage] = useState<JourneyStage | null>(initialStage || null);
  const [currentEmotionalState, setCurrentEmotionalState] = useState<EmotionalState | null>(initialEmotionalState || null);

  const updateJourneyStage = useCallback((stage: JourneyStage, emotionalState?: EmotionalState) => {
    setCurrentStage(stage);
    if (emotionalState) {
      setCurrentEmotionalState(emotionalState);
    }

    if (analytics.isTracking && currentEmotionalState) {
      analytics.trackJourneyPoint(stage, emotionalState || currentEmotionalState);
    }
  }, [analytics, currentEmotionalState]);

  const updateEmotionalState = useCallback((emotionalState: EmotionalState) => {
    setCurrentEmotionalState(emotionalState);

    if (analytics.isTracking && currentStage) {
      analytics.trackJourneyPoint(currentStage, emotionalState);
    }
  }, [analytics, currentStage]);

  return {
    ...analytics,
    currentStage,
    currentEmotionalState,
    updateJourneyStage,
    updateEmotionalState
  };
}

export function useHopeTracking() {
  const analytics = useTherapeuticAnalytics();
  const [hopeLevel, setHopeLevel] = useState<number>(5);

  const trackHope = useCallback((type: HopeIndicator['type'], intensity: number, context: string, content?: string) => {
    const indicator: HopeIndicator = {
      type,
      timestamp: new Date(),
      intensity,
      context,
      content
    };

    analytics.trackHopeIndicator(indicator);
    setHopeLevel(intensity);
  }, [analytics]);

  const trackSuccessStoryEngagement = useCallback((storyId: string, engagementLevel: number) => {
    trackHope('success-story-engagement', engagementLevel, `Engaged with success story: ${storyId}`, storyId);
  }, [trackHope]);

  const trackSolutionExploration = useCallback((solutionId: string, interestLevel: number) => {
    trackHope('solution-exploration', interestLevel, `Explored solution: ${solutionId}`, solutionId);
  }, [trackHope]);

  const trackCommunityParticipation = useCallback((activityType: string, engagementLevel: number) => {
    trackHope('community-participation', engagementLevel, `Community activity: ${activityType}`, activityType);
  }, [trackHope]);

  const trackPremiumConsideration = useCallback((planType: string, interestLevel: number) => {
    trackHope('premium-consideration', interestLevel, `Considered premium plan: ${planType}`, planType);
  }, [trackHope]);

  return {
    ...analytics,
    hopeLevel,
    trackHope,
    trackSuccessStoryEngagement,
    trackSolutionExploration,
    trackCommunityParticipation,
    trackPremiumConsideration
  };
}

export function useCrisisSupport() {
  const analytics = useTherapeuticAnalytics();

  const accessCrisisSupport = useCallback((resourceType: string, duration: number = 0) => {
    const interaction: SupportInteraction = {
      type: 'crisis-help-viewed',
      timestamp: new Date(),
      duration,
      outcome: 'helped', // Will be updated based on user feedback
      supportResourceId: resourceType,
      followUpNeeded: true
    };

    analytics.trackSupportInteraction(interaction);
  }, [analytics]);

  const accessPeerSupport = useCallback((duration: number = 0, effectiveness?: number) => {
    const interaction: SupportInteraction = {
      type: 'peer-support-accessed',
      timestamp: new Date(),
      duration,
      outcome: effectiveness && effectiveness >= 7 ? 'helped' : 'neutral',
      supportResourceId: 'peer-community',
      followUpNeeded: false,
      effectivenessRating: effectiveness
    };

    analytics.trackSupportInteraction(interaction);
  }, [analytics]);

  const joinCommunity = useCallback((communityType: string) => {
    const interaction: SupportInteraction = {
      type: 'community-joined',
      timestamp: new Date(),
      duration: 0,
      outcome: 'helped',
      supportResourceId: communityType,
      followUpNeeded: false
    };

    analytics.trackSupportInteraction(interaction);
  }, [analytics]);

  return {
    ...analytics,
    accessCrisisSupport,
    accessPeerSupport,
    joinCommunity
  };
}

export default useTherapeuticAnalytics;
