import { useState, useEffect, useCallback, useRef } from 'react';
import { useSmartCache, useCriticalResourceCache, useOfflineSupport } from './useSmartCache';

interface WorkflowPattern {
  id: string;
  name: string;
  priority: 'critical' | 'important' | 'nice-to-have';
  resources: string[];
  preloadTriggers: string[];
}

interface InterpreterSession {
  sessionId: string;
  startTime: Date;
  stressLevel: 'low' | 'moderate' | 'high' | 'crisis';
  accessPatterns: string[];
  supportResourcesAccessed: string[];
  timeConstraints: boolean;
}

// Common interpreter workflow patterns based on user research
const interpreterWorkflowPatterns: WorkflowPattern[] = [
  {
    id: 'crisis-support',
    name: 'Crisis Support Access',
    priority: 'critical',
    resources: [
      'crisis-hotlines',
      'peer-support-chat',
      'emergency-self-care',
      'immediate-help-contacts'
    ],
    preloadTriggers: ['stress-indicators', 'error-encounters', 'rapid-navigation']
  },
  {
    id: 'quick-skill-check',
    name: 'Quick Skill Verification',
    priority: 'important',
    resources: [
      'medical-terminology',
      'quick-reference-guides',
      'pronunciation-tools',
      'context-specific-glossaries'
    ],
    preloadTriggers: ['study-page-visit', 'quiz-start', 'glossary-access']
  },
  {
    id: 'session-preparation',
    name: 'Pre-Session Preparation',
    priority: 'important',
    resources: [
      'session-checklists',
      'equipment-tests',
      'stress-management-tools',
      'confidence-boosters'
    ],
    preloadTriggers: ['dashboard-visit', 'track-page-access', 'morning-hours']
  },
  {
    id: 'post-session-support',
    name: 'Post-Session Decompression',
    priority: 'important',
    resources: [
      'decompression-exercises',
      'peer-discussion-forums',
      'session-reflection-tools',
      'emotional-support-content'
    ],
    preloadTriggers: ['session-completion', 'evening-hours', 'stress-indicators']
  },
  {
    id: 'career-development',
    name: 'Professional Growth',
    priority: 'nice-to-have',
    resources: [
      'certification-paths',
      'skill-assessments',
      'career-planning-tools',
      'success-stories'
    ],
    preloadTriggers: ['premium-page-visit', 'goal-setting', 'progress-review']
  }
];

