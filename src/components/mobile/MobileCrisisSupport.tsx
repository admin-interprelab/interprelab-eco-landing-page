import React, { useState, useEffect, useCallback } from 'react';
import { Phone, MessageCircle, Users, Heart, Shield, ExternalLink, ChevronRight, Clock, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useTherapeuticAnalyticsContext } from '@/contexts/TherapeuticAnalyticsContext';
import { SupportResource } from '@/types/navigation';

interface MobileCrisisSupportProps {
  className?: string;
  alwaysVisible?: boolean;
  urgencyLevel?: 'low' | 'moderate' | 'high' | 'crisis';
}

export function MobileCrisisSupport({
  className = '',
  alwaysVisible = true,
  urgencyLevel = 'moderate'
}: MobileCrisisSupportProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'crisis' | 'peer' | 'calm'>('crisis');
  const [connecting, setConnecting] = useState(false);

  const {
    crisisDetected,
    currentEmotionalState,
    accessCrisisSupport,
    privacyConsent
  } = useTherapeuticAnalyticsContext();

  // Auto-open if crisis detected
  useEffect(() => {
    if (crisisDetected && privacyConsent?.crisisInterventionConsent) {
      setIsOpen(true);
      setActiveTab('crisis');
    }
  }, [crisisDetected, privacyConsent]);

  const handleResourceAccess = useCallback((resourceType: string, href?: string) => {
    accessCrisisSupport(resourceType, 0);

    if (href) {
      if (href.startsWith('tel:') || href.startsWith('sms:')) {
        window.location.href = href;
      } else if (href.startsWith('http')) {
        window.open(href, '_blank');
      } else {
        // Internal navigation
        window.location.href = href;
      }
    }
  }, [accessCrisisSupport]);

  const getUrgencyStyles = () => {
    switch (urgencyLevel) {
      case 'crisis':
        return 'bg-red-600 hover:bg-red-700 text-white animate-pulse';
      case 'high':
        return 'bg-orange-600 hover:bg-orange-700 text-white';
      case 'moderate':
        return 'bg-blue-600 hover:bg-blue-700 text-white';
      default:
        return 'bg-gray-600 hover:bg-gray-700 text-white';
    }
  };

  const getUrgencyText = () => {
    switch (urgencyLevel) {
      case 'crisis':
        return 'Emergency Help';
      case 'high':
        return 'Need Support';
      case 'moderate':
        return 'Get Help';
      default:
        return 'Support';
    }
  };

  if (!alwaysVisible && !crisisDetected) {
    return null;
  }

  return (
    <>
      {/* Floating Action Button */}
      <div className={cn(
        "fixed bottom-6 right-6 z-50 md:hidden",
        className
      )}>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button
              size="lg"
              className={cn(
                "h-14 w-14 rounded-full shadow-lg",
                getUrgencyStyles()
              )}
            >
              <Shield className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="bottom"
            className="h-[85vh] rounded-t-2xl border-0 p-0"
          >
            <MobileCrisisSupportContent
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              connecting={connecting}
              setConnecting={setConnecting}
              onResourceAccess={handleResourceAccess}
              urgencyLevel={urgencyLevel}
              currentEmotionalState={currentEmotionalState}
            />
          </SheetContent>
        </Sheet>
      </div>

      {/* Emergency Banner for Crisis Level */}
      {urgencyLevel === 'crisis' && (
        <div className="fixed top-0 left-0 right-0 z-40 bg-red-600 text-white p-3 md:hidden">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5" />
              <span className="font-semibold text-sm">Crisis Support Available</span>
            </div>
            <Button
              size="sm"
              variant="ghost"
              className="text-white hover:bg-red-700"
              onClick={() => setIsOpen(true)}
            >
              Get Help
            </Button>
          </div>
        </div>
      )}
    </>
  );
}

interface MobileCrisisSupportContentProps {
  activeTab: 'crisis' | 'peer' | 'calm';
  setActiveTab: (tab: 'crisis' | 'peer' | 'calm') => void;
  connecting: boolean;
  setConnecting: (connecting: boolean) => void;
  onResourceAccess: (resourceType: string, href?: string) => void;
  urgencyLevel: 'low' | 'moderate' | 'high' | 'crisis';
  currentEmotionalState: any;
}

