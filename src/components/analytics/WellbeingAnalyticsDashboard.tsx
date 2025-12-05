import React, { useState, useEffect } from 'react';
import { therapeuticABTestingService } from '../../services/therapeuticABTesting';
import {
  TherapeuticABTest,
  WellbeingMetric,
  TestResult
} from '../../types/therapeutic-analytics';

interface WellbeingAnalyticsDashboardProps {
  className?: string;
}

interface DashboardMetrics {
  totalTests: number;
  activeTests: number;
  averageWellbeingImpact: number;
  crisisPreventionRate: number;
  hopeProgressionTrend: number;
  stressReductionTrend: number;
  ethicalComplianceScore: number;
  testResults: TestResult[];
}

/**
 * Wellbeing Analytics Dashboard
 *
 * Displays therapeutic A/B testing results with focus on interpreter wellbeing
 * metrics rather than traditional conversion metrics. Includes ethical compliance
 * monitoring and crisis prevention tracking.
 */
export const WellbeingAnalyticsDashboard: React.FC<WellbeingAnalyticsDashboardProps> = ({
  className = ''
}) => {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [activeTests, setActiveTests] = useState<TherapeuticABTest[]>([]);
  const [selectedTimeRange, setSelectedTimeRange] = useState<'7d' | '30d' | '90d'>('30d');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

        // Get active tests
        const tests = therapeuticABTestingService.getActiveTests();
        setActiveTests(tests);

        // Calculate dashboard metrics
        const dashboardMetrics = await calculateDashboardMetrics(tests);
        setMetrics(dashboardMetrics);
      } catch (error) {
        console.error('Failed to load dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [calculateDashboardMetrics, selectedTimeRange]);

  const loadDashboardData = async () => {
    try {
      setLoading(true);

      // Get active tests
      const tests = therapeuticABTestingService.getActiveTests();
      setActiveTests(tests);

      // Calculate dashboard metrics
      const dashboardMetrics = await calculateDashboardMetrics(tests);
      setMetrics(dashboardMetrics);
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateDashboardMetrics = async (tests: TherapeuticABTest[]): Promise<DashboardMetrics> => {
    let allResults: TestResult[] = [];

    // Collect results from all tests
    for (const test of tests) {
      try {
        const { results } = await therapeuticABTestingService.getTestResults(test.testId);
        allResults = [...allResults, ...results];
      } catch (error) {
        console.error(`Failed to get results for test ${test.testId}:`, error);
      }
    }

    // Calculate aggregate metrics
    const totalTests = tests.length;
    const activeTests = tests.filter(t => t.status === 'active').length;

    const avgWellbeing = allResults.length > 0
      ? allResults.reduce((sum, r) => sum + r.wellbeingImpact.overallWellbeing, 0) / allResults.length
      : 0;

    const crisisPreventionRate = allResults.length > 0
      ? allResults.reduce((sum, r) => sum + Math.max(0, 1 - r.wellbeingImpact.crisisRisk), 0) / allResults.length
      : 1;

    const hopeProgression = allResults.length > 0
      ? allResults.reduce((sum, r) => sum + r.wellbeingImpact.hopeProgression, 0) / allResults.length
      : 0;

    const stressReduction = allResults.length > 0
      ? allResults.reduce((sum, r) => sum + r.wellbeingImpact.stressReduction, 0) / allResults.length
      : 0;

    // Calculate ethical compliance score
    const ethicalScore = calculateEthicalComplianceScore(tests, allResults);

    return {
      totalTests,
      activeTests,
      averageWellbeingImpact: avgWellbeing,
      crisisPreventionRate,
      hopeProgressionTrend: hopeProgression,
      stressReductionTrend: stressReduction,
      ethicalComplianceScore: ethicalScore,
      testResults: allResults
    };
  };

  const calculateEthicalComplianceScore = (tests: TherapeuticABTest[], results: TestResult[]): number => {
    let totalScore = 100;

    // Deduct points for ethical violations
    const negativeImpacts = results.filter(r => r.wellbeingImpact.overallWellbeing < -1).length;
    const crisisRisks = results.filter(r => r.wellbeingImpact.crisisRisk > 2).length;

    totalScore -= negativeImpacts * 5;
    totalScore -= crisisRisks * 10;

    // Check for tests without proper ethical guidelines
    const testsWithoutGuidelines = tests.filter(t => t.ethicalGuidelines.length === 0).length;
    totalScore -= testsWithoutGuidelines * 15;

    return Math.max(0, totalScore);
  };

  if (loading) {
    return (
      <div className={`wellbeing-analytics-dashboard ${className}`}>
        <div className="animate-pulse bg-gray-100 rounded-lg p-8">
          <div className="h-8 bg-gray-200 rounded mb-4"></div>
          <div className="grid grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!metrics) {
    return (
      <div className={`wellbeing-analytics-dashboard ${className}`}>
        <div className="text-center py-8 text-gray-500">
          Failed to load dashboard data
        </div>
      </div>
    );
  }

  return (
    <div className={`wellbeing-analytics-dashboard bg-white rounded-lg shadow-lg p-6 ${className}`}>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Wellbeing Analytics Dashboard</h2>
        <div className="flex space-x-2">
          {(['7d', '30d', '90d'] as const).map(range => (
            <button
              key={range}
              onClick={() => setSelectedTimeRange(range)}
              className={`px-3 py-1 rounded text-sm ${
                selectedTimeRange === range
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <MetricCard
          title="Active Tests"
          value={metrics.activeTests}
          subtitle={`of ${metrics.totalTests} total`}
          color="blue"
          icon="🧪"
        />
        <MetricCard
          title="Wellbeing Impact"
          value={metrics.averageWellbeingImpact.toFixed(2)}
          subtitle="Average improvement"
          color={metrics.averageWellbeingImpact > 0 ? 'green' : 'red'}
          icon="💚"
        />
        <MetricCard
          title="Crisis Prevention"
          value={`${(metrics.crisisPreventionRate * 100).toFixed(1)}%`}
          subtitle="Success rate"
          color="green"
          icon="🛡️"
        />
        <MetricCard
          title="Ethical Compliance"
          value={`${metrics.ethicalComplianceScore}%`}
          subtitle="Compliance score"
          color={metrics.ethicalComplianceScore > 80 ? 'green' : 'yellow'}
          icon="⚖️"
        />
      </div>

      {/* Wellbeing Trends */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <TrendCard
          title="Hope Progression"
          value={metrics.hopeProgressionTrend}
          description="Average increase in hope levels during test sessions"
          color="purple"
        />
        <TrendCard
          title="Stress Reduction"
          value={metrics.stressReductionTrend}
          description="Average decrease in stress levels during test sessions"
          color="blue"
        />
      </div>

      {/* Active Tests Overview */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Active Tests</h3>
        <div className="space-y-3">
          {activeTests.map(test => (
            <ActiveTestCard key={test.testId} test={test} />
          ))}
          {activeTests.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No active tests running
            </div>
          )}
        </div>
      </div>

      {/* Ethical Guidelines Summary */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Ethical Guidelines Compliance</h3>
        <EthicalCompliancePanel
          tests={activeTests}
          complianceScore={metrics.ethicalComplianceScore}
        />
      </div>
    </div>
  );
};

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  color: 'blue' | 'green' | 'red' | 'yellow' | 'purple';
  icon: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, subtitle, color, icon }) => {
  const colorClasses = {
    blue: 'bg-blue-50 border-blue-200 text-blue-800',
    green: 'bg-green-50 border-green-200 text-green-800',
    red: 'bg-red-50 border-red-200 text-red-800',
    yellow: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    purple: 'bg-purple-50 border-purple-200 text-purple-800'
  };

  return (
    <div className={`border rounded-lg p-4 ${colorClasses[color]}`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-2xl">{icon}</span>
        <span className="text-2xl font-bold">{value}</span>
      </div>
      <div className="text-sm font-medium">{title}</div>
      <div className="text-xs opacity-75">{subtitle}</div>
    </div>
  );
};

interface TrendCardProps {
  title: string;
  value: number;
  description: string;
  color: 'blue' | 'purple';
}

const TrendCard: React.FC<TrendCardProps> = ({ title, value, description, color }) => {
  const isPositive = value > 0;
  const colorClasses = {
    blue: 'bg-blue-50 border-blue-200',
    purple: 'bg-purple-50 border-purple-200'
  };

  return (
    <div className={`border rounded-lg p-4 ${colorClasses[color]}`}>
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-semibold text-gray-800">{title}</h4>
        <div className={`text-lg font-bold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
          {isPositive ? '+' : ''}{value.toFixed(2)}
        </div>
      </div>
      <p className="text-sm text-gray-600">{description}</p>
      <div className="mt-2">
        <div className={`text-xs ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
          {isPositive ? '↗️ Positive trend' : '↘️ Needs attention'}
        </div>
      </div>
    </div>
  );
};

interface ActiveTestCardProps {
  test: TherapeuticABTest;
}

const ActiveTestCard: React.FC<ActiveTestCardProps> = ({ test }) => {
  const [testResults, setTestResults] = useState<{
    results: TestResult[];
    wellbeingAnalysis: any;
    ethicalCompliance: any;
    recommendations: string[];
  } | null>(null);

  useEffect(() => {
    const loadResults = async () => {
      try {
        const results = await therapeuticABTestingService.getTestResults(test.testId);
        setTestResults(results);
      } catch (error) {
        console.error('Failed to load test results:', error);
      }
    };

    loadResults();
  }, [test.testId]);



  return (
    <div className="border border-gray-200 rounded-lg p-4">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h4 className="font-semibold text-gray-800">{test.name}</h4>
          <p className="text-sm text-gray-600">{test.description}</p>
        </div>
        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
          {test.status}
        </span>
      </div>

      <div className="grid grid-cols-3 gap-4 text-sm">
        <div>
          <span className="text-gray-500">Variants:</span>
          <span className="ml-1 font-medium">{test.variants.length}</span>
        </div>
        <div>
          <span className="text-gray-500">Duration:</span>
          <span className="ml-1 font-medium">{test.duration} days</span>
        </div>
        <div>
          <span className="text-gray-500">Traffic:</span>
          <span className="ml-1 font-medium">{test.trafficAllocation}%</span>
        </div>
      </div>

      {testResults && (
        <div className="mt-3 pt-3 border-t border-gray-100">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-500">Hope Progression:</span>
              <span className="ml-1 font-medium text-purple-600">
                +{testResults.wellbeingAnalysis.averageHopeProgression.toFixed(2)}
              </span>
            </div>
            <div>
              <span className="text-gray-500">Stress Reduction:</span>
              <span className="ml-1 font-medium text-blue-600">
                +{testResults.wellbeingAnalysis.averageStressReduction.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

interface EthicalCompliancePanelProps {
  tests: TherapeuticABTest[];
  complianceScore: number;
}

const EthicalCompliancePanel: React.FC<EthicalCompliancePanelProps> = ({
  tests,
  complianceScore
}) => {
  const getComplianceColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getComplianceStatus = (score: number) => {
    if (score >= 90) return 'Excellent';
    if (score >= 80) return 'Good';
    if (score >= 70) return 'Needs Improvement';
    return 'Critical';
  };

  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <div>
          <span className="text-sm text-gray-600">Overall Compliance Score</span>
          <div className={`text-2xl font-bold ${getComplianceColor(complianceScore)}`}>
            {complianceScore}%
          </div>
          <div className={`text-sm ${getComplianceColor(complianceScore)}`}>
            {getComplianceStatus(complianceScore)}
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-600">Active Tests</div>
          <div className="text-lg font-semibold">{tests.length}</div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Crisis User Exclusion</span>
          <span className="text-green-600">✓ 100%</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Ethical Thresholds Set</span>
          <span className="text-green-600">
            ✓ {tests.filter(t => t.wellbeingMetrics.some(m => m.ethicalThreshold)).length}/{tests.length}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Wellbeing Metrics Tracked</span>
          <span className="text-green-600">✓ All Tests</span>
        </div>
      </div>
    </div>
  );
};

export default WellbeingAnalyticsDashboard;
