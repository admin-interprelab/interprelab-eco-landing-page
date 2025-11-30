import React, { useEffect, useState, useCallback } from 'react';
import { AlertTriangle, Phone, MessageCircle, Users, Heart, ExternalLink } from 'lucide-react';
import { useTherapeuticAnalyticsContext } from '../../contexts/TherapeuticAnalyticsContext';
import { CrisisDetectionResult, CrisisResponse } from '../../types/therapeutic-analytics';

interface CrisisDetectionSystemProps {
  enabled?: boolean;
  autoShow?: boolean;
  className?: string;
}

export function CrisisDetectionSystem({
  enabled = true,
  autoShow = true,
  className = ''
}: CrisisDetectionSystemProps) {
  const {
    crisisDetected,
    session,
    accessCrisisSupport,
    privacyConsent
  } = useTherapeuticAnalyticsContext();

  const [showCrisisSupport, setShowCrisisSupport] = useState(false);
  const [crisisLevel, setCrisisLevel] = useState<'moderate' | 'high' | 'crisis'>('moderate');
  const [supportAccessed, setSupportAccessed] = useState(false);

  // Monitor crisis detection
  useEffect(() => {
    if (!enabled || !privacyConsent?.crisisInterventionConsent) return;

    if (crisisDetected && autoShow) {
      // Determine crisis level from session data
      const highestSeverity = session?.stressIndicators
        .filter(indicator => Date.now() - indicator.timestamp.getTime() < 300000) // Last 5 minutes
        .reduce((highest, indicator) => {
          const severityLevels = { low: 1, moderate: 2, high: 3, crisis: 4 };
          const currentLevel = severityLevels[indicator.severity];
          const highestLevel = severityLevels[highest];
          return currentLevel > highestLevel ? indicator.severity : highest;
        }, 'moderate' as any);

      setCrisisLevel(highestSeverity || 'moderate');
      setShowCrisisSupport(true);
    }
  }, [crisisDetected, enabled, autoShow, privacyConsent, session]);

  const handleSupportAccess = useCallback((resourceType: string, duration: number = 0) => {
    accessCrisisSupport(resourceType, duration);
    setSupportAccessed(true);
  }, [accessCrisisSupport]);

  const handleDismiss = useCallback(() => {
    setShowCrisisSupport(false);
    // Track that user dismissed crisis support
    handleSupportAccess('crisis-support-dismissed', 0);
  }, [handleSupportAccess]);

  if (!enabled || !privacyConsent?.crisisInterventionConsent || !showCrisisSupport) {
    return null;
  }

  return (
    <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 ${className}`}>
      <div className="bg-white rounded-lg max-w-md w-full shadow-2xl">
        <CrisisSupport
          level={crisisLevel}
          onSupportAccess={handleSupportAccess}
          onDismiss={handleDismiss}
          supportAccessed={supportAccessed}
        />
      </div>
    </div>
  );
}

interface CrisisSupportProps {
  level: 'moderate' | 'high' | 'crisis';
  onSupportAccess: (resourceType: string, duration?: number) => void;
  onDismiss: () => void;
  supportAccessed: boolean;
}

function CrisisSupport({ level, onSupportAccess, onDismiss, supportAccessed }: CrisisSupportProps) {
  const getMessageForLevel = () => {
    switch (level) {
      case 'crisis':
        return {
          title: "We're Here for You",
          message: "We notice you may be experiencing significant distress. You're not alone, and immediate support is available.",
          urgency: "high",
          color: "red"
        };
      case 'high':
        return {
          title: "Support is Available",
          message: "It seems like you might be going through a challenging time. We have resources that can help.",
          urgency: "medium",
          color: "orange"
        };
      default:
        return {
          title: "We're Here to Help",
          message: "We noticed you might benefit from some additional support. Our community and resources are here for you.",
          urgency: "low",
          color: "blue"
        };
    }
  };

  const { title, message, urgency, color } = getMessageForLevel();

  const crisisResources = [
    {
      type: 'emergency',
      title: 'Emergency Support',
      description: 'If you\'re in immediate danger',
      action: 'Call 988 (Suicide & Crisis Lifeline)',
      icon: Phone,
      href: 'tel:988',
      priority: 'critical',
      show: level === 'crisis'
    },
    {
      type: 'crisis-text',
      title: 'Crisis Text Line',
      description: 'Text with a trained counselor',
      action: 'Text HOME to 741741',
      icon: MessageCircle,
      href: 'sms:741741?body=HOME',
      priority: 'high',
      show: level === 'crisis' || level === 'high'
    },
    {
      type: 'peer-support',
      title: 'Interpreter Community',
      description: 'Connect with fellow interpreters',
      action: 'Join Support Group',
      icon: Users,
      href: '/community/support',
      priority: 'medium',
      show: true
    },
    {
      type: 'professional-help',
      title: 'Professional Resources',
      description: 'Mental health professionals who understand interpreters',
      action: 'Find Therapists',
      icon: Heart,
      href: '/resources/mental-health',
      priority: 'medium',
      show: true
    }
  ];

  const visibleResources = crisisResources.filter(resource => resource.show);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="text-center mb-6">
        <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
          color === 'red' ? 'bg-red-100' :
          color === 'orange' ? 'bg-orange-100' :
          'bg-blue-100'
        }`}>
          <AlertTriangle className={`h-8 w-8 ${
            color === 'red' ? 'text-red-600' :
            color === 'orange' ? 'text-orange-600' :
            'text-blue-600'
          }`} />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
        <p className="text-gray-600 leading-relaxed">{message}</p>
      </div>

      {/* Support Resources */}
      <div className="space-y-3 mb-6">
        {visibleResources.map((resource) => (
          <SupportResourceCard
            key={resource.type}
            resource={resource}
            onAccess={() => onSupportAccess(resource.type)}
            urgency={urgency}
          />
        ))}
      </div>

      {/* Reassurance Message */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
        <div className="flex items-start space-x-3">
          <Heart className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-green-900 mb-1">You're Not Alone</h3>
            <p className="text-sm text-green-700">
              Many interpreters face similar challenges. Seeking support is a sign of strength,
              not weakness. Our community understands what you're going through.
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-3">
        {!supportAccessed && (
          <button
            onClick={() => onSupportAccess('peer-community')}
            className={`flex-1 px-4 py-3 rounded-lg font-semibold text-white transition-colors ${
              color === 'red' ? 'bg-red-600 hover:bg-red-700' :
              color === 'orange' ? 'bg-orange-600 hover:bg-orange-700' :
              'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            Connect with Community
          </button>
        )}
        <button
          onClick={onDismiss}
          className="px-4 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
        >
          {supportAccessed ? 'Close' : 'Not Now'}
        </button>
      </div>

      {/* Follow-up Message */}
      {supportAccessed && (
        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-700 text-center">
            Thank you for taking care of yourself. We'll check in with you again soon.
          </p>
        </div>
      )}
    </div>
  );
}

interface SupportResourceCardProps {
  resource: {
    type: string;
    title: string;
    description: string;
    action: string;
    icon: React.ComponentType<{ className?: string }>;
    href: string;
    priority: string;
  };
  onAccess: () => void;
  urgency: string;
}

function SupportResourceCard({ resource, onAccess, urgency }: SupportResourceCardProps) {
  const { icon: Icon } = resource;

  const handleClick = () => {
    onAccess();

    // Open external link if it's a phone number, SMS, or external URL
    if (resource.href.startsWith('tel:') || resource.href.startsWith('sms:') || resource.href.startsWith('http')) {
      window.open(resource.href, '_blank');
    } else {
      // Internal navigation would be handled by router
      window.location.href = resource.href;
    }
  };

  const getPriorityStyles = () => {
    switch (resource.priority) {
      case 'critical':
        return 'border-red-300 bg-red-50 hover:bg-red-100';
      case 'high':
        return 'border-orange-300 bg-orange-50 hover:bg-orange-100';
      default:
        return 'border-gray-300 bg-white hover:bg-gray-50';
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`w-full p-4 border rounded-lg text-left transition-colors ${getPriorityStyles()}`}
    >
      <div className="flex items-start space-x-3">
        <div className={`p-2 rounded-lg ${
          resource.priority === 'critical' ? 'bg-red-100' :
          resource.priority === 'high' ? 'bg-orange-100' :
          'bg-gray-100'
        }`}>
          <Icon className={`h-5 w-5 ${
            resource.priority === 'critical' ? 'text-red-600' :
            resource.priority === 'high' ? 'text-orange-600' :
            'text-gray-600'
          }`} />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-900">{resource.title}</h3>
            <ExternalLink className="h-4 w-4 text-gray-400" />
          </div>
          <p className="text-sm text-gray-600 mt-1">{resource.description}</p>
          <p className={`text-sm font-medium mt-2 ${
            resource.priority === 'critical' ? 'text-red-700' :
            resource.priority === 'high' ? 'text-orange-700' :
            'text-blue-700'
          }`}>
            {resource.action}
          </p>
        </div>
      </div>
    </button>
  );
}

export default CrisisDetectionSystem;