function MobileCrisisSupportContent({
  activeTab,
  setActiveTab,
  connecting,
  setConnecting,
  onResourceAccess,
  urgencyLevel,
  currentEmotionalState
}: MobileCrisisSupportContentProps) {
  const tabs = [
    { id: 'crisis' as const, label: 'Crisis Help', icon: Phone },
    { id: 'peer' as const, label: 'Peer Support', icon: Users },
    { id: 'calm' as const, label: 'Quick Relief', icon: Heart }
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3 mb-4">
          <div className={cn(
            "p-3 rounded-full",
            urgencyLevel === 'crisis' ? 'bg-red-100' :
            urgencyLevel === 'high' ? 'bg-orange-100' :
            'bg-blue-100'
          )}>
            <Shield className={cn(
              "h-6 w-6",
              urgencyLevel === 'crisis' ? 'text-red-600' :
              urgencyLevel === 'high' ? 'text-orange-600' :
              'text-blue-600'
            )} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Support is Here</h2>
            <p className="text-sm text-gray-600">
              You're not alone. Help is available right now.
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
          {tabs.map((tab) => {
            const IconComponent = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-md text-sm font-medium transition-colors min-h-[48px]",
                  activeTab === tab.id
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                )}
              >
                <IconComponent className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === 'crisis' && (
          <CrisisHelpTab
            onResourceAccess={onResourceAccess}
            urgencyLevel={urgencyLevel}
          />
        )}
        {activeTab === 'peer' && (
          <PeerSupportTab
            connecting={connecting}
            setConnecting={setConnecting}
            onResourceAccess={onResourceAccess}
            currentEmotionalState={currentEmotionalState}
          />
        )}
        {activeTab === 'calm' && (
          <CalmingResourcesTab
            onResourceAccess={onResourceAccess}
          />
        )}
      </div>
    </div>
  );
}

interface CrisisHelpTabProps {
  onResourceAccess: (resourceType: string, href?: string) => void;
  urgencyLevel: 'low' | 'moderate' | 'high' | 'crisis';
}

