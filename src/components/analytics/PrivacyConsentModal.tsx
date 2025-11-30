import React, { useState } from 'react';
import { X, Shield, Heart, Users, AlertTriangle } from 'lucide-react';
import { PrivacyConsent } from '../../types/therapeutic-analytics';

interface PrivacyConsentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConsent: (consent: PrivacyConsent) => void;
  initialConsent?: Partial<PrivacyConsent>;
}

export function PrivacyConsentModal({
  isOpen,
  onClose,
  onConsent,
  initialConsent = {}
}: PrivacyConsentModalProps) {
  const [consent, setConsent] = useState<Partial<PrivacyConsent>>({
    analyticsConsent: initialConsent.analyticsConsent ?? false,
    emotionalTrackingConsent: initialConsent.emotionalTrackingConsent ?? false,
    crisisInterventionConsent: initialConsent.crisisInterventionConsent ?? false,
    peerSupportConsent: initialConsent.peerSupportConsent ?? false,
    ...initialConsent
  });

  const handleConsentChange = (key: keyof PrivacyConsent, value: boolean) => {
    setConsent(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    const fullConsent: PrivacyConsent = {
      analyticsConsent: consent.analyticsConsent ?? false,
      emotionalTrackingConsent: consent.emotionalTrackingConsent ?? false,
      crisisInterventionConsent: consent.crisisInterventionConsent ?? false,
      peerSupportConsent: consent.peerSupportConsent ?? false,
      consentTimestamp: new Date(),
      consentVersion: '1.0'
    };

    onConsent(fullConsent);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <Shield className="h-6 w-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">
                Your Privacy & Wellbeing
              </h2>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Introduction */}
          <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-gray-700 leading-relaxed">
              InterpreLab is designed to support your professional and emotional wellbeing.
              To provide the most effective therapeutic experience, we'd like your permission
              to track certain aspects of your journey. All data is encrypted, anonymized,
              and used solely to improve your experience and provide crisis support when needed.
            </p>
          </div>

          {/* Consent Options */}
          <div className="space-y-6">
            {/* Analytics Consent */}
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="analyticsConsent"
                  checked={consent.analyticsConsent}
                  onChange={(e) => handleConsentChange('analyticsConsent', e.target.checked)}
                  className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <div className="flex-1">
                  <label htmlFor="analyticsConsent" className="flex items-center space-x-2 cursor-pointer">
                    <Shield className="h-5 w-5 text-gray-600" />
                    <span className="font-semibold text-gray-900">Basic Analytics</span>
                  </label>
                  <p className="text-sm text-gray-600 mt-1">
                    Track page views, time spent, and basic interactions to improve the platform.
                    This data is anonymized and helps us understand which features are most helpful.
                  </p>
                  <div className="mt-2 text-xs text-gray-500">
                    <strong>Data collected:</strong> Page views, click patterns, session duration
                  </div>
                </div>
              </div>
            </div>

            {/* Emotional Tracking Consent */}
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="emotionalTrackingConsent"
                  checked={consent.emotionalTrackingConsent}
                  onChange={(e) => handleConsentChange('emotionalTrackingConsent', e.target.checked)}
                  className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <div className="flex-1">
                  <label htmlFor="emotionalTrackingConsent" className="flex items-center space-x-2 cursor-pointer">
                    <Heart className="h-5 w-5 text-red-500" />
                    <span className="font-semibold text-gray-900">Emotional Journey Tracking</span>
                  </label>
                  <p className="text-sm text-gray-600 mt-1">
                    Track your emotional journey from struggle to empowerment. This helps us
                    personalize content and measure the therapeutic effectiveness of our approach.
                  </p>
                  <div className="mt-2 text-xs text-gray-500">
                    <strong>Data collected:</strong> Hope indicators, stress levels, journey stage progression
                  </div>
                  <div className="mt-2 p-2 bg-green-50 rounded text-xs text-green-700">
                    <strong>Benefit:</strong> Personalized content recommendations and progress tracking
                  </div>
                </div>
              </div>
            </div>

            {/* Crisis Intervention Consent */}
            <div className="border border-orange-200 rounded-lg p-4 bg-orange-50">
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="crisisInterventionConsent"
                  checked={consent.crisisInterventionConsent}
                  onChange={(e) => handleConsentChange('crisisInterventionConsent', e.target.checked)}
                  className="mt-1 h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                />
                <div className="flex-1">
                  <label htmlFor="crisisInterventionConsent" className="flex items-center space-x-2 cursor-pointer">
                    <AlertTriangle className="h-5 w-5 text-orange-600" />
                    <span className="font-semibold text-gray-900">Crisis Detection & Support</span>
                    <span className="text-xs bg-orange-200 text-orange-800 px-2 py-1 rounded-full">
                      Recommended
                    </span>
                  </label>
                  <p className="text-sm text-gray-600 mt-1">
                    Allow us to detect signs of distress and automatically offer support resources.
                    This can help prevent crisis situations and connect you with help when needed.
                  </p>
                  <div className="mt-2 text-xs text-gray-500">
                    <strong>Data collected:</strong> Stress indicators, rapid navigation patterns, crisis-related searches
                  </div>
                  <div className="mt-2 p-2 bg-orange-100 rounded text-xs text-orange-700">
                    <strong>Important:</strong> This helps us provide immediate support when you might be in distress
                  </div>
                </div>
              </div>
            </div>

            {/* Peer Support Consent */}
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="peerSupportConsent"
                  checked={consent.peerSupportConsent}
                  onChange={(e) => handleConsentChange('peerSupportConsent', e.target.checked)}
                  className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <div className="flex-1">
                  <label htmlFor="peerSupportConsent" className="flex items-center space-x-2 cursor-pointer">
                    <Users className="h-5 w-5 text-green-600" />
                    <span className="font-semibold text-gray-900">Peer Support Matching</span>
                  </label>
                  <p className="text-sm text-gray-600 mt-1">
                    Allow us to connect you with other interpreters who have similar experiences
                    and challenges. This enables peer support and community building.
                  </p>
                  <div className="mt-2 text-xs text-gray-500">
                    <strong>Data collected:</strong> Professional challenges, experience level, support preferences
                  </div>
                  <div className="mt-2 p-2 bg-green-50 rounded text-xs text-green-700">
                    <strong>Benefit:</strong> Connect with interpreters who understand your specific challenges
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Privacy Assurance */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Your Privacy is Protected</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• All data is encrypted and stored securely</li>
              <li>• Personal information is anonymized after 7 days</li>
              <li>• You can withdraw consent at any time</li>
              <li>• Data is never sold or shared with third parties</li>
              <li>• You can request data export or deletion</li>
              <li>• Compliant with GDPR, CCPA, and healthcare privacy standards</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4 mt-6">
            <button
              onClick={handleSubmit}
              className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Save Preferences
            </button>
            <button
              onClick={onClose}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>

          {/* Additional Info */}
          <div className="mt-4 text-xs text-gray-500 text-center">
            You can change these preferences at any time in your account settings.
            <br />
            For questions about privacy, contact us at privacy@interprelab.com
          </div>
        </div>
      </div>
    </div>
  );
}

export default PrivacyConsentModal;
