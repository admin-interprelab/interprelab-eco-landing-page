import { PainPoint, EmotionalState, JourneyStage, SupportResource } from './navigation';
import { HopeIndicator, UserInteraction } from './empathetic-discovery';

// Core Therapeutic User Session Tracking
export interface TherapeuticUserSession {
  sessionId: string;
  userId?: string;
  startTime: Date;
  lastActivity: Date;
  emotionalJourney: EmotionalJourneyPoint[];
  supportInteractions: SupportInteraction[];
  painPointsExplored: PainPoint[];
  hopeIndicators: HopeIndicator[];
  deviceInfo: DeviceInfo;
  stressIndicators: StressIndicator[];
  privacyConsent: PrivacyConsent;
  sessionOutcome?: SessionOutcome;
}

export interface EmotionalJourneyPoint {
  timestamp: Date;
  journeyStage: JourneyStage;
  emotionalState: EmotionalState;
  contentEngagement: ContentEngagement;
  supportResourcesAccessed: SupportResource[];
  hopeLevel: number; // 1-10 scale
  stressLevel: number; // 1-10 scale
  engagementQuality: 'surface' | 'moderate' | 'deep' | 'transformative';
}

export interface ContentEngagement {
  contentId: string;
  contentType: 'validation' | 'solution' | 'story' | 'community' | 'crisis-support';
  timeSpent: number;
  interactionDepth: 'viewed' | 'engaged' | 'shared' | 'saved' | 'acted-upon';
  emotionalResponse: 'negative' | 'neutral' | 'positive' | 'hopeful' | 'empowered';
  painPointRelevance: number; // 1-10 scale
}

export interface SupportInteraction {
  type: 'crisis-help-viewed' | 'peer-support-accessed' | 'success-story-read' | 'community-joined' | 'professional-help-sought';
  timestamp: Date;
  duration: number;
  outcome: 'helped' | 'neutral' | 'escalated-support-needed' | 'crisis-averted';
  supportResourceId: string;
  followUpNeeded: boolean;
  effectivenessRating?: number; // 1-10 scale
}

export interface StressIndicator {
  type: 'rapid-navigation' | 'crisis-content-seeking' | 'support-resource-access' | 'session-abandonment' | 'error-frustration' | 'time-pressure-signals';
  timestamp: Date;
  severity: 'low' | 'moderate' | 'high' | 'crisis';
  triggerContent?: string;
  context: string;
  automaticResponse?: AutomaticResponse;
}

export interface AutomaticResponse {
  type: 'crisis-support-offered' | 'calming-content-suggested' | 'peer-support-recommended' | 'professional-help-escalated';
  triggered: boolean;
  userResponse?: 'accepted' | 'declined' | 'ignored';
  effectiveness?: number; // 1-10 scale
}

export interface DeviceInfo {
  type: 'desktop' | 'tablet' | 'mobile';
  screenSize: string;
  connectionSpeed: 'slow' | 'moderate' | 'fast';
  accessibilityFeatures: string[];
  preferredInputMethod: 'mouse' | 'touch' | 'keyboard' | 'voice';
}

export interface PrivacyConsent {
  analyticsConsent: boolean;
  emotionalTrackingConsent: boolean;
  crisisInterventionConsent: boolean;
  peerSupportConsent: boolean;
  consentTimestamp: Date;
  consentVersion: string;
}

export interface SessionOutcome {
  type: 'hope-increased' | 'support-found' | 'crisis-resolved' | 'neutral' | 'needs-follow-up';
  hopeProgression: number; // Change in hope level
  stressReduction: number; // Change in stress level
  actionsTaken: string[];
  nextRecommendedSteps: string[];
  followUpScheduled?: Date;
}

// Crisis Detection and Support System
export interface CrisisDetectionConfig {
  stressThresholds: {
    moderate: number;
    high: number;
    crisis: number;
  };
  rapidNavigationThreshold: number; // pages per minute
  crisisKeywords: string[];
  timeBasedTriggers: {
    sessionDuration: number; // minutes before checking
    inactivityPeriod: number; // minutes of inactivity
  };
  escalationRules: EscalationRule[];
}

export interface EscalationRule {
  condition: string;
  severity: StressIndicator['severity'];
  response: CrisisResponse;
  priority: 'low' | 'medium' | 'high' | 'critical';
}

export interface CrisisResponse {
  type: 'immediate-support' | 'peer-connection' | 'professional-referral' | 'emergency-contact';
  message: string;
  resources: SupportResource[];
  automaticTrigger: boolean;
  followUpRequired: boolean;
}

export interface CrisisDetectionResult {
  crisisDetected: boolean;
  severity: StressIndicator['severity'];
  triggers: string[];
  recommendedResponse: CrisisResponse;
  confidence: number; // 0-1 scale
  timestamp: Date;
}

