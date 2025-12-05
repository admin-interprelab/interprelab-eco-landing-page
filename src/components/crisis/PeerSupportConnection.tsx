import React, { useState, useEffect, useCallback } from 'react';
import { Users, MessageCircle, Heart, Clock, MapPin, Star, ChevronRight } from 'lucide-react';
import { useTherapeuticAnalyticsContext } from '../../contexts/TherapeuticAnalyticsContext';
import { PainPoint } from '../../types/navigation';

interface PeerSupportConnectionProps {
  enabled?: boolean;
  autoMatch?: boolean;
  className?: string;
}

export function PeerSupportConnection({
  enabled = true,
  autoMatch = true,
  className = ''
}: PeerSupportConnectionProps) {
  const {
    exploredPainPoints,
    currentEmotionalState,
    isTracking,
    privacyConsent,
    trackHopeIndicator,
    accessCrisisSupport
  } = useTherapeuticAnalyticsContext();

  const [matches, setMatches] = useState<PeerMatch[]>([]);
  const [showMatches, setShowMatches] = useState(false);
  const [connecting, setConnecting] = useState(false);

  // Generate peer matches based on pain points and emotional state
  useEffect(() => {
    if (!enabled || !isTracking || !privacyConsent?.peerSupportConsent || !autoMatch) return;

    if (exploredPainPoints.length > 0 || currentEmotionalState?.stressLevel === 'high') {
      const peerMatches = generatePeerMatches(exploredPainPoints, currentEmotionalState);
      setMatches(peerMatches);
      setShowMatches(peerMatches.length > 0);
    }
  }, [enabled, isTracking, privacyConsent, autoMatch, exploredPainPoints, currentEmotionalState]);

  const handleConnect = useCallback(async (match: PeerMatch) => {
    setConnecting(true);

    // Track peer support access
    accessCrisisSupport('peer-support-connection', 0);

    // Track hope indicator for peer connection
    trackHopeIndicator({
      type: 'community-participation',
      timestamp: new Date(),
      intensity: 6,
      context: `Connected with peer: ${match.name}`,
      content: match.id
    } as any);

    // Simulate connection process
    await new Promise(resolve => setTimeout(resolve, 1500));

    setConnecting(false);

    // In a real implementation, this would initiate the peer connection
    console.log('Connecting with peer:', match);
  }, [accessCrisisSupport, trackHopeIndicator]);

  if (!enabled || !showMatches || matches.length === 0) {
    return null;
  }

  return (
    <div className={`bg-white rounded-lg shadow-lg border border-gray-200 ${className}`}>
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 bg-green-100 rounded-lg">
            <Users className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Peer Support Available</h3>
            <p className="text-sm text-gray-600">
              Connect with interpreters who understand your challenges
            </p>
          </div>
        </div>

        {/* Matches */}
        <div className="space-y-3">
          {matches.slice(0, 3).map((match) => (
            <PeerMatchCard
              key={match.id}
              match={match}
              onConnect={() => handleConnect(match)}
              connecting={connecting}
            />
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
          <div className="flex items-start space-x-3">
            <Heart className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-green-900 mb-1">You're Not Alone</h4>
              <p className="text-sm text-green-700">
                These interpreters have faced similar challenges and are here to support you.
                Peer connections are confidential and moderated for safety.
              </p>
            </div>
          </div>
        </div>

        {/* Browse More */}
        {matches.length > 3 && (
          <div className="mt-4 text-center">
            <button className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center justify-center space-x-1">
              <span>Browse {matches.length - 3} more matches</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

interface PeerMatch {
  id: string;
  name: string;
  avatar: string;
  experience: string;
  specializations: string[];
  sharedChallenges: PainPoint['type'][];
  location: string;
  availability: 'online' | 'busy' | 'offline';
  rating: number;
  responseTime: string;
  bio: string;
  matchScore: number;
  lastActive: string;
}

interface PeerMatchCardProps {
  match: PeerMatch;
  onConnect: () => void;
  connecting: boolean;
}

function PeerMatchCard({ match, onConnect, connecting }: PeerMatchCardProps) {
  const getAvailabilityColor = () => {
    switch (match.availability) {
      case 'online':
        return 'bg-green-400';
      case 'busy':
        return 'bg-yellow-400';
      default:
        return 'bg-gray-400';
    }
  };

  const getAvailabilityText = () => {
    switch (match.availability) {
      case 'online':
        return 'Available now';
      case 'busy':
        return 'Busy';
      default:
        return `Last seen ${match.lastActive}`;
    }
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:border-green-300 transition-colors">
      <div className="flex items-start space-x-4">
        {/* Avatar */}
        <div className="relative">
          <img
            src={match.avatar}
            alt={match.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${getAvailabilityColor()}`} />
        </div>

        {/* Info */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <h4 className="font-semibold text-gray-900">{match.name}</h4>
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span className="text-sm text-gray-600">{match.rating.toFixed(1)}</span>
            </div>
          </div>

          <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
            <span>{match.experience}</span>
            <div className="flex items-center space-x-1">
              <MapPin className="h-3 w-3" />
              <span>{match.location}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="h-3 w-3" />
              <span>{match.responseTime}</span>
            </div>
          </div>

          <p className="text-sm text-gray-700 mb-3">{match.bio}</p>

          {/* Shared Challenges */}
          <div className="flex flex-wrap gap-1 mb-3">
            {match.sharedChallenges.map((challenge) => (
              <span
                key={challenge}
                className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full"
              >
                {formatChallenge(challenge)}
              </span>
            ))}
          </div>

          {/* Specializations */}
          <div className="flex flex-wrap gap-1 mb-3">
            {match.specializations.slice(0, 3).map((spec) => (
              <span
                key={spec}
                className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
              >
                {spec}
              </span>
            ))}
            {match.specializations.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                +{match.specializations.length - 3} more
              </span>
            )}
          </div>

          {/* Status and Connect Button */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">{getAvailabilityText()}</span>
            <button
              onClick={onConnect}
              disabled={connecting}
              className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <MessageCircle className="h-4 w-4" />
              <span>{connecting ? 'Connecting...' : 'Connect'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper function to format challenge types
function formatChallenge(challenge: PainPoint['type']): string {
  switch (challenge) {
    case 'financial':
      return 'Financial Stress';
    case 'technological':
      return 'Tech Issues';
    case 'psychological':
      return 'Burnout';
    case 'professional-development':
      return 'Career Growth';
    case 'isolation':
      return 'Isolation';
    default:
      return challenge;
  }
}

// Generate peer matches based on user's pain points and emotional state
function generatePeerMatches(
  painPoints: PainPoint[],
  emotionalState: any
): PeerMatch[] {
  // In a real implementation, this would query a database of available peers
  // For now, we'll generate mock matches based on the pain points

  const mockPeers: PeerMatch[] = [
    {
      id: 'peer-1',
      name: 'Maria Rodriguez',
      avatar: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="48" height="48"%3E%3Crect fill="%239333ea" width="48" height="48"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="white" font-size="18" font-family="sans-serif"%3EMR%3C/text%3E%3C/svg%3E',
      experience: '8 years medical',
      specializations: ['Emergency Medicine', 'Cardiology', 'Spanish'],
      sharedChallenges: ['financial', 'psychological'],
      location: 'California, USA',
      availability: 'online',
      rating: 4.8,
      responseTime: '~5 min',
      bio: 'Overcame financial stress through AI tools and community support. Happy to help others.',
      matchScore: 95,
      lastActive: '2 hours ago'
    },
    {
      id: 'peer-2',
      name: 'Ahmed Hassan',
      avatar: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="48" height="48"%3E%3Crect fill="%2306b6d4" width="48" height="48"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="white" font-size="18" font-family="sans-serif"%3EAH%3C/text%3E%3C/svg%3E',
      experience: '5 years legal',
      specializations: ['Immigration Law', 'Arabic', 'Court Interpreting'],
      sharedChallenges: ['technological', 'isolation'],
      location: 'New York, USA',
      availability: 'busy',
      rating: 4.6,
      responseTime: '~15 min',
      bio: 'Struggled with tech platforms but found solutions. Here to share what worked.',
      matchScore: 87,
      lastActive: '1 hour ago'
    },
    {
      id: 'peer-3',
      name: 'Jennifer Kim',
      avatar: '/api/placeholder/48/48',
      experience: '12 years medical',
      specializations: ['Mental Health', 'Korean', 'Telehealth'],
      sharedChallenges: ['professional-development', 'psychological'],
      location: 'Washington, USA',
      availability: 'online',
      rating: 4.9,
      responseTime: '~3 min',
      bio: 'Career coach for interpreters. Passionate about professional growth and wellbeing.',
      matchScore: 92,
      lastActive: 'online now'
    }
  ];

  // Filter and sort matches based on shared challenges
  const painPointTypes = painPoints.map(pp => pp.type);

  return mockPeers
    .filter(peer =>
      peer.sharedChallenges.some(challenge => painPointTypes.includes(challenge))
    )
    .sort((a, b) => {
      // Prioritize online availability
      if (a.availability === 'online' && b.availability !== 'online') return -1;
      if (b.availability === 'online' && a.availability !== 'online') return 1;

      // Then sort by match score
      return b.matchScore - a.matchScore;
    });
}

export default PeerSupportConnection;
