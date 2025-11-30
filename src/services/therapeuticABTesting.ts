import {
  TherapeuticABTest,
  TherapeuticTestVariant,
  WellbeingMetric,
  TestResult,
  WellbeingImpact,
  TestAudience,
  EthicalGuideline,
  TestMetricResult,
  TherapeuticUserSession,
  EmotionalJourneyPoint
} from '../types/therapeutic-analytics';
import { EmotionalState, JourneyStage, PainPoint } from '../types/navigation';

/**
 * Therapeutic A/B Testing Service
 *
 * This service implements wellbeing-focused A/B testing that prioritizes interpreter
 * mental health and professional development over traditional conversion metrics.
 * All tests are designed with ethical guidelines and crisis prevention in mind.
 */
class TherapeuticABTestingService {
  private activeTests: Map<string, TherapeuticABTest> = new Map();
  private userAssignments: Map<string, Map<string, string>> = new Map(); // userId -> testId -> variantId
  private testResults: Map<string, TestResult[]> = new Map();
  private ethicalViolations: Map<string, string[]> = new Map();

  /**
   * Initialize a new therapeutic A/B test with wellbeing-focused metrics
   */
  async createTest(testConfig: Omit<TherapeuticABTest, 'testId' | 'status'>): Promise<TherapeuticABTest> {
    const testId = `therapeutic-test-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    const test: TherapeuticABTest = {
      ...testConfig,
      testId,
      status: 'draft'
    };

    // Validate ethical guidelines
    await this.validateEthicalGuidelines(test);

    this.activeTests.set(testId, test);
    this.testResults.set(testId, []);

    return test;
  }

  /**
   * Assign user to test variant based on therapeutic needs and ethical guidelines
   */
  async assignUserToVariant(
    userId: string,
    testId: string,
    userSession: TherapeuticUserSession
  ): Promise<string | null> {
    const test = this.activeTests.get(testId);
    if (!test || test.status !== 'active') {
      return null;
    }

    // Check if user meets target audience criteria
    if (!this.meetsAudienceCriteria(userSession, test.targetAudience)) {
      return null;
    }

    // Ethical check: Don't test on users in crisis
    if (this.isUserInCrisis(userSession)) {
      return null;
    }

    // Check for existing assignment
    const userAssignments = this.userAssignments.get(userId) || new Map();
    if (userAssignments.has(testId)) {
      return userAssignments.get(testId)!;
    }

    // Assign variant based on weighted distribution
    const variantId = this.selectVariantByWeight(test.variants);

    // Store assignment
    if (!this.userAssignments.has(userId)) {
      this.userAssignments.set(userId, new Map());
    }
    this.userAssignments.get(userId)!.set(testId, variantId);

    return variantId;
  }

  /**
   * Record test result with wellbeing impact assessment
   */
  async recordTestResult(
    testId: string,
    variantId: string,
    userId: string,
    sessionId: string,
    userSession: TherapeuticUserSession
  ): Promise<void> {
    const test = this.activeTests.get(testId);
    if (!test) return;

    const wellbeingImpact = this.calculateWellbeingImpact(userSession);
    const metrics = this.calculateTestMetrics(test.wellbeingMetrics, userSession);

    const result: TestResult = {
      testId,
      variantId,
      userId,
      sessionId,
      metrics,
      wellbeingImpact,
      timestamp: new Date()
    };

    // Check for ethical violations
    await this.checkEthicalViolations(test, result);

    const results = this.testResults.get(testId) || [];
    results.push(result);
    this.testResults.set(testId, results);
  }

  /**
   * Get test results with wellbeing analysis
   */
  async getTestResults(testId: string): Promise<{
    results: TestResult[];
    wellbeingAnalysis: WellbeingAnalysis;
    ethicalCompliance: EthicalCompliance;
    recommendations: string[];
  }> {
    const results = this.testResults.get(testId) || [];
    const test = this.activeTests.get(testId);

    if (!test) {
      throw new Error(`Test ${testId} not found`);
    }

    const wellbeingAnalysis = this.analyzeWellbeingImpact(results);
    const ethicalCompliance = this.assessEthicalCompliance(test, results);
    const recommendations = this.generateRecommendations(test, wellbeingAnalysis, ethicalCompliance);

    return {
      results,
      wellbeingAnalysis,
      ethicalCompliance,
      recommendations
    };
  }

  /**
   * Start a test after ethical review
   */
  async startTest(testId: string): Promise<void> {
    const test = this.activeTests.get(testId);
    if (!test) {
      throw new Error(`Test ${testId} not found`);
    }

    // Final ethical validation
    await this.validateEthicalGuidelines(test);

    test.status = 'active';
    this.activeTests.set(testId, test);
  }

  /**
   * Stop a test immediately (used for ethical violations)
   */
  async stopTest(testId: string, reason: string): Promise<void> {
    const test = this.activeTests.get(testId);
    if (!test) return;

    test.status = 'cancelled';
    this.activeTests.set(testId, test);

    // Record violation if ethical issue
    if (reason.includes('ethical') || reason.includes('wellbeing')) {
      const violations = this.ethicalViolations.get(testId) || [];
      violations.push(`${new Date().toISOString()}: ${reason}`);
      this.ethicalViolations.set(testId, violations);
    }
  }

  /**
   * Get all active tests for monitoring
   */
  getActiveTests(): TherapeuticABTest[] {
    return Array.from(this.activeTests.values()).filter(test => test.status === 'active');
  }

  /**
   * Private helper methods
   */
  private async validateEthicalGuidelines(test: TherapeuticABTest): Promise<void> {
    // Ensure no testing on crisis users
    if (!test.targetAudience.excludeCrisisUsers) {
      throw new Error('Tests must exclude users in crisis');
    }

    // Validate wellbeing metrics have ethical thresholds
    for (const metric of test.wellbeingMetrics) {
      if (metric.priority === 'primary' && !metric.ethicalThreshold) {
        throw new Error(`Primary metric ${metric.name} must have ethical threshold`);
      }
    }

    // Ensure test duration is reasonable
    if (test.duration > 30) { // 30 days max
      throw new Error('Test duration cannot exceed 30 days for ethical reasons');
    }
  }

  private meetsAudienceCriteria(session: TherapeuticUserSession, audience: TestAudience): boolean {
    const currentJourney = session.emotionalJourney[session.emotionalJourney.length - 1];
    if (!currentJourney) return false;

    // Check journey stage
    if (!audience.journeyStages.includes(currentJourney.journeyStage.stage)) {
      return false;
    }

    // Check stress level
    if (!audience.stressLevels.includes(currentJourney.emotionalState.stressLevel)) {
      return false;
    }

    // Check pain points
    const userPainPoints = session.painPointsExplored.map(p => p.type);
    const hasRelevantPainPoint = audience.painPoints.some(p => userPainPoints.includes(p));
    if (!hasRelevantPainPoint) {
      return false;
    }

    return true;
  }

  private isUserInCrisis(session: TherapeuticUserSession): boolean {
    const recentStressIndicators = session.stressIndicators.filter(
      indicator => indicator.severity === 'crisis' || indicator.severity === 'high'
    );

    return recentStressIndicators.length > 0;
  }

  private selectVariantByWeight(variants: TherapeuticTestVariant[]): string {
    const totalWeight = variants.reduce((sum, variant) => sum + variant.weight, 0);
    const random = Math.random() * totalWeight;

    let currentWeight = 0;
    for (const variant of variants) {
      currentWeight += variant.weight;
      if (random <= currentWeight) {
        return variant.id;
      }
    }

    return variants[0].id; // Fallback
  }

  private calculateWellbeingImpact(session: TherapeuticUserSession): WellbeingImpact {
    const journey = session.emotionalJourney;
    if (journey.length < 2) {
      return {
        hopeProgression: 0,
        stressReduction: 0,
        supportUtilization: 0,
        crisisRisk: 0,
        overallWellbeing: 0
      };
    }

    const start = journey[0];
    const end = journey[journey.length - 1];

    const hopeProgression = end.hopeLevel - start.hopeLevel;
    const stressReduction = start.stressLevel - end.stressLevel;
    const supportUtilization = session.supportInteractions.length;
    const crisisRisk = session.stressIndicators.filter(s => s.severity === 'crisis').length;

    const overallWellbeing = (hopeProgression + stressReduction + Math.min(supportUtilization, 5) - crisisRisk) / 4;

    return {
      hopeProgression,
      stressReduction,
      supportUtilization,
      crisisRisk,
      overallWellbeing
    };
  }

  private calculateTestMetrics(metrics: WellbeingMetric[], session: TherapeuticUserSession): TestMetricResult[] {
    return metrics.map(metric => {
      let value = 0;

      switch (metric.type) {
        case 'hope-progression':
          value = this.calculateHopeProgression(session);
          break;
        case 'stress-reduction':
          value = this.calculateStressReduction(session);
          break;
        case 'engagement-quality':
          value = this.calculateEngagementQuality(session);
          break;
        case 'support-utilization':
          value = session.supportInteractions.length;
          break;
        case 'crisis-prevention':
          value = this.calculateCrisisPrevention(session);
          break;
      }

      return {
        metricName: metric.name,
        value,
        improvement: 0, // Will be calculated when comparing variants
        significance: 0 // Will be calculated with statistical analysis
      };
    });
  }

  private calculateHopeProgression(session: TherapeuticUserSession): number {
    const journey = session.emotionalJourney;
    if (journey.length < 2) return 0;

    return journey[journey.length - 1].hopeLevel - journey[0].hopeLevel;
  }

  private calculateStressReduction(session: TherapeuticUserSession): number {
    const journey = session.emotionalJourney;
    if (journey.length < 2) return 0;

    return journey[0].stressLevel - journey[journey.length - 1].stressLevel;
  }

  private calculateEngagementQuality(session: TherapeuticUserSession): number {
    const engagements = session.emotionalJourney.flatMap(j => j.contentEngagement);
    const qualityScores = {
      'viewed': 1,
      'engaged': 2,
      'shared': 3,
      'saved': 4,
      'acted-upon': 5
    };

    const totalScore = engagements.reduce((sum, eng) => sum + qualityScores[eng.interactionDepth], 0);
    return engagements.length > 0 ? totalScore / engagements.length : 0;
  }

  private calculateCrisisPrevention(session: TherapeuticUserSession): number {
    const crisisIndicators = session.stressIndicators.filter(s => s.severity === 'crisis');
    const preventedCrises = crisisIndicators.filter(c => c.automaticResponse?.effectiveness && c.automaticResponse.effectiveness > 7);

    return crisisIndicators.length > 0 ? preventedCrises.length / crisisIndicators.length : 1;
  }

  private async checkEthicalViolations(test: TherapeuticABTest, result: TestResult): Promise<void> {
    for (const metric of test.wellbeingMetrics) {
      if (metric.ethicalThreshold) {
        const metricResult = result.metrics.find(m => m.metricName === metric.name);
        if (metricResult && metricResult.value < metric.ethicalThreshold) {
          await this.stopTest(test.testId, `Ethical violation: ${metric.name} below threshold`);
        }
      }
    }

    // Check overall wellbeing impact
    if (result.wellbeingImpact.overallWellbeing < -2) {
      await this.stopTest(test.testId, 'Ethical violation: Negative wellbeing impact detected');
    }
  }

  private analyzeWellbeingImpact(results: TestResult[]): WellbeingAnalysis {
    if (results.length === 0) {
      return {
        averageHopeProgression: 0,
        averageStressReduction: 0,
        supportUtilizationRate: 0,
        crisisPreventionRate: 0,
        overallWellbeingTrend: 'neutral',
        significantFindings: []
      };
    }

    const avgHope = results.reduce((sum, r) => sum + r.wellbeingImpact.hopeProgression, 0) / results.length;
    const avgStress = results.reduce((sum, r) => sum + r.wellbeingImpact.stressReduction, 0) / results.length;
    const avgSupport = results.reduce((sum, r) => sum + r.wellbeingImpact.supportUtilization, 0) / results.length;
    const avgCrisis = results.reduce((sum, r) => sum + r.wellbeingImpact.crisisRisk, 0) / results.length;
    const avgOverall = results.reduce((sum, r) => sum + r.wellbeingImpact.overallWellbeing, 0) / results.length;

    let trend: 'positive' | 'negative' | 'neutral' = 'neutral';
    if (avgOverall > 1) trend = 'positive';
    else if (avgOverall < -1) trend = 'negative';

    const significantFindings: string[] = [];
    if (avgHope > 2) significantFindings.push('Significant hope progression observed');
    if (avgStress > 2) significantFindings.push('Significant stress reduction achieved');
    if (avgCrisis > 1) significantFindings.push('Crisis risk elevated - requires attention');

    return {
      averageHopeProgression: avgHope,
      averageStressReduction: avgStress,
      supportUtilizationRate: avgSupport,
      crisisPreventionRate: Math.max(0, 1 - avgCrisis),
      overallWellbeingTrend: trend,
      significantFindings
    };
  }

  private assessEthicalCompliance(test: TherapeuticABTest, results: TestResult[]): EthicalCompliance {
    const violations = this.ethicalViolations.get(test.testId) || [];
    const negativeImpacts = results.filter(r => r.wellbeingImpact.overallWellbeing < -1).length;
    const crisisRisks = results.filter(r => r.wellbeingImpact.crisisRisk > 2).length;

    return {
      ethicalViolations: violations.length,
      negativeWellbeingImpacts: negativeImpacts,
      crisisRisksElevated: crisisRisks,
      complianceScore: Math.max(0, 100 - (violations.length * 20) - (negativeImpacts * 5) - (crisisRisks * 10)),
      recommendations: this.generateEthicalRecommendations(violations.length, negativeImpacts, crisisRisks)
    };
  }

  private generateRecommendations(
    test: TherapeuticABTest,
    wellbeingAnalysis: WellbeingAnalysis,
    ethicalCompliance: EthicalCompliance
  ): string[] {
    const recommendations: string[] = [];

    if (wellbeingAnalysis.overallWellbeingTrend === 'negative') {
      recommendations.push('Consider stopping test due to negative wellbeing impact');
    }

    if (wellbeingAnalysis.crisisPreventionRate < 0.8) {
      recommendations.push('Improve crisis prevention mechanisms');
    }

    if (ethicalCompliance.complianceScore < 80) {
      recommendations.push('Address ethical compliance issues before continuing');
    }

    if (wellbeingAnalysis.averageHopeProgression > 2) {
      recommendations.push('Positive hope progression - consider implementing winning variant');
    }

    return recommendations;
  }

  private generateEthicalRecommendations(violations: number, negativeImpacts: number, crisisRisks: number): string[] {
    const recommendations: string[] = [];

    if (violations > 0) {
      recommendations.push('Review and address ethical guideline violations');
    }

    if (negativeImpacts > 0) {
      recommendations.push('Implement additional wellbeing safeguards');
    }

    if (crisisRisks > 0) {
      recommendations.push('Enhance crisis detection and intervention systems');
    }

    return recommendations;
  }
}

// Supporting interfaces
interface WellbeingAnalysis {
  averageHopeProgression: number;
  averageStressReduction: number;
  supportUtilizationRate: number;
  crisisPreventionRate: number;
  overallWellbeingTrend: 'positive' | 'negative' | 'neutral';
  significantFindings: string[];
}

interface EthicalCompliance {
  ethicalViolations: number;
  negativeWellbeingImpacts: number;
  crisisRisksElevated: number;
  complianceScore: number;
  recommendations: string[];
}

// Export singleton instance
export const therapeuticABTestingService = new TherapeuticABTestingService();
export default therapeuticABTestingService;
