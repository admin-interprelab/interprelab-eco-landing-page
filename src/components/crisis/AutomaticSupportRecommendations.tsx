import React, { useEffect, useState, useCallback } from 'react';
import { Heart, Users, BookOpen, MessageSquare, X, ChevronRight } from 'lucide-react';
import { useTherapeuticAnalyticsContext } from '../../contexts/TherapeuticAnalyticsContext';
import { EmotionalState, PainPoint } from '../../types/navigation';

interface AutomaticSupportRecommendationsProps {
  enabled?: boolean;
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  className?: string;
}

export function AutomaticSupportRecommendations({
  enabled = true,
  position = 'bottom-right',
  className = ''
}: AutomaticSupportRecommendationsProps) {
  const {
    currentEmotionalState,
    exploredPainPoints,
    currentHopeLevel,
    isTracking,
    privacyConsent,
    trackHopeIndicator
  } = useTherapeuticAnalyticsContext();

  const [recommendations, setRecommendations] = useState<SupportRecommendation[]>([]);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [dismissedRecommendations, setDismissedRecommendations] = useState<Set<string>>(new Set());

  // Generate recommendations based on emotional state and pain points
  useEffect(() => {
    if (!enabled || !isTracking || !privacyConsent?.emotionalTrackingConsent) return;

    const newRecommendations = generateRecommendations(
      currentEmotionalState,
      exploredPainPoints,
      currentHopeLevel
    );

    // Filter out dismissed recommendations
    const filteredRecommendations = newRecommendations.filter(
      rec => !dismissedRecommendations.has(rec.id)
    );

    setRecommendations(filteredRecommendations);
    setShowRecommendations(filteredRecommendations.length > 0);
  }, [
    enabled,
    isTracking,
    privacyConsent,
    currentEmotionalState,
    exploredPainPoints,
    currentHopeLevel,
    dismissedRecommendations
  ]);

  const handleRecommendationClick = useCallback((recommendation: SupportRecommendation) => {
    // Track hope indicator for engaging with recommendation
    trackHopeIndicator({
      type: 'support-resource-engagement',
      timestamp: new Date(),
      intensity: recommendation.hopeImpact,
      context: `Engaged with automatic recommendation: ${recommendation.title}`,
      content: recommendation.id
    } as any);

    // Navigate to recommendation
    if (recommendation.href.startsWith('http')) {
      window.open(recommendation.href, '_blank');
    } else {
      window.location.href = recommendation.href;
    }
  }, [trackHopeIndicator]);

  const handleDismiss = useCallback((recommendationId?: string) => {
    if (recommendationId) {
      setDismissedRecommendations(prev => new Set([...prev, recommendationId]));
      setRecommendations(prev => prev.filter(rec => rec.id !== recommendationId));
    } else {
      setShowRecommendations(false);
    }
  }, []);

  const getPositionClasses = () => {
    switch (position) {
      case 'bottom-left':
        return 'bottom-4 left-4';
      case 'top-right':
        return 'top-4 right-4';
      case 'top-left':
        return 'top-4 left-4';
      default:
        return 'bottom-4 right-4';
    }
  };

  if (!enabled || !showRecommendations || recommendations.length === 0) {
    return null;
  }

  return (
    <div className={`fixed ${getPositionClasses()} z-40 max-w-sm ${className}`}>
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Heart className="h-5 w-5" />
              <h3 className="font-semibold">Support for You</h3>
            </div>
            <button
              onClick={() => handleDismiss()}
              className="text-white hover:text-gray-200 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <p className="text-sm text-blue-100 mt-1">
            Based on your current needs
          </p>
        </div>

        {/* Recommendations */}
        <div className="max-h-96 overflow-y-auto">
          {recommendations.slice(0, 3).map((recommendation) => (
            <RecommendationCard
              key={recommendation.id}
              recommendation={recommendation}
              onClick={() => handleRecommendationClick(recommendation)}
              onDismiss={() => handleDismiss(recommendation.id)}
            />
          ))}
        </div>

        {/* Footer */}
        {recommendations.length > 3 && (
          <div className="bg-gray-50 px-4 py-2 text-center">
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              View {recommendations.length - 3} more recommendations
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

interface SupportRecommendation {
  id: string;
  title: string;
  description: string;
  type: 'community' | 'resource' | 'story' | 'tool' | 'professional';
  urgency: 'low' | 'medium' | 'high';
  hopeImpact: number; // 1-10 scale
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  reason: string;
  estimatedTime: string;
}

interface RecommendationCardProps {
  recommendation: SupportRecommendation;
  onClick: () => void;
  onDismiss: () => void;
}

function RecommendationCard({ recommendation, onClick, onDismiss }: RecommendationCardProps) {
  const { icon: Icon } = recommendation;

  const getUrgencyStyles = () => {
    switch (recommendation.urgency) {
      case 'high':
        return 'border-l-red-400 bg-red-50';
      case 'medium':
        return 'border-l-orange-400 bg-orange-50';
      default:
        return 'border-l-blue-400 bg-blue-50';
    }
  };

  const getTypeColor = () => {
    switch (recommendation.type) {
      case 'community':
        return 'text-green-600';
      case 'professional':
        return 'text-purple-600';
      case 'story':
        return 'text-orange-600';
      case 'tool':
        return 'text-blue-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className={`border-l-4 ${getUrgencyStyles()} p-4 hover:bg-gray-50 transition-colors cursor-pointer`}>
      <div className="flex items-start justify-between">
        <div className="flex-1" onClick={onClick}>
          <div className="flex items-center space-x-2 mb-2">
            <Icon className={`h-4 w-4 ${getTypeColor()}`} />
            <h4 className="font-semibold text-gray-900 text-sm">{recommendation.title}</h4>
            <ChevronRight className="h-3 w-3 text-gray-400" />
          </div>
          <p className="text-xs text-gray-600 mb-2">{recommendation.description}</p>
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-500">{recommendation.reason}</span>
            <span className="text-gray-400">{recommendation.estimatedTime}</span>
          </div>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDismiss();
          }}
          className="text-gray-400 hover:text-gray-600 transition-colors ml-2"
        >
          <X className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
}

// Recommendation generation logic
function generateRecommendations(
  emotionalState: EmotionalState | null,
  painPoints: PainPoint[],
  hopeLevel: number
): SupportRecommendation[] {
  const recommendations: SupportRecommendation[] = [];

  if (!emotionalState) return recommendations;

  // High stress recommendations
  if (emotionalState.stressLevel === 'high' || emotionalState.stressLevel === 'crisis') {
    recommendations.push({
      id: 'crisis-support',
      title: 'Immediate Support Available',
      description: 'Connect with crisis support resources right now',
      type: 'professional',
      urgency: 'high',
      hopeImpact: 8,
      href: '/crisis-support',
      icon: Heart,
      reason: 'High stress detected',
      estimatedTime: 'Available now'
    });

    recommendations.push({
      id: 'peer-crisis-support',
      title: 'Interpreter Crisis Network',
      description: 'Talk to interpreters who understand your situation',
      type: 'community',
      urgency: 'high',
      hopeImpact: 7,
      href: '/community/crisis-support',
      icon: Users,
      reason: 'Peer support for crisis',
      estimatedTime: '5 min'
    });
  }

  // Financial stress recommendations
  const hasFinancialStress = painPoints.some(pp => pp.type === 'financial');
  if (hasFinancialStress) {
    recommendations.push({
      id: 'financial-resources',
      title: 'Financial Support for Interpreters',
      description: 'Grants, assistance programs, and financial planning resources',
      type: 'resource',
      urgency: 'medium',
      hopeImpact: 6,
      href: '/resources/financial-support',
      icon: BookOpen,
      reason: 'Financial concerns identified',
      estimatedTime: '10 min'
    });
  }

  // Professional development recommendations
  const hasProfessionalConcerns = painPoints.some(pp => pp.type === 'professional-development');
  if (hasProfessionalConcerns) {
    recommendations.push({
      id: 'skill-development',
      title: 'AI-Powered Skill Building',
      description: 'Personalized training to advance your career',
      type: 'tool',
      urgency: 'medium',
      hopeImpact: 7,
      href: '/tools/interpreStudy',
      icon: BookOpen,
      reason: 'Career development needs',
      estimatedTime: '15 min'
    });
  }

  // Isolation recommendations
  const hasIsolation = painPoints.some(pp => pp.type === 'isolation');
  if (hasIsolation || emotionalState.supportNeeds.includes('community')) {
    recommendations.push({
      id: 'interpreter-community',
      title: 'Join Interpreter Community',
      description: 'Connect with interpreters who share your experiences',
      type: 'community',
      urgency: 'medium',
      hopeImpact: 6,
      href: '/community',
      icon: Users,
      reason: 'Combat isolation',
      estimatedTime: '5 min'
    });
  }

  // Low hope recommendations
  if (hopeLevel < 4) {
    recommendations.push({
      id: 'success-stories',
      title: 'Inspiring Success Stories',
      description: 'Read how other interpreters overcame similar challenges',
      type: 'story',
      urgency: 'medium',
      hopeImpact: 8,
      href: '/success-stories',
      icon: Heart,
      reason: 'Boost hope and inspiration',
      estimatedTime: '8 min'
    });
  }

  // Technology frustration recommendations
  const hasTechFrustration = painPoints.some(pp => pp.type === 'technological');
  if (hasTechFrustration) {
    recommendations.push({
      id: 'ai-assistance',
      title: 'AI-Powered Interpretation Help',
      description: 'Get real-time support during your sessions',
      type: 'tool',
      urgency: 'medium',
      hopeImpact: 7,
      href: '/tools/interpreCoach',
      icon: MessageSquare,
      reason: 'Technology support needed',
      estimatedTime: '3 min setup'
    });
  }

  // Psychological support recommendations
  const hasPsychologicalConcerns = painPoints.some(pp => pp.type === 'psychological');
  if (hasPsychologicalConcerns || emotionalState.supportNeeds.includes('emotional')) {
    recommendations.push({
      id: 'mental-health-resources',
      title: 'Mental Health Support',
      description: 'Professional resources for interpreter-specific challenges',
      type: 'professional',
      urgency: 'medium',
      hopeImpact: 7,
      href: '/resources/mental-health',
      icon: Heart,
      reason: 'Emotional support needed',
      estimatedTime: '12 min'
    });
  }

  // Sort by urgency and hope impact
  return recommendations.sort((a, b) => {
    const urgencyWeight = { high: 3, medium: 2, low: 1 };
    const urgencyDiff = urgencyWeight[b.urgency] - urgencyWeight[a.urgency];
    if (urgencyDiff !== 0) return urgencyDiff;
    return b.hopeImpact - a.hopeImpact;
  });
}

export default AutomaticSupportRecommendations;
