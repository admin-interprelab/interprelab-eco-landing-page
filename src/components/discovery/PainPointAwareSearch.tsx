import React, { useState, useEffect, useMemo } from 'react';
import { Search, Filter, Heart, Lightbulb, Target, Users, AlertCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import {
  EmpathicSearchResult,
  EmpathicSearchFilters
} from '@/types/empathetic-discovery';
import { EmotionalState, JourneyStage, PainPoint } from '@/types/navigation';

interface PainPointAwareSearchProps {
  emotionalState?: EmotionalState;
  journeyStage?: JourneyStage;
  onResultSelect?: (result: EmpathicSearchResult) => void;
  className?: string;
}

export const PainPointAwareSearch: React.FC<PainPointAwareSearchProps> = ({
  emotionalState,
  journeyStage,
  onResultSelect,
  className = ''
}) => {
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState<EmpathicSearchFilters>({
    currentStruggles: [],
    urgencyLevel: 'exploring-options',
    preferredSolutionType: 'professional-development',
    emotionalReadiness: 'ready-for-hope'
  });
  const [results, setResults] = useState<EmpathicSearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  // Mock search data - in production, this would come from an API
  const mockSearchData = useMemo((): EmpathicSearchResult[] => [
    // Crisis Support Resources
    {
      id: '1',
      type: 'support',
      title: 'Crisis Support for Interpreters',
      description: 'Immediate emotional support and resources for interpreters experiencing severe stress or burnout.',
      content: 'If you\'re feeling overwhelmed, you\'re not alone. Our crisis support team understands the unique pressures interpreters face.',
      emotionalTone: 'validating',
      painPointsAddressed: ['psychological'],
      urgencyLevel: 'immediate',
      url: '/crisis-support',
      tags: ['crisis-support', 'mental-health', 'immediate-help', 'burnout'],
      category: 'support',
      relevanceScore: 0.98,
      crisisSupport: true
    },
    {
      id: '2',
      type: 'support',
      title: 'Burnout Recovery Program',
      description: 'Structured support program for interpreters experiencing severe burnout and emotional exhaustion.',
      content: 'A comprehensive program designed to help interpreters recover from burnout and rebuild their professional confidence.',
      emotionalTone: 'validating',
      painPointsAddressed: ['psychological'],
      urgencyLevel: 'immediate',
      url: '/programs/burnout-recovery',
      testimonialQuote: 'This program helped me recognize that my feelings were valid and gave me tools to recover.',
      tags: ['burnout-recovery', 'mental-health', 'validation', 'professional-support'],
      category: 'support',
      relevanceScore: 0.96,
      crisisSupport: true
    },

    // Financial Stress Solutions
    {
      id: '3',
      type: 'resource',
      title: 'Breaking the $0.10 Pay Barrier: Financial Strategies',
      description: 'Practical strategies to overcome the devastating pay disparity and build financial stability in interpretation.',
      content: 'The $0.10-$4.95 per minute pay gap is destroying careers. Here\'s how to fight back and secure better compensation.',
      emotionalTone: 'empowering',
      painPointsAddressed: ['financial'],
      urgencyLevel: 'important',
      url: '/resources/financial-strategies',
      testimonialQuote: 'I went from $0.15/minute to $2.50/minute using these strategies.',
      tags: ['financial-planning', 'pay-improvement', 'career-strategy', 'negotiation'],
      category: 'support',
      relevanceScore: 0.94
    },
    {
      id: '4',
      type: 'solution',
      title: 'Premium Contract Finder',
      description: 'AI-powered tool that identifies and matches you with higher-paying interpretation opportunities.',
      content: 'Stop settling for poverty wages. Our AI analyzes thousands of contracts to find premium opportunities that match your skills.',
      emotionalTone: 'empowering',
      painPointsAddressed: ['financial', 'professional-development'],
      urgencyLevel: 'important',
      url: '/tools/contract-finder',
      testimonialQuote: 'This tool helped me find contracts paying 10x what I was making before.',
      tags: ['contract-finding', 'ai-matching', 'premium-opportunities', 'income-boost'],
      category: 'ai-tools',
      relevanceScore: 0.91
    },

    // Technology Frustration Solutions
    {
      id: '5',
      type: 'solution',
      title: 'InterpreCoach: AI Support During Live Sessions',
      description: 'Real-time AI assistance that eliminates technology failures and provides instant terminology support.',
      content: 'Never again struggle with platform crashes or terminology gaps. InterpreCoach provides reliable, instant support during live sessions.',
      emotionalTone: 'empowering',
      painPointsAddressed: ['technological', 'psychological'],
      urgencyLevel: 'important',
      url: '/interprecoach',
      testimonialQuote: 'InterpreCoach saved me from embarrassing technology failures and gave me confidence.',
      tags: ['ai-assistance', 'live-support', 'tech-reliability', 'stress-reduction'],
      category: 'ai-tools',
      relevanceScore: 0.95
    },
    {
      id: '6',
      type: 'resource',
      title: 'Technology Failure Recovery Guide',
      description: 'Step-by-step protocols for handling platform crashes, audio failures, and other tech disasters during interpretation.',
      content: 'When technology fails during critical sessions, you need immediate solutions. This guide provides proven recovery strategies.',
      emotionalTone: 'practical',
      painPointsAddressed: ['technological'],
      urgencyLevel: 'important',
      url: '/resources/tech-recovery',
      tags: ['tech-troubleshooting', 'emergency-protocols', 'platform-issues', 'backup-strategies'],
      category: 'support',
      relevanceScore: 0.87
    },

    // Professional Development & Career Stagnation
    {
      id: '7',
      type: 'solution',
      title: 'InterpreStudy: AI-Powered Skill Development',
      description: 'Overcome the $1000+ training cost barrier with AI-powered, personalized skill development that fits your budget.',
      content: 'Traditional training costs thousands and doesn\'t fit interpreter schedules. InterpreStudy provides personalized, affordable skill development.',
      emotionalTone: 'hopeful',
      painPointsAddressed: ['professional-development', 'financial'],
      urgencyLevel: 'important',
      url: '/interprestudy',
      testimonialQuote: 'Finally, professional development that doesn\'t bankrupt me or require impossible schedules.',
      tags: ['skill-development', 'ai-training', 'affordable-education', 'career-growth'],
      category: 'ai-tools',
      relevanceScore: 0.93
    },
    {
      id: '8',
      type: 'story',
      title: 'From Stagnation to Specialization: David\'s Career Transformation',
      description: 'How one interpreter broke free from low-paying general work to become a highly-paid medical specialist.',
      content: 'David was stuck in a cycle of low-paying assignments until he discovered how to leverage AI tools for specialization.',
      emotionalTone: 'hopeful',
      painPointsAddressed: ['professional-development', 'financial'],
      urgencyLevel: 'helpful',
      url: '/success-stories/david-specialization',
      testimonialQuote: 'I went from general interpretation at $0.20/minute to medical specialization at $3.75/minute.',
      tags: ['career-transformation', 'specialization', 'success-story', 'medical-interpretation'],
      category: 'success-stories',
      relevanceScore: 0.89
    },

    // Isolation & Community Support
    {
      id: '9',
      type: 'community',
      title: 'Interpreter Support Network',
      description: 'Connect with fellow interpreters who understand your struggles and can offer genuine peer support.',
      content: 'End the isolation. Join a community of interpreters who\'ve faced the same challenges and found ways to thrive.',
      emotionalTone: 'hopeful',
      painPointsAddressed: ['isolation', 'psychological'],
      urgencyLevel: 'helpful',
      url: '/interprelink',
      testimonialQuote: 'Finding this community saved my career and my mental health. I\'m not alone anymore.',
      tags: ['peer-support', 'community', 'networking', 'professional-connection'],
      category: 'community',
      relevanceScore: 0.88
    },
    {
      id: '10',
      type: 'story',
      title: 'Breaking Isolation: Sarah\'s Journey to Professional Connection',
      description: 'How one interpreter overcame professional isolation and built a supportive network that transformed her career.',
      content: 'Sarah felt completely alone in her struggles until she discovered the power of professional community and peer support.',
      emotionalTone: 'validating',
      painPointsAddressed: ['isolation', 'psychological'],
      urgencyLevel: 'helpful',
      url: '/success-stories/sarah-community',
      testimonialQuote: 'I thought I was the only one struggling. Finding my community changed everything.',
      tags: ['isolation-recovery', 'community-building', 'peer-support', 'professional-network'],
      category: 'success-stories',
      relevanceScore: 0.85
    },

    // Comprehensive Success Stories
    {
      id: '11',
      type: 'story',
      title: 'From Burnout to Breakthrough: Maria\'s Complete Transformation',
      description: 'How one interpreter overcame financial stress, technology failures, and professional isolation through AI-powered solutions.',
      content: 'Maria was on the verge of leaving interpretation entirely. Here\'s how she transformed every aspect of her career.',
      emotionalTone: 'hopeful',
      painPointsAddressed: ['financial', 'isolation', 'professional-development', 'psychological'],
      urgencyLevel: 'helpful',
      url: '/success-stories/maria-transformation',
      testimonialQuote: 'I went from barely surviving to thriving. Every pain point was addressed and overcome.',
      tags: ['complete-transformation', 'success-story', 'career-recovery', 'hope'],
      category: 'success-stories',
      relevanceScore: 0.92
    },

    // Practical Resources
    {
      id: '12',
      type: 'resource',
      title: 'Emergency Interpreter Survival Kit',
      description: 'Essential resources and strategies for interpreters facing immediate professional or personal crises.',
      content: 'When everything is falling apart, you need immediate, practical solutions. This survival kit provides exactly that.',
      emotionalTone: 'practical',
      painPointsAddressed: ['psychological', 'financial', 'technological'],
      urgencyLevel: 'immediate',
      url: '/resources/survival-kit',
      tags: ['emergency-resources', 'crisis-management', 'practical-solutions', 'immediate-help'],
      category: 'support',
      relevanceScore: 0.90
    }
  ], []);

  // Enhanced search algorithm that considers pain points, emotional state, and urgency
  const performEmpathicSearch = useMemo(() => {
    return (searchQuery: string, searchFilters: EmpathicSearchFilters) => {
      let filteredResults = [...mockSearchData];

      // 1. Filter by pain points/struggles with weighted matching
      if (searchFilters.currentStruggles.length > 0) {
        filteredResults = filteredResults.filter(result => {
          const struggleMap: Record<string, ('financial' | 'technological' | 'psychological' | 'professional-development' | 'isolation')[]> = {
            'burnout': ['psychological'],
            'financial-stress': ['financial'],
            'tech-frustration': ['technological'],
            'isolation': ['isolation'],
            'career-stagnation': ['professional-development']
          };

          return searchFilters.currentStruggles.some(struggle =>
            struggleMap[struggle]?.some(painType =>
              result.painPointsAddressed.includes(painType)
            )
          );
        });

        // Calculate pain point relevance score
        filteredResults = filteredResults.map(result => {
          const painPointMatches = searchFilters.currentStruggles.filter(struggle => {
            const struggleMap: Record<string, ('financial' | 'technological' | 'psychological' | 'professional-development' | 'isolation')[]> = {
              'burnout': ['psychological'],
              'financial-stress': ['financial'],
              'tech-frustration': ['technological'],
              'isolation': ['isolation'],
              'career-stagnation': ['professional-development']
            };
            return struggleMap[struggle]?.some(painType =>
              result.painPointsAddressed.includes(painType)
            );
          }).length;

          const painPointBoost = (painPointMatches / searchFilters.currentStruggles.length) * 0.3;
          return {
            ...result,
            relevanceScore: result.relevanceScore + painPointBoost
          };
        });
      }

      // 2. Apply urgency-aware filtering and prioritization
      const urgencyPriority = {
        'crisis': ['immediate', 'important', 'helpful'],
        'seeking-help': ['immediate', 'important', 'helpful'],
        'exploring-options': ['important', 'helpful'],
        'planning-ahead': ['helpful']
      };

      filteredResults = filteredResults.filter(result =>
        urgencyPriority[searchFilters.urgencyLevel].includes(result.urgencyLevel)
      );

      // 3. Apply emotional tone matching based on readiness
      if (searchFilters.emotionalReadiness) {
        const tonePreferences = {
          'need-validation': ['validating', 'hopeful'],
          'ready-for-hope': ['hopeful', 'empowering'],
          'ready-for-action': ['empowering', 'practical']
        };

        const preferredTones = tonePreferences[searchFilters.emotionalReadiness];
        filteredResults = filteredResults.map(result => {
          const toneBoost = preferredTones.includes(result.emotionalTone) ? 0.2 : 0;
          return {
            ...result,
            relevanceScore: result.relevanceScore + toneBoost
          };
        });
      }

      // 4. Apply solution type filtering
      if (searchFilters.preferredSolutionType) {
        const solutionTypeMap = {
          'immediate-relief': ['support', 'community'],
          'long-term-growth': ['solution', 'resource'],
          'community-support': ['community', 'story'],
          'professional-development': ['solution', 'resource']
        };

        const preferredTypes = solutionTypeMap[searchFilters.preferredSolutionType];
        filteredResults = filteredResults.map(result => {
          const typeBoost = preferredTypes.includes(result.type) ? 0.15 : 0;
          return {
            ...result,
            relevanceScore: result.relevanceScore + typeBoost
          };
        });
      }

      // 5. Text search with semantic matching
      if (searchQuery.trim()) {
        const queryLower = searchQuery.toLowerCase();
        const searchTerms = queryLower.split(' ').filter(term => term.length > 2);

        filteredResults = filteredResults.filter(result => {
          const searchableText = [
            result.title,
            result.description,
            result.content,
            ...result.tags,
            result.testimonialQuote || ''
          ].join(' ').toLowerCase();

          return searchTerms.some(term => searchableText.includes(term));
        });

        // Calculate text relevance score
        filteredResults = filteredResults.map(result => {
          const searchableText = [
            result.title,
            result.description,
            result.content,
            ...result.tags
          ].join(' ').toLowerCase();

          const titleMatches = searchTerms.filter(term =>
            result.title.toLowerCase().includes(term)
          ).length;
          const descriptionMatches = searchTerms.filter(term =>
            result.description.toLowerCase().includes(term)
          ).length;
          const tagMatches = searchTerms.filter(term =>
            result.tags.some(tag => tag.toLowerCase().includes(term))
          ).length;

          const textRelevanceBoost = (titleMatches * 0.3) + (descriptionMatches * 0.2) + (tagMatches * 0.1);

          return {
            ...result,
            relevanceScore: result.relevanceScore + textRelevanceBoost
          };
        });
      }

      // 6. Final sorting with crisis prioritization
      return filteredResults.sort((a, b) => {
        // Crisis support always comes first if user is in crisis
        if (emotionalState?.stressLevel === 'crisis') {
          if (a.crisisSupport && !b.crisisSupport) return -1;
          if (!a.crisisSupport && b.crisisSupport) return 1;
        }

        // Urgency-based prioritization
        const urgencyWeight = {
          'immediate': 3,
          'important': 2,
          'helpful': 1
        };

        const urgencyDiff = urgencyWeight[a.urgencyLevel] - urgencyWeight[b.urgencyLevel];
        if (urgencyDiff !== 0) return urgencyDiff;

        // Sort by calculated relevance score
        return b.relevanceScore - a.relevanceScore;
      });
    };
  }, [emotionalState, mockSearchData]);

  // Perform search when query or filters change
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      const searchResults = performEmpathicSearch(query, filters);
      setResults(searchResults);
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [query, filters, performEmpathicSearch]);

  // Auto-set filters based on emotional state
  useEffect(() => {
    if (emotionalState) {
      const strugglesMap: Record<string, ('burnout' | 'financial-stress' | 'tech-frustration' | 'isolation' | 'career-stagnation')[]> = {
        'financial': ['financial-stress'],
        'technological': ['tech-frustration'],
        'psychological': ['burnout'],
        'isolation': ['isolation'],
        'professional-development': ['career-stagnation']
      };

      const detectedStruggles = emotionalState.primaryConcerns.flatMap(concern =>
        strugglesMap[concern.type] || []
      );

      const urgencyMap = {
        'crisis': 'crisis' as const,
        'high': 'seeking-help' as const,
        'moderate': 'exploring-options' as const,
        'low': 'planning-ahead' as const
      };

      setFilters(prev => ({
        ...prev,
        currentStruggles: detectedStruggles,
        urgencyLevel: urgencyMap[emotionalState.stressLevel],
        emotionalReadiness: journeyStage?.stage === 'validation' ? 'need-validation' :
                           journeyStage?.stage === 'hope-building' ? 'ready-for-hope' : 'ready-for-action'
      }));
    }
  }, [emotionalState, journeyStage]);

  const getEmotionalToneIcon = (tone: string) => {
    switch (tone) {
      case 'validating': return <Heart className="w-4 h-4 text-pink-500" />;
      case 'hopeful': return <Lightbulb className="w-4 h-4 text-yellow-500" />;
      case 'empowering': return <Target className="w-4 h-4 text-green-500" />;
      case 'practical': return <Users className="w-4 h-4 text-blue-500" />;
      default: return <Search className="w-4 h-4" />;
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'immediate': return 'bg-red-100 text-red-800 border-red-200';
      case 'important': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'helpful': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Search Header */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-foreground">
          Find Support That Understands Your Journey
        </h2>
        <p className="text-muted-foreground">
          Search for solutions, stories, and support tailored to your specific challenges as an interpreter
        </p>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
        <Input
          placeholder="Describe what you're struggling with or what you need help with..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-12 pr-12 py-3 text-lg"
        />
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowFilters(!showFilters)}
          className="absolute right-2 top-1/2 transform -translate-y-1/2"
        >
          <Filter className="w-4 h-4" />
        </Button>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Personalize Your Search</CardTitle>
            <CardDescription>
              Help us understand your current situation to provide more relevant support
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Current Struggles */}
            <div>
              <label className="text-sm font-medium mb-2 block">What are you struggling with?</label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { value: 'burnout', label: 'Burnout & Stress' },
                  { value: 'financial-stress', label: 'Financial Pressure' },
                  { value: 'tech-frustration', label: 'Technology Issues' },
                  { value: 'isolation', label: 'Professional Isolation' },
                  { value: 'career-stagnation', label: 'Career Stagnation' }
                ].map(struggle => (
                  <div key={struggle.value} className="flex items-center space-x-2">
                    <Checkbox
                      id={struggle.value}
                      checked={filters.currentStruggles.includes(struggle.value as EmpathicSearchFilters['currentStruggles'][0])}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setFilters(prev => ({
                            ...prev,
                            currentStruggles: [...prev.currentStruggles, struggle.value as EmpathicSearchFilters['currentStruggles'][0]]
                          }));
                        } else {
                          setFilters(prev => ({
                            ...prev,
                            currentStruggles: prev.currentStruggles.filter(s => s !== struggle.value)
                          }));
                        }
                      }}
                    />
                    <label htmlFor={struggle.value} className="text-sm">{struggle.label}</label>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Urgency Level */}
            <div>
              <label className="text-sm font-medium mb-2 block">How urgent is your need?</label>
              <Select
                value={filters.urgencyLevel}
                onValueChange={(value: EmpathicSearchFilters['urgencyLevel']) => setFilters(prev => ({ ...prev, urgencyLevel: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="crisis">Crisis - I need immediate help</SelectItem>
                  <SelectItem value="seeking-help">Seeking Help - I need support soon</SelectItem>
                  <SelectItem value="exploring-options">Exploring Options - I'm researching solutions</SelectItem>
                  <SelectItem value="planning-ahead">Planning Ahead - I'm preparing for the future</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Solution Type */}
            <div>
              <label className="text-sm font-medium mb-2 block">What type of solution are you looking for?</label>
              <Select
                value={filters.preferredSolutionType}
                onValueChange={(value: EmpathicSearchFilters['preferredSolutionType']) => setFilters(prev => ({ ...prev, preferredSolutionType: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="immediate-relief">Immediate Relief</SelectItem>
                  <SelectItem value="long-term-growth">Long-term Growth</SelectItem>
                  <SelectItem value="community-support">Community Support</SelectItem>
                  <SelectItem value="professional-development">Professional Development</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Crisis Alert */}
      {emotionalState?.stressLevel === 'crisis' && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-3">
              <AlertCircle className="w-6 h-6 text-red-600" />
              <div>
                <h3 className="font-semibold text-red-800">We're here to help</h3>
                <p className="text-red-700 text-sm">
                  If you're in crisis, please know that you're not alone. We have immediate support resources available.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Search Results */}
      <div className="space-y-4">
        {isLoading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="text-muted-foreground mt-2">Finding the right support for you...</p>
          </div>
        ) : results.length === 0 ? (
          <div className="text-center py-8">
            <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No results found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search terms or filters to find the support you need.
            </p>
          </div>
        ) : (
          results.map((result) => (
            <Card
              key={result.id}
              className={`cursor-pointer transition-all hover:shadow-md ${
                result.crisisSupport ? 'border-red-200 bg-red-50' : ''
              }`}
              onClick={() => onResultSelect?.(result)}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      {getEmotionalToneIcon(result.emotionalTone)}
                      <CardTitle className="text-lg">{result.title}</CardTitle>
                    </div>
                    <CardDescription className="text-base">
                      {result.description}
                    </CardDescription>
                  </div>
                  <Badge className={getUrgencyColor(result.urgencyLevel)}>
                    {result.urgencyLevel}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                {result.testimonialQuote && (
                  <blockquote className="italic text-muted-foreground border-l-4 border-primary pl-4 mb-4">
                    "{result.testimonialQuote}"
                  </blockquote>
                )}
                <div className="flex flex-wrap gap-2">
                  {result.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};
