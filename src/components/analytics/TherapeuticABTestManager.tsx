import React, { useState, useEffect } from 'react';
import {
  TherapeuticABTest,
  TherapeuticTestVariant,
  WellbeingMetric,
  TestAudience,
  EthicalGuideline
} from '../../types/therapeutic-analytics';
import { therapeuticABTestingService } from '../../services/therapeuticABTesting';
import { useTherapeuticAnalytics } from '../../hooks/useTherapeuticAnalytics';

interface TherapeuticABTestManagerProps {
  onTestCreated?: (test: TherapeuticABTest) => void;
  onTestStarted?: (testId: string) => void;
  onTestStopped?: (testId: string, reason: string) => void;
}

/**
 * Therapeutic A/B Test Manager Component
 *
 * Provides interface for creating and managing wellbeing-focused A/B tests
 * with built-in ethical guidelines and crisis prevention measures.
 */
export const TherapeuticABTestManager: React.FC<TherapeuticABTestManagerProps> = ({
  onTestCreated,
  onTestStarted,
  onTestStopped
}) => {
  const [activeTests, setActiveTests] = useState<TherapeuticABTest[]>([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedTest, setSelectedTest] = useState<string | null>(null);
  const { trackSupportInteraction } = useTherapeuticAnalytics();

  const trackEvent = (eventData: Record<string, unknown>) => {
    trackSupportInteraction({
      type: 'crisis-help-viewed',
      timestamp: new Date(),
      duration: 0,
      outcome: 'neutral',
      supportResourceId: (eventData.data as any)?.testId || 'ab-test-manager',
      followUpNeeded: false
    });
  };

  useEffect(() => {
    loadActiveTests();
  }, []);

  const loadActiveTests = () => {
    const tests = therapeuticABTestingService.getActiveTests();
    setActiveTests(tests);
  };

  const handleCreateTest = async (testData: Omit<TherapeuticABTest, 'testId' | 'status'>) => {
    try {
      const test = await therapeuticABTestingService.createTest(testData);
      setActiveTests(prev => [...prev, test]);
      setShowCreateForm(false);
      onTestCreated?.(test);

      trackEvent({
        type: 'test-variant-assigned',
        sessionId: 'admin-session',
        timestamp: new Date(),
        data: { testId: test.testId, action: 'created' },
        privacyLevel: 'pseudonymous'
      });
    } catch (error) {
      console.error('Failed to create test:', error);
    }
  };

  const handleStartTest = async (testId: string) => {
    try {
      await therapeuticABTestingService.startTest(testId);
      loadActiveTests();
      onTestStarted?.(testId);

      trackEvent({
        type: 'test-variant-assigned',
        sessionId: 'admin-session',
        timestamp: new Date(),
        data: { testId, action: 'started' },
        privacyLevel: 'pseudonymous'
      });
    } catch (error) {
      console.error('Failed to start test:', error);
    }
  };

  const handleStopTest = async (testId: string, reason: string) => {
    try {
      await therapeuticABTestingService.stopTest(testId, reason);
      loadActiveTests();
      onTestStopped?.(testId, reason);

      trackEvent({
        type: 'test-variant-assigned',
        sessionId: 'admin-session',
        timestamp: new Date(),
        data: { testId, action: 'stopped', reason },
        privacyLevel: 'pseudonymous'
      });
    } catch (error) {
      console.error('Failed to stop test:', error);
    }
  };

  return (
    <div className="therapeutic-ab-test-manager p-6 bg-white rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Therapeutic A/B Tests</h2>
        <button
          onClick={() => setShowCreateForm(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Create New Test
        </button>
      </div>

      {/* Active Tests List */}
      <div className="space-y-4">
        {activeTests.map(test => (
          <TestCard
            key={test.testId}
            test={test}
            onStart={() => handleStartTest(test.testId)}
            onStop={(reason) => handleStopTest(test.testId, reason)}
            onSelect={() => setSelectedTest(test.testId)}
            isSelected={selectedTest === test.testId}
          />
        ))}
      </div>

      {/* Create Test Modal */}
      {showCreateForm && (
        <CreateTestModal
          onSubmit={handleCreateTest}
          onCancel={() => setShowCreateForm(false)}
        />
      )}

      {/* Test Details Panel */}
      {selectedTest && (
        <TestDetailsPanel
          testId={selectedTest}
          onClose={() => setSelectedTest(null)}
        />
      )}
    </div>
  );
};

interface TestCardProps {
  test: TherapeuticABTest;
  onStart: () => void;
  onStop: (reason: string) => void;
  onSelect: () => void;
  isSelected: boolean;
}

const TestCard: React.FC<TestCardProps> = ({ test, onStart, onStop, onSelect, isSelected }) => {
  const [stopReason, setStopReason] = useState('');
  const [showStopModal, setShowStopModal] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'paused': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div
      className={`border rounded-lg p-4 cursor-pointer transition-all ${
        isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
      }`}
      onClick={onSelect}
    >
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{test.name}</h3>
          <p className="text-gray-600 text-sm">{test.description}</p>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(test.status)}`}>
          {test.status}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-3 text-sm">
        <div>
          <span className="text-gray-500">Variants:</span>
          <span className="ml-2 font-medium">{test.variants.length}</span>
        </div>
        <div>
          <span className="text-gray-500">Duration:</span>
          <span className="ml-2 font-medium">{test.duration} days</span>
        </div>
        <div>
          <span className="text-gray-500">Wellbeing Metrics:</span>
          <span className="ml-2 font-medium">{test.wellbeingMetrics.length}</span>
        </div>
        <div>
          <span className="text-gray-500">Ethical Guidelines:</span>
          <span className="ml-2 font-medium">{test.ethicalGuidelines.length}</span>
        </div>
      </div>

      <div className="flex space-x-2">
        {test.status === 'draft' && (
          <button
            onClick={(e) => { e.stopPropagation(); onStart(); }}
            className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700"
          >
            Start Test
          </button>
        )}
        {test.status === 'active' && (
          <button
            onClick={(e) => { e.stopPropagation(); setShowStopModal(true); }}
            className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700"
          >
            Stop Test
          </button>
        )}
      </div>

      {/* Stop Test Modal */}
      {showStopModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Stop Test</h3>
            <p className="text-gray-600 mb-4">Please provide a reason for stopping this test:</p>
            <textarea
              value={stopReason}
              onChange={(e) => setStopReason(e.target.value)}
              className="w-full p-3 border rounded-lg mb-4"
              rows={3}
              placeholder="Reason for stopping test..."
            />
            <div className="flex space-x-3">
              <button
                onClick={() => {
                  onStop(stopReason);
                  setShowStopModal(false);
                  setStopReason('');
                }}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                disabled={!stopReason.trim()}
              >
                Stop Test
              </button>
              <button
                onClick={() => {
                  setShowStopModal(false);
                  setStopReason('');
                }}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

interface CreateTestModalProps {
  onSubmit: (testData: Omit<TherapeuticABTest, 'testId' | 'status'>) => void;
  onCancel: () => void;
}

const CreateTestModal: React.FC<CreateTestModalProps> = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    hypothesis: '',
    duration: 14,
    trafficAllocation: 50
  });

  const [variants, setVariants] = useState<Omit<TherapeuticTestVariant, 'id'>[]>([
    {
      name: 'Control',
      description: 'Current experience',
      component: 'current',
      weight: 50,
      therapeuticApproach: 'validation-focused' as const,
      expectedWellbeingImpact: 'Baseline wellbeing metrics'
    },
    {
      name: 'Treatment',
      description: 'New therapeutic approach',
      component: 'new',
      weight: 50,
      therapeuticApproach: 'hope-building' as const,
      expectedWellbeingImpact: 'Improved hope progression and stress reduction'
    }
  ]);

  const [wellbeingMetrics] = useState<WellbeingMetric[]>([
    {
      name: 'Hope Progression',
      type: 'hope-progression',
      measurement: 'increase',
      target: 2,
      priority: 'primary',
      ethicalThreshold: -1
    },
    {
      name: 'Stress Reduction',
      type: 'stress-reduction',
      measurement: 'increase',
      target: 1.5,
      priority: 'primary',
      ethicalThreshold: -0.5
    },
    {
      name: 'Support Utilization',
      type: 'support-utilization',
      measurement: 'increase',
      target: 1,
      priority: 'secondary'
    }
  ]);

  const [targetAudience] = useState<TestAudience>({
    journeyStages: ['validation', 'hope-building'],
    stressLevels: ['low', 'moderate'],
    painPoints: ['financial', 'psychological', 'professional-development'],
    excludeCrisisUsers: true,
    minSessionCount: 1
  });

  const [ethicalGuidelines] = useState<EthicalGuideline[]>([
    {
      principle: 'Do No Harm',
      description: 'Ensure no variant causes psychological harm or increases crisis risk',
      implementation: 'Monitor wellbeing metrics and stop test if negative impact detected',
      monitoringMethod: 'Real-time wellbeing impact assessment',
      violationResponse: 'Immediate test termination and user support escalation'
    },
    {
      principle: 'Informed Consent',
      description: 'Users should understand they may be part of therapeutic research',
      implementation: 'Clear privacy policy and opt-out mechanisms',
      monitoringMethod: 'Consent tracking and opt-out rate monitoring',
      violationResponse: 'Enhanced consent mechanisms and user communication'
    }
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const testData: Omit<TherapeuticABTest, 'testId' | 'status'> = {
      ...formData,
      variants: variants.map((variant, index) => ({
        ...variant,
        id: `variant-${index + 1}`
      })),
      wellbeingMetrics,
      targetAudience,
      ethicalGuidelines
    };

    onSubmit(testData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <h3 className="text-xl font-semibold mb-4">Create Therapeutic A/B Test</h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Test Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full p-3 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="w-full p-3 border rounded-lg"
              rows={3}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Hypothesis</label>
            <textarea
              value={formData.hypothesis}
              onChange={(e) => setFormData(prev => ({ ...prev, hypothesis: e.target.value }))}
              className="w-full p-3 border rounded-lg"
              rows={2}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Duration (days)</label>
              <input
                type="number"
                value={formData.duration}
                onChange={(e) => setFormData(prev => ({ ...prev, duration: parseInt(e.target.value) }))}
                className="w-full p-3 border rounded-lg"
                min="1"
                max="30"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Traffic Allocation (%)</label>
              <input
                type="number"
                value={formData.trafficAllocation}
                onChange={(e) => setFormData(prev => ({ ...prev, trafficAllocation: parseInt(e.target.value) }))}
                className="w-full p-3 border rounded-lg"
                min="1"
                max="100"
                required
              />
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-medium text-blue-800 mb-2">Ethical Safeguards</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Crisis users are automatically excluded</li>
              <li>• Wellbeing metrics have ethical thresholds</li>
              <li>• Test will auto-stop if negative impact detected</li>
              <li>• Maximum duration limited to 30 days</li>
            </ul>
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Create Test
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

interface TestDetailsPanelProps {
  testId: string;
  onClose: () => void;
}

const TestDetailsPanel: React.FC<TestDetailsPanelProps> = ({ testId, onClose }) => {
  const [testResults, setTestResults] = useState<{
    results: unknown[];
    wellbeingAnalysis: Record<string, unknown>;
    ethicalCompliance: Record<string, unknown>;
    recommendations: string[];
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTestResults = async () => {
      try {
        const results = await therapeuticABTestingService.getTestResults(testId);
        setTestResults(results);
      } catch (error) {
        console.error('Failed to load test results:', error);
      } finally {
        setLoading(false);
      }
    };

    loadTestResults();
  }, [testId]);



  if (loading) {
    return (
      <div className="fixed right-0 top-0 h-full w-96 bg-white shadow-lg p-6">
        <div className="animate-pulse">Loading test details...</div>
      </div>
    );
  }

  return (
    <div className="fixed right-0 top-0 h-full w-96 bg-white shadow-lg p-6 overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Test Results</h3>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          ✕
        </button>
      </div>

      {testResults && (
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium mb-2">Wellbeing Analysis</h4>
            <div className="space-y-2 text-sm">
              <div>Hope Progression: {testResults.wellbeingAnalysis.averageHopeProgression.toFixed(2)}</div>
              <div>Stress Reduction: {testResults.wellbeingAnalysis.averageStressReduction.toFixed(2)}</div>
              <div>Support Utilization: {testResults.wellbeingAnalysis.supportUtilizationRate.toFixed(2)}</div>
              <div>Crisis Prevention: {(testResults.wellbeingAnalysis.crisisPreventionRate * 100).toFixed(1)}%</div>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium mb-2">Ethical Compliance</h4>
            <div className="space-y-2 text-sm">
              <div>Compliance Score: {testResults.ethicalCompliance.complianceScore}%</div>
              <div>Violations: {testResults.ethicalCompliance.ethicalViolations}</div>
              <div>Negative Impacts: {testResults.ethicalCompliance.negativeWellbeingImpacts}</div>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium mb-2">Recommendations</h4>
            <ul className="text-sm space-y-1">
              {testResults.recommendations.map((rec: string, index: number) => (
                <li key={index} className="text-gray-700">• {rec}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default TherapeuticABTestManager;
