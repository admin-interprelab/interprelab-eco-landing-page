import { useState, useEffect, useCallback } from 'react';
import { therapeuticABTestingService } from '../services/therapeuticABTesting';
import { useTherapeuticAnalytics } from './useTherapeuticAnalytics';
import { TherapeuticUserSession } from '../types/therapeutic-analytics';

interface UseTherapeuticABTestOptions {
  testId: string;
  fallbackVariant?: string;
  onVariantAssigned?: (variantId: string) => void;
  onTestComplete?: (variantId: string, session: TherapeuticUserSession) => void;
}

interface TherapeuticABTestResult {
  variantId: string | null;
  isLoading: boolean;
  error: string | null;
  recordResult: () => Promise<void>;
}

/**
 * Hook for using therapeutic A/B tests in components
 *
 * This hook handles variant assignment, result recording, and ethical compliance
 * for wellbeing-focused A/B testing. It automatically excludes users in crisis
 * and ensures all testing follows therapeutic guidelines.
 */
export const useTherapeuticABTest = (options: UseTherapeuticABTestOptions): TherapeuticABTestResult => {
  const { testId, fallbackVariant, onVariantAssigned, onTestComplete } = options;
  const [variantId, setVariantId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const {
    session: currentSession,
    trackSupportInteraction,
    sessionId
  } = useTherapeuticAnalytics();

  // Helper functions for A/B testing
  const isUserInCrisis = useCallback((): boolean => {
    if (!currentSession) return false;
    const recentStressIndicators = currentSession.stressIndicators.filter(
      indicator => indicator.severity === 'crisis' || indicator.severity === 'high'
    );
    return recentStressIndicators.length > 0;
  }, [currentSession]);

  const getCurrentUserId = useCallback((): string => {
    return currentSession?.userId || sessionId || 'anonymous-user';
  }, [currentSession, sessionId]);

  const trackEvent = useCallback((eventData: Record<string, unknown>) => {
    // Convert to support interaction for tracking
    trackSupportInteraction({
      type: 'crisis-help-viewed',
      timestamp: new Date(),
      duration: 0,
      outcome: 'neutral',
      supportResourceId: (eventData.data as unknown)?.testId || 'ab-test',
      followUpNeeded: false
    });
  }, [trackSupportInteraction]);

  const assignVariant = useCallback(async () => {
    if (!currentSession) {
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      // Check if user is in crisis - if so, don't include in test
      if (isUserInCrisis()) {
        console.log('User in crisis - excluding from A/B test');
        setVariantId(fallbackVariant || null);
        setIsLoading(false);
        return;
      }

      const userId = getCurrentUserId();
      const assignedVariant = await therapeuticABTestingService.assignUserToVariant(
        userId,
        testId,
        currentSession
      );

      if (assignedVariant) {
        setVariantId(assignedVariant);
        onVariantAssigned?.(assignedVariant);

        // Track variant assignment
        trackEvent({
          type: 'test-variant-assigned',
          sessionId: currentSession.sessionId,
          userId,
          timestamp: new Date(),
          data: {
            testId,
            variantId: assignedVariant,
            therapeuticContext: {
              journeyStage: currentSession.emotionalJourney[currentSession.emotionalJourney.length - 1]?.journeyStage,
              stressLevel: currentSession.emotionalJourney[currentSession.emotionalJourney.length - 1]?.emotionalState.stressLevel,
              painPoints: currentSession.painPointsExplored.map(p => p.type)
            }
          },
          privacyLevel: 'pseudonymous'
        });
      } else {
        // User doesn't meet test criteria or test is not active
        setVariantId(fallbackVariant || null);
      }
    } catch (err) {
      console.error('Error assigning A/B test variant:', err);
      setError(err instanceof Error ? err.message : 'Failed to assign variant');
      setVariantId(fallbackVariant || null);
    } finally {
      setIsLoading(false);
    }
  }, [testId, currentSession, fallbackVariant, onVariantAssigned, isUserInCrisis, getCurrentUserId, trackEvent]);

  useEffect(() => {
    assignVariant();
  }, [assignVariant]);



  const recordResult = async () => {
    if (!variantId || !currentSession) {
      return;
    }

    try {
      const userId = getCurrentUserId();

      await therapeuticABTestingService.recordTestResult(
        testId,
        variantId,
        userId,
        currentSession.sessionId,
        currentSession
      );

      onTestComplete?.(variantId, currentSession);

      // Track test completion
      trackEvent({
        type: 'test-variant-assigned',
        sessionId: currentSession.sessionId,
        userId,
        timestamp: new Date(),
        data: {
          testId,
          variantId,
          action: 'result-recorded',
          wellbeingImpact: {
            hopeProgression: calculateHopeProgression(currentSession),
            stressReduction: calculateStressReduction(currentSession),
            supportUtilization: currentSession.supportInteractions.length
          }
        },
        privacyLevel: 'pseudonymous'
      });
    } catch (err) {
      console.error('Error recording A/B test result:', err);
      setError(err instanceof Error ? err.message : 'Failed to record result');
    }
  };

  return {
    variantId,
    isLoading,
    error,
    recordResult
  };
};

/**
 * Hook for creating therapeutic A/B test variants with ethical safeguards
 */
export const useTherapeuticVariant = <T extends Record<string, unknown>>(
  testId: string,
  variants: Record<string, T>,
  fallback: T
): { variant: T; variantId: string | null; recordResult: () => Promise<void> } => {
  const { variantId, recordResult } = useTherapeuticABTest({
    testId,
    fallbackVariant: Object.keys(variants)[0]
  });

  const variant = variantId && variants[variantId] ? variants[variantId] : fallback;

  return {
    variant,
    variantId,
    recordResult
  };
};

/**
 * Hook for therapeutic messaging A/B tests
 */
export const useTherapeuticMessaging = (
  testId: string,
  messages: Record<string, {
    title: string;
    description: string;
    therapeuticApproach: 'validation-focused' | 'hope-building' | 'solution-oriented' | 'community-centered';
    emotionalTone: 'validating' | 'hopeful' | 'empowering' | 'practical';
  }>,
  fallback: {
    title: string;
    description: string;
    therapeuticApproach: 'validation-focused' | 'hope-building' | 'solution-oriented' | 'community-centered';
    emotionalTone: 'validating' | 'hopeful' | 'empowering' | 'practical';
  }
) => {
  return useTherapeuticVariant(testId, messages, fallback);
};

/**
 * Hook for therapeutic component A/B tests
 */
export const useTherapeuticComponent = <T extends React.ComponentType<unknown>>(
  testId: string,
  components: Record<string, T>,
  fallback: T
) => {
  return useTherapeuticVariant(testId, components, fallback);
};

// Helper functions
const calculateHopeProgression = (session: TherapeuticUserSession): number => {
  const journey = session.emotionalJourney;
  if (journey.length < 2) return 0;

  return journey[journey.length - 1].hopeLevel - journey[0].hopeLevel;
};

const calculateStressReduction = (session: TherapeuticUserSession): number => {
  const journey = session.emotionalJourney;
  if (journey.length < 2) return 0;

  return journey[0].stressLevel - journey[journey.length - 1].stressLevel;
};

export default useTherapeuticABTest;