// Wellbeing-Focused A/B Testing
export interface TherapeuticABTest {
  testId: string;
  name: string;
  description: string;
  hypothesis: string;
  variants: TherapeuticTestVariant[];
  trafficAllocation: number;
  wellbeingMetrics: WellbeingMetric[];
  duration: number;
  targetAudience: TestAudience;
  ethicalGuidelines: EthicalGuideline[];
  status: 'draft' | 'active' | 'paused' | 'completed' | 'cancelled';
}

export interface TherapeuticTestVariant {
  id: string;
  name: string;
  description: string;
  component: string; // Component name/path
  weight: number;
  therapeuticApproach: 'validation-focused' | 'hope-building' | 'solution-oriented' | 'community-centered';
  expectedWellbeingImpact: string;
}

export interface WellbeingMetric {
  name: string;
  type: 'hope-progression' | 'stress-reduction' | 'engagement-quality' | 'support-utilization' | 'crisis-prevention';
  measurement: 'increase' | 'decrease' | 'maintain';
  target: number;
  priority: 'primary' | 'secondary' | 'monitoring';
  ethicalThreshold?: number; // Minimum acceptable value
}

export interface TestAudience {
  journeyStages: JourneyStage['stage'][];
  stressLevels: EmotionalState['stressLevel'][];
  painPoints: PainPoint['type'][];
  excludeCrisisUsers: boolean;
  minSessionCount?: number;
}

export interface EthicalGuideline {
  principle: string;
  description: string;
  implementation: string;
  monitoringMethod: string;
  violationResponse: string;
}

export interface TestResult {
  testId: string;
  variantId: string;
  userId: string;
  sessionId: string;
  metrics: TestMetricResult[];
  wellbeingImpact: WellbeingImpact;
  timestamp: Date;
}

export interface TestMetricResult {
  metricName: string;
  value: number;
  baseline?: number;
  improvement: number;
  significance: number;
}

export interface WellbeingImpact {
  hopeProgression: number;
  stressReduction: number;
  supportUtilization: number;
  crisisRisk: number;
  overallWellbeing: number;
  qualitativeNotes?: string;
}

// Analytics Dashboard Types
export interface TherapeuticAnalyticsDashboard {
  overview: AnalyticsOverview;
  journeyAnalytics: JourneyAnalytics;
  crisisMetrics: CrisisMetrics;
  wellbeingTrends: WellbeingTrends;
  testResults: ABTestResults;
}

export interface AnalyticsOverview {
  totalSessions: number;
  activeUsers: number;
  averageHopeProgression: number;
  averageStressReduction: number;
  crisisInterventions: number;
  supportConnectionsSuccessful: number;
  timeRange: string;
}

export interface JourneyAnalytics {
  stageDistribution: Record<JourneyStage['stage'], number>;
  averageProgressionTime: Record<JourneyStage['stage'], number>;
  dropOffPoints: string[];
  successfulTransitions: number;
  stuckUsers: number;
}

export interface CrisisMetrics {
  crisisDetections: number;
  falsePositives: number;
  interventionSuccess: number;
  averageResponseTime: number;
  escalationRate: number;
  followUpCompletion: number;
}

export interface WellbeingTrends {
  hopeProgression: TrendData[];
  stressReduction: TrendData[];
  supportUtilization: TrendData[];
  communityEngagement: TrendData[];
  timeRange: string;
}

export interface TrendData {
  date: string;
  value: number;
  change: number;
  significance: 'positive' | 'negative' | 'neutral';
}

export interface ABTestResults {
  activeTests: number;
  completedTests: number;
  wellbeingImprovements: number;
  ethicalViolations: number;
  recommendedActions: string[];
}

// Event Types for Analytics
export interface TherapeuticAnalyticsEvent {
  type: AnalyticsEventType;
  sessionId: string;
  userId?: string;
  timestamp: Date;
  data: Record<string, any>;
  privacyLevel: 'anonymous' | 'pseudonymous' | 'identified';
}

export type AnalyticsEventType =
  | 'session-start'
  | 'journey-stage-change'
  | 'emotional-state-change'
  | 'hope-indicator'
  | 'stress-indicator'
  | 'crisis-detected'
  | 'support-accessed'
  | 'content-engagement'
  | 'test-variant-assigned'
  | 'session-end';

// Privacy and Compliance
export interface PrivacySettings {
  dataRetentionPeriod: number; // days
  anonymizationDelay: number; // days
  consentRequired: boolean;
  optOutAllowed: boolean;
  dataExportEnabled: boolean;
  deletionEnabled: boolean;
  complianceStandards: string[]; // GDPR, HIPAA, etc.
}

export interface DataGovernance {
  classification: 'public' | 'internal' | 'confidential' | 'restricted';
  retention: string;
  access: string[];
  encryption: boolean;
  auditRequired: boolean;
}
