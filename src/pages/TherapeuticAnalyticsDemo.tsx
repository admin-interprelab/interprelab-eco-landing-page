import React, { useState } from 'react';
import {
  TherapeuticABTestManager,
  TherapeuticABTestDemo,
  WellbeingAnalyticsDashboard
} from '../components/analytics';
import { TherapeuticABTest } from '../types/therapeutic-analytics';

/**
 * Demo page showcasing therapeutic A/B testing capabilities
 *
 * This page demonstrates how InterpreLab implements wellbeing-focused
 * A/B testing that prioritizes interpreter mental health and professional
 * development over traditional conversion metrics.
 */
export const TherapeuticAnalyticsDemo: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'demo' | 'manager' | 'dashboard'>('demo');
  const [notification, setNotification] = useState<string | null>(null);

  const handleTestCreated = (test: TherapeuticABTest) => {
    setNotification(`Test "${test.name}" created successfully with ethical safeguards`);
    setTimeout(() => setNotification(null), 5000);
  };

  const handleTestStarted = (testId: string) => {
    setNotification(`Test ${testId} started with wellbeing monitoring active`);
    setTimeout(() => setNotification(null), 5000);
  };

  const handleTestStopped = (testId: string, reason: string) => {
    setNotification(`Test ${testId} stopped: ${reason}`);
    setTimeout(() => setNotification(null), 5000);
  };

  return (
    <div className="therapeutic-analytics-demo min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                Therapeutic A/B Testing Platform
              </h1>
              <p className="text-gray-600 mt-2">
                Wellbeing-focused testing that prioritizes interpreter mental health
              </p>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <div className="text-sm text-blue-800 font-medium">Ethical Guidelines Active</div>
              <div className="text-xs text-blue-600">Crisis users excluded • Wellbeing monitored</div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex space-x-8">
            {[
              { id: 'demo', label: 'Live Demo', description: 'See A/B testing in action' },
              { id: 'manager', label: 'Test Manager', description: 'Create and manage tests' },
              { id: 'dashboard', label: 'Analytics', description: 'Wellbeing metrics dashboard' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-4 px-2 border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <div className="font-medium">{tab.label}</div>
                <div className="text-xs">{tab.description}</div>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Notification */}
      {notification && (
        <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 mx-4 mt-4 rounded-lg">
          <div className="flex items-center">
            <span className="mr-2">✓</span>
            {notification}
          </div>
        </div>
      )}

      {/* Content */}
      <main className="container mx-auto px-4 py-8">
        {activeTab === 'demo' && (
          <div>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Therapeutic A/B Testing in Action
              </h2>
              <p className="text-gray-600 mb-6">
                This demo shows how we test different approaches to supporting interpreters
                while ensuring their wellbeing is never compromised. Each test variant is
                designed with therapeutic principles in mind.
              </p>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-yellow-800 mb-2">Key Principles</h3>
                <ul className="text-sm text-yellow-700 space-y-1">
                  <li>• Users in crisis are automatically excluded from all tests</li>
                  <li>• All variants must meet ethical wellbeing thresholds</li>
                  <li>• Tests automatically stop if negative impact is detected</li>
                  <li>• Success is measured by hope progression and stress reduction</li>
                </ul>
              </div>
            </div>
            <TherapeuticABTestDemo />
          </div>
        )}

        {activeTab === 'manager' && (
          <div>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Test Management Console
              </h2>
              <p className="text-gray-600 mb-6">
                Create and manage therapeutic A/B tests with built-in ethical safeguards.
                All tests are designed to support interpreter wellbeing and professional development.
              </p>
            </div>
            <TherapeuticABTestManager
              onTestCreated={handleTestCreated}
              onTestStarted={handleTestStarted}
              onTestStopped={handleTestStopped}
            />
          </div>
        )}

        {activeTab === 'dashboard' && (
          <div>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Wellbeing Analytics Dashboard
              </h2>
              <p className="text-gray-600 mb-6">
                Monitor the impact of our tests on interpreter wellbeing. Unlike traditional
                A/B testing dashboards, we focus on hope progression, stress reduction, and
                crisis prevention rather than just conversion metrics.
              </p>
            </div>
            <WellbeingAnalyticsDashboard />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-semibold text-gray-800 mb-3">Ethical A/B Testing</h3>
              <p className="text-sm text-gray-600">
                Our testing framework prioritizes interpreter wellbeing over traditional
                business metrics, ensuring that every test contributes to professional
                empowerment and mental health support.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-3">Wellbeing Metrics</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Hope progression tracking</li>
                <li>• Stress reduction measurement</li>
                <li>• Crisis prevention monitoring</li>
                <li>• Support utilization analysis</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-3">Safeguards</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Automatic crisis user exclusion</li>
                <li>• Real-time wellbeing monitoring</li>
                <li>• Ethical threshold enforcement</li>
                <li>• Immediate test termination if harmful</li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-sm text-gray-500">
            <p>
              Therapeutic A/B Testing Platform - Designed with interpreter wellbeing as the primary concern
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TherapeuticAnalyticsDemo;
