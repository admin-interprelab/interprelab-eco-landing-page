import React, { useEffect } from 'react';
import { useTherapeuticMessaging, useTherapeuticComponent } from '../../hooks/useTherapeuticABTest';

/**
 * Demo component showing how to use therapeutic A/B testing
 *
 * This demonstrates wellbeing-focused testing that prioritizes interpreter
 * mental health and professional development over traditional conversion metrics.
 */
export const TherapeuticABTestDemo: React.FC = () => {
  // Example 1: Testing empathetic messaging approaches
  const { variant: heroMessage, recordResult: recordHeroResult } = useTherapeuticMessaging(
    'hero-messaging-test',
    {
      'validation-focused': {
        title: "We See Your Struggles",
        description: "Medical interpreting is incredibly challenging. You're dealing with emotional trauma, technological failures, and financial stress. You're not alone in this.",
        therapeuticApproach: 'validation-focused',
        emotionalTone: 'validating'
      },
      'hope-building': {
        title: "Transform Your Interpreting Career",
        description: "Discover how AI-powered tools can reduce your stress, improve your accuracy, and help you build the career you deserve.",
        therapeuticApproach: 'hope-building',
        emotionalTone: 'hopeful'
      },
      'solution-oriented': {
        title: "AI Tools That Actually Help",
        description: "Get real-time support, reduce cognitive load, and access professional development that fits your budget and schedule.",
        therapeuticApproach: 'solution-oriented',
        emotionalTone: 'practical'
      }
    },
    {
      title: "Professional Interpreting Support",
      description: "Tools and training for medical interpreters",
      therapeuticApproach: 'validation-focused',
      emotionalTone: 'validating'
    }
  );

  // Example 2: Testing different call-to-action approaches
  const { variant: ctaMessage, recordResult: recordCtaResult } = useTherapeuticMessaging(
    'cta-approach-test',
    {
      'empowerment': {
        title: "Invest in Your Professional Future",
        description: "Join thousands of interpreters who've transformed their careers",
        therapeuticApproach: 'solution-oriented',
        emotionalTone: 'empowering'
      },
      'community': {
        title: "You Don't Have to Do This Alone",
        description: "Connect with a supportive community of interpreters",
        therapeuticApproach: 'community-centered',
        emotionalTone: 'validating'
      },
      'hope': {
        title: "Your Career Can Be Different",
        description: "See how AI tools are helping interpreters reduce stress and increase earnings",
        therapeuticApproach: 'hope-building',
        emotionalTone: 'hopeful'
      }
    },
    {
      title: "Get Started Today",
      description: "Try our tools and see the difference",
      therapeuticApproach: 'solution-oriented',
      emotionalTone: 'practical'
    }
  );

  // Example 3: Testing different support resource presentations
  const { variant: SupportComponent, recordResult: recordSupportResult } = useTherapeuticComponent(
    'support-presentation-test',
    {
      'crisis-aware': CrisisAwareSupportSection,
      'community-focused': CommunityFocusedSupportSection,
      'resource-rich': ResourceRichSupportSection
    },
    DefaultSupportSection
  );

  // Record results when user engages with content
  const handleHeroEngagement = async () => {
    await recordHeroResult();
  };

  const handleCtaClick = async () => {
    await recordCtaResult();
  };

  const handleSupportAccess = async () => {
    await recordSupportResult();
  };

  return (
    <div className="therapeutic-ab-test-demo">
      {/* Hero Section with A/B Tested Messaging */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1
            className="text-4xl font-bold mb-4"
            onClick={handleHeroEngagement}
          >
            {heroMessage.title}
          </h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            {heroMessage.description}
          </p>
          <div className="text-sm opacity-75 mb-4">
            Therapeutic Approach: {heroMessage.therapeuticApproach} |
            Emotional Tone: {heroMessage.emotionalTone}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold mb-4">AI-Powered Interpreter Support</h2>
              <p className="text-gray-600 mb-6">
                Our tools are designed specifically for the unique challenges medical interpreters face:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Real-time terminology support to reduce cognitive load
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Stress-aware session management
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Professional development that fits your schedule
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Community support from fellow interpreters
                </li>
              </ul>
            </div>
            <div>
              <SupportComponent onAccess={handleSupportAccess} />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section with A/B Tested Messaging */}
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">{ctaMessage.title}</h2>
          <p className="text-xl text-gray-600 mb-8">{ctaMessage.description}</p>
          <button
            onClick={handleCtaClick}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Start Your Journey
          </button>
          <div className="text-sm text-gray-500 mt-4">
            Therapeutic Approach: {ctaMessage.therapeuticApproach} |
            Emotional Tone: {ctaMessage.emotionalTone}
          </div>
        </div>
      </section>

      {/* Test Information Panel */}
      <TestInfoPanel />
    </div>
  );
};