export const useInterpreterWorkflow = () => {
  const [currentSession, setCurrentSession] = useState<InterpreterSession | null>(null);
  const [predictedNeeds, setPredictedNeeds] = useState<string[]>([]);
  const [workflowOptimizations, setWorkflowOptimizations] = useState<string[]>([]);

  const { preloadCriticalResources, getCriticalResource } = useCriticalResourceCache();
  const { cacheForOffline, hasOfflineContent, isOnline } = useOfflineSupport();
  const { setCache, getCache } = useSmartCache();

  const sessionStartTime = useRef<Date>(new Date());
  const stressIndicators = useRef<string[]>([]);
  const accessPatterns = useRef<string[]>([]);

  // Initialize session tracking
  useEffect(() => {
    const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    setCurrentSession({
      sessionId,
      startTime: sessionStartTime.current,
      stressLevel: 'low',
      accessPatterns: [],
      supportResourcesAccessed: [],
      timeConstraints: false
    });

    // Preload critical resources immediately
    preloadCriticalResources().catch(error => {
      console.warn('Failed to preload some critical resources:', error);
    });
  }, [preloadCriticalResources]);

  // Preload crisis support resources immediately
  const preloadCrisisSupport = useCallback(async () => {
    const crisisPattern = interpreterWorkflowPatterns.find(p => p.id === 'crisis-support');
    if (!crisisPattern) return;

    try {
      for (const resource of crisisPattern.resources) {
        const data = await fetchResource(resource);
        setCache(resource, data, { priority: 'critical' });

        // Also cache for offline access
        cacheForOffline(resource, data);
      }

      setWorkflowOptimizations(prev => [
        ...prev,
        'Crisis support resources preloaded and cached offline'
      ]);
    } catch (error) {
      console.error('Failed to preload crisis support:', error);
    }
  }, [setCache, cacheForOffline]);

  // Update stress level based on indicators
  const updateStressLevel = useCallback(() => {
    if (!currentSession) return;

    const recentStressIndicators = stressIndicators.current.slice(-5);
    let newStressLevel: InterpreterSession['stressLevel'] = 'low';

    if (recentStressIndicators.length >= 4) {
      newStressLevel = 'crisis';
    } else if (recentStressIndicators.length >= 2) {
      newStressLevel = 'high';
    } else if (recentStressIndicators.length >= 1) {
      newStressLevel = 'moderate';
    }

    setCurrentSession(prev => prev ? {
      ...prev,
      stressLevel: newStressLevel
    } : null);

    // Trigger crisis support preloading if stress is high
    if (newStressLevel === 'crisis' || newStressLevel === 'high') {
      preloadCrisisSupport();
    }
  }, [currentSession, preloadCrisisSupport]);

  // Predict user needs and preload resources
  const predictAndPreload = useCallback(async (action: string, context?: unknown) => {
    const relevantPatterns = interpreterWorkflowPatterns.filter(pattern =>
      pattern.preloadTriggers.some(trigger =>
        action.includes(trigger) || trigger.includes(action)
      )
    );

    const predictedResources: string[] = [];
    const optimizations: string[] = [];

    for (const pattern of relevantPatterns) {
      predictedResources.push(...pattern.resources);

      // Add workflow optimizations
      if (pattern.priority === 'critical') {
        optimizations.push(`Prioritized ${pattern.name} resources`);
      }

      // Preload resources based on priority
      for (const resource of pattern.resources) {
        try {
          if (pattern.priority === 'critical') {
            // Cache critical resources with longer TTL
            setCache(resource, await fetchResource(resource), {
              priority: 'critical',
              ttl: 60 * 60 * 1000 // 1 hour
            });
          } else if (pattern.priority === 'important') {
            // Cache important resources
            setCache(resource, await fetchResource(resource), {
              priority: 'important',
              ttl: 30 * 60 * 1000 // 30 minutes
            });
          }
        } catch (error) {
          console.warn(`Failed to preload resource ${resource}:`, error);
        }
      }
    }

    setPredictedNeeds(prev => [...new Set([...prev, ...predictedResources])]);
    setWorkflowOptimizations(prev => [...new Set([...prev, ...optimizations])]);
  }, [setCache]);

  // Track user behavior patterns
  const trackUserAction = useCallback((action: string, context?: unknown) => {
    if (!currentSession) return;

    accessPatterns.current.push(action);

    // Update session with new patterns
    setCurrentSession(prev => prev ? {
      ...prev,
      accessPatterns: [...prev.accessPatterns, action]
    } : null);

    // Detect stress indicators
    const stressActions = [
      'rapid-page-switching',
      'error-encounter',
      'support-resource-access',
      'crisis-content-view',
      'multiple-retries'
    ];

    if (stressActions.includes(action)) {
      stressIndicators.current.push(action);
      updateStressLevel();
    }

    // Predict and preload based on patterns
    predictAndPreload(action, context);
  }, [currentSession, predictAndPreload, updateStressLevel]);

  // Get optimized resource access
  const getOptimizedResource = useCallback(async (resourceId: string) => {
    // First try cache
    let resource = getCache(resourceId);
    if (resource) {
      return resource;
    }

    // If offline, try offline cache
    if (!isOnline && hasOfflineContent(resourceId)) {
      return getCriticalResource(resourceId);
    }

    // Fetch and cache
    try {
      resource = await fetchResource(resourceId);
      setCache(resourceId, resource, {
        priority: currentSession?.stressLevel === 'crisis' ? 'critical' : 'important'
      });
      return resource;
    } catch (error) {
      console.error(`Failed to fetch resource ${resourceId}:`, error);

      // Return offline version if available
      if (hasOfflineContent(resourceId)) {
        return getCriticalResource(resourceId);
      }

      throw error;
    }
  }, [getCache, isOnline, hasOfflineContent, getCriticalResource, setCache, currentSession]);

  // Optimize for time-constrained interpreters
  const enableTimeConstraintMode = useCallback(() => {
    setCurrentSession(prev => prev ? {
      ...prev,
      timeConstraints: true
    } : null);

    // Preload most commonly needed resources
    const essentialResources = [
      'medical-terminology',
      'crisis-support-contacts',
      'quick-reference-guides'
    ];

    essentialResources.forEach(async (resource) => {
      try {
        const data = await fetchResource(resource);
        setCache(resource, data, { priority: 'critical' });
        cacheForOffline(resource, data);
      } catch (error) {
        console.warn(`Failed to preload essential resource ${resource}:`, error);
      }
    });

    setWorkflowOptimizations(prev => [
      ...prev,
      'Time-constraint mode enabled - essential resources prioritized'
    ]);
  }, [setCache, cacheForOffline]);

  // Generate personalized recommendations
  const generateRecommendations = useCallback(() => {
    if (!currentSession) return [];

    const recommendations: string[] = [];

    if (currentSession.stressLevel === 'crisis' || currentSession.stressLevel === 'high') {
      recommendations.push('Consider accessing crisis support resources');
      recommendations.push('Take a moment for self-care before continuing');
    }

    if (currentSession.timeConstraints) {
      recommendations.push('Essential resources have been prioritized for quick access');
    }

    if (stressIndicators.current.length > 3) {
      recommendations.push('Peer support community might be helpful right now');
    }

    return recommendations;
  }, [currentSession]);

  // Get workflow insights for the current session
  const getWorkflowInsights = useCallback(() => {
    if (!currentSession) return null;

    const sessionDuration = Date.now() - currentSession.startTime.getTime();
    const stressEvents = stressIndicators.current.length;
    const uniquePatterns = [...new Set(accessPatterns.current)].length;

    return {
      sessionDuration: Math.round(sessionDuration / 1000 / 60), // minutes
      stressLevel: currentSession.stressLevel,
      stressEvents,
      accessPatterns: uniquePatterns,
      predictedNeeds: predictedNeeds.length,
      optimizationsApplied: workflowOptimizations.length,
      recommendations: generateRecommendations()
    };
  }, [currentSession, predictedNeeds, workflowOptimizations, generateRecommendations]);

  return {
    currentSession,
    trackUserAction,
    getOptimizedResource,
    enableTimeConstraintMode,
    preloadCrisisSupport,
    getWorkflowInsights,
    predictedNeeds,
    workflowOptimizations,
    isOnline
  };
};

// Mock function to simulate resource fetching
// In a real implementation, this would make actual API calls
async function fetchResource(resourceId: string): Promise<unknown> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, Math.random() * 1000));

  // Mock data based on resource type
  const mockData = {
    'crisis-hotlines': [
      { name: 'National Crisis Line', number: '988', available: '24/7' },
      { name: 'Interpreter Support Line', number: '1-800-INTERP', available: '24/7' }
    ],
    'peer-support-chat': {
      url: '/community/chat',
      activeUsers: Math.floor(Math.random() * 50) + 10,
      moderators: 3
    },
    'medical-terminology': {
      terms: ['hypertension', 'diabetes', 'cardiovascular', 'respiratory'],
      lastUpdated: new Date().toISOString()
    },
    'quick-reference-guides': [
      { title: 'Emergency Procedures', url: '/guides/emergency' },
      { title: 'Common Medications', url: '/guides/medications' }
    ]
  };

  return mockData[resourceId as keyof typeof mockData] || { data: `Mock data for ${resourceId}` };
}

export default useInterpreterWorkflow;