function CrisisHelpTab({ onResourceAccess, urgencyLevel }: CrisisHelpTabProps) {
  const crisisResources: SupportResource[] = [
    {
      type: 'crisis-support',
      title: '988 Suicide & Crisis Lifeline',
      description: 'Free, confidential support 24/7',
      immediateAccess: true,
      href: 'tel:988'
    },
    {
      type: 'crisis-support',
      title: 'Crisis Text Line',
      description: 'Text with a trained counselor',
      immediateAccess: true,
      href: 'sms:741741?body=HOME'
    },
    {
      type: 'professional-help',
      title: 'SAMHSA National Helpline',
      description: 'Treatment referral service',
      immediateAccess: true,
      href: 'tel:1-800-662-4357'
    },
    {
      type: 'crisis-support',
      title: 'Emergency Services',
      description: 'For immediate danger',
      immediateAccess: true,
      href: 'tel:911'
    }
  ];

  return (
    <div className="p-6 space-y-4">
      {/* Immediate Help Message */}
      <div className={cn(
        "p-4 rounded-lg border",
        urgencyLevel === 'crisis' ? 'bg-red-50 border-red-200' :
        urgencyLevel === 'high' ? 'bg-orange-50 border-orange-200' :
        'bg-blue-50 border-blue-200'
      )}>
        <h3 className={cn(
          "font-semibold mb-2",
          urgencyLevel === 'crisis' ? 'text-red-900' :
          urgencyLevel === 'high' ? 'text-orange-900' :
          'text-blue-900'
        )}>
          {urgencyLevel === 'crisis' ? 'Immediate Help Available' : 'Professional Support'}
        </h3>
        <p className={cn(
          "text-sm",
          urgencyLevel === 'crisis' ? 'text-red-700' :
          urgencyLevel === 'high' ? 'text-orange-700' :
          'text-blue-700'
        )}>
          {urgencyLevel === 'crisis'
            ? 'If you\'re in immediate danger or having thoughts of self-harm, please reach out now.'
            : 'Professional counselors are available to provide support and guidance.'
          }
        </p>
      </div>

      {/* Crisis Resources */}
      <div className="space-y-3">
        {crisisResources.map((resource, index) => (
          <button
            key={index}
            onClick={() => onResourceAccess(resource.type, resource.href)}
            className="w-full p-4 bg-white border border-gray-200 rounded-lg hover:border-blue-300 transition-colors text-left min-h-[64px]"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 mb-1">{resource.title}</h4>
                <p className="text-sm text-gray-600">{resource.description}</p>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-5 w-5 text-blue-600" />
                <ExternalLink className="h-4 w-4 text-gray-400" />
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Reassurance */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Heart className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="font-semibold text-green-900 mb-1">You Matter</h4>
            <p className="text-sm text-green-700">
              Reaching out for help takes courage. These resources are staffed by trained professionals who care about your wellbeing.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

interface PeerSupportTabProps {
  connecting: boolean;
  setConnecting: (connecting: boolean) => void;
  onResourceAccess: (resourceType: string, href?: string) => void;
  currentEmotionalState: any;
}

function PeerSupportTab({ connecting, setConnecting, onResourceAccess, currentEmotionalState }: PeerSupportTabProps) {
  const [availablePeers] = useState([
    {
      id: 'peer-1',
      name: 'Maria R.',
      status: 'online',
      specialization: 'Medical Interpreting',
      experience: '8 years',
      location: 'California',
      responseTime: '~5 min',
      avatar: '/api/placeholder/40/40'
    },
    {
      id: 'peer-2',
      name: 'Ahmed H.',
      status: 'online',
      specialization: 'Legal Interpreting',
      experience: '5 years',
      location: 'New York',
      responseTime: '~10 min',
      avatar: '/api/placeholder/40/40'
    }
  ]);

  const handleConnect = async (peerId: string) => {
    setConnecting(true);
    onResourceAccess('peer-support-connection');

    // Simulate connection
    await new Promise(resolve => setTimeout(resolve, 2000));
    setConnecting(false);

    // In real implementation, would initiate peer connection
    console.log('Connecting with peer:', peerId);
  };

  return (
    <div className="p-6 space-y-4">
      {/* Quick Connect */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-semibold text-blue-900 mb-2">Connect with Interpreters</h3>
        <p className="text-sm text-blue-700 mb-3">
          Talk to fellow interpreters who understand your challenges.
        </p>
        <Button
          onClick={() => onResourceAccess('peer-community', '/community')}
          className="w-full min-h-[48px]"
          variant="default"
        >
          <Users className="h-4 w-4 mr-2" />
          Join Community Chat
        </Button>
      </div>

      {/* Available Peers */}
      <div>
        <h4 className="font-semibold text-gray-900 mb-3">Available Now</h4>
        <div className="space-y-3">
          {availablePeers.map((peer) => (
            <div key={peer.id} className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <img
                    src={peer.avatar}
                    alt={peer.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h5 className="font-medium text-gray-900">{peer.name}</h5>
                    <Badge variant="outline" className="text-xs">
                      {peer.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">{peer.specialization}</p>
                  <div className="flex items-center space-x-3 text-xs text-gray-500 mt-1">
                    <span>{peer.experience}</span>
                    <span className="flex items-center">
                      <MapPin className="h-3 w-3 mr-1" />
                      {peer.location}
                    </span>
                    <span className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {peer.responseTime}
                    </span>
                  </div>
                </div>
              </div>
              <Button
                onClick={() => handleConnect(peer.id)}
                disabled={connecting}
                className="w-full mt-3 min-h-[44px]"
                variant="outline"
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                {connecting ? 'Connecting...' : 'Connect'}
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Support Groups */}
      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
        <h4 className="font-semibold text-purple-900 mb-2">Support Groups</h4>
        <p className="text-sm text-purple-700 mb-3">
          Join ongoing discussions with other interpreters.
        </p>
        <div className="space-y-2">
          <button
            onClick={() => onResourceAccess('support-group', '/groups/burnout-support')}
            className="w-full p-3 bg-white rounded-lg text-left hover:bg-purple-50 transition-colors min-h-[48px]"
          >
            <div className="flex items-center justify-between">
              <span className="font-medium text-purple-900">Burnout Support</span>
              <ChevronRight className="h-4 w-4 text-purple-600" />
            </div>
            <p className="text-sm text-purple-700">12 members online</p>
          </button>
          <button
            onClick={() => onResourceAccess('support-group', '/groups/career-growth')}
            className="w-full p-3 bg-white rounded-lg text-left hover:bg-purple-50 transition-colors min-h-[48px]"
          >
            <div className="flex items-center justify-between">
              <span className="font-medium text-purple-900">Career Growth</span>
              <ChevronRight className="h-4 w-4 text-purple-600" />
            </div>
            <p className="text-sm text-purple-700">8 members online</p>
          </button>
        </div>
      </div>
    </div>
  );
}

interface CalmingResourcesTabProps {
  onResourceAccess: (resourceType: string, href?: string) => void;
}

function CalmingResourcesTab({ onResourceAccess }: CalmingResourcesTabProps) {
  const calmingResources = [
    {
      title: 'Breathing Exercise',
      description: '4-7-8 breathing technique',
      duration: '2 min',
      type: 'breathing',
      href: '/calm/breathing'
    },
    {
      title: 'Progressive Relaxation',
      description: 'Guided muscle relaxation',
      duration: '10 min',
      type: 'relaxation',
      href: '/calm/progressive-relaxation'
    },
    {
      title: 'Mindful Moment',
      description: 'Quick mindfulness exercise',
      duration: '3 min',
      type: 'mindfulness',
      href: '/calm/mindfulness'
    },
    {
      title: 'Positive Affirmations',
      description: 'Interpreter-specific affirmations',
      duration: '5 min',
      type: 'affirmations',
      href: '/calm/affirmations'
    }
  ];

  return (
    <div className="p-6 space-y-4">
      {/* Quick Relief Message */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <h3 className="font-semibold text-green-900 mb-2">Take a Moment</h3>
        <p className="text-sm text-green-700">
          These quick exercises can help reduce stress and restore calm.
        </p>
      </div>

      {/* Calming Resources */}
      <div className="space-y-3">
        {calmingResources.map((resource, index) => (
          <button
            key={index}
            onClick={() => onResourceAccess('self-care', resource.href)}
            className="w-full p-4 bg-white border border-gray-200 rounded-lg hover:border-green-300 transition-colors text-left min-h-[64px]"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 mb-1">{resource.title}</h4>
                <p className="text-sm text-gray-600">{resource.description}</p>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant="outline" className="text-xs">
                  {resource.duration}
                </Badge>
                <ChevronRight className="h-4 w-4 text-gray-400" />
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Emergency Grounding */}
      <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
        <h4 className="font-semibold text-orange-900 mb-2">Feeling Overwhelmed?</h4>
        <p className="text-sm text-orange-700 mb-3">
          Try the 5-4-3-2-1 grounding technique right now.
        </p>
        <Button
          onClick={() => onResourceAccess('grounding-technique', '/calm/grounding')}
          className="w-full min-h-[48px]"
          variant="outline"
        >
          <Heart className="h-4 w-4 mr-2" />
          Start Grounding Exercise
        </Button>
      </div>

      {/* Professional Resources */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-semibold text-blue-900 mb-2">Need More Support?</h4>
        <p className="text-sm text-blue-700 mb-3">
          Professional mental health resources for interpreters.
        </p>
        <Button
          onClick={() => onResourceAccess('professional-help', '/resources/mental-health')}
          className="w-full min-h-[48px]"
          variant="outline"
        >
          Find Professional Help
        </Button>
      </div>
    </div>
  );
}

export default MobileCrisisSupport;