// Different support section variants for A/B testing
const CrisisAwareSupportSection: React.FC<{ onAccess: () => void }> = ({ onAccess }) => (
  <div className="bg-red-50 border border-red-200 rounded-lg p-6" onClick={onAccess}>
    <h3 className="text-lg font-semibold text-red-800 mb-3">Need Immediate Support?</h3>
    <p className="text-red-700 mb-4">
      If you're experiencing burnout, financial stress, or emotional overwhelm, you're not alone.
    </p>
    <div className="space-y-2">
      <button className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700">
        Crisis Support Resources
      </button>
      <button className="w-full bg-red-100 text-red-800 py-2 rounded hover:bg-red-200">
        Connect with Peer Support
      </button>
    </div>
  </div>
);

const CommunityFocusedSupportSection: React.FC<{ onAccess: () => void }> = ({ onAccess }) => (
  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6" onClick={onAccess}>
    <h3 className="text-lg font-semibold text-blue-800 mb-3">Join Our Community</h3>
    <p className="text-blue-700 mb-4">
      Connect with interpreters who understand your challenges and celebrate your successes.
    </p>
    <div className="space-y-2">
      <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
        Join Interpreter Community
      </button>
      <button className="w-full bg-blue-100 text-blue-800 py-2 rounded hover:bg-blue-200">
        Share Your Story
      </button>
    </div>
  </div>
);

const ResourceRichSupportSection: React.FC<{ onAccess: () => void }> = ({ onAccess }) => (
  <div className="bg-green-50 border border-green-200 rounded-lg p-6" onClick={onAccess}>
    <h3 className="text-lg font-semibold text-green-800 mb-3">Professional Resources</h3>
    <p className="text-green-700 mb-4">
      Access comprehensive tools and training designed for your professional growth.
    </p>
    <div className="grid grid-cols-2 gap-2">
      <button
        className="bg-green-600 text-white py-2 rounded hover:bg-green-700 text-sm"
        onClick={onAccess}
      >
        AI Tools
      </button>
      <button
        className="bg-green-600 text-white py-2 rounded hover:bg-green-700 text-sm"
        onClick={onAccess}
      >
        Training
      </button>
      <button
        className="bg-green-100 text-green-800 py-2 rounded hover:bg-green-200 text-sm"
        onClick={onAccess}
      >
        Resources
      </button>
      <button
        className="bg-green-100 text-green-800 py-2 rounded hover:bg-green-200 text-sm"
        onClick={onAccess}
      >
        Support
      </button>
    </div>
  </div>
);

const DefaultSupportSection: React.FC<{ onAccess: () => void }> = ({ onAccess }) => (
  <div className="bg-gray-50 border border-gray-200 rounded-lg p-6" onClick={onAccess}>
    <h3 className="text-lg font-semibold text-gray-800 mb-3">Get Support</h3>
    <p className="text-gray-600 mb-4">
      Access tools and resources for professional interpreters.
    </p>
    <button className="w-full bg-gray-600 text-white py-2 rounded hover:bg-gray-700">
      Learn More
    </button>
  </div>
);

// Information panel showing current test details
const TestInfoPanel: React.FC = () => (
  <div className="fixed bottom-4 right-4 bg-white border border-gray-300 rounded-lg p-4 shadow-lg max-w-sm">
    <h4 className="font-semibold text-gray-800 mb-2">Active A/B Tests</h4>
    <div className="text-sm text-gray-600 space-y-1">
      <div>• Hero messaging approach</div>
      <div>• CTA therapeutic tone</div>
      <div>• Support section presentation</div>
    </div>
    <div className="mt-3 text-xs text-gray-500">
      All tests prioritize interpreter wellbeing and exclude users in crisis.
    </div>
  </div>
);

export default TherapeuticABTestDemo;
