import React, { useState, useEffect, useMemo } from 'react';
import {
  Heart,
  Lightbulb,
  Target,
  Users,
  BookOpen,
  Video,
  MessageCircle,
  TrendingUp,
  Clock,
  Star,
  ArrowRight,
  CheckCircle
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  PersonalizedContent,
  InterpreterProfile,
  SuccessStory,
  StoryMatchCriteria,
  HopeProgressionLevel,
  ContentProgression
} from '@/types/empathetic-discovery';
import { EmotionalState, JourneyStage } from '@/types/navigation';

interface TherapeuticRecommendationsProps {
  interpreterProfile: InterpreterProfile;
  emotionalState?: EmotionalState;
  journeyStage: JourneyStage;
  onContentSelect?: (content: PersonalizedContent) => void;
  onStorySelect?: (story: SuccessStory) => void;
  className?: string;
}

export const TherapeuticRecommendations: React.FC<TherapeuticRecommendationsProps> = ({
  interpreterProfile,
  emotionalState,
  journeyStage,
  onContentSelect,
  onStorySelect,
  className = ''
}) => {
  const [activeTab, setActiveTab] = useState('recommended');
  const [contentProgression, setContentProgression] = useState<ContentProgression>({
    userId: interpreterProfile.id,
    currentLevel: 1,
    completedContent: [],
    hopeIndicators: [],
    progressMetrics: {
      validationEngagement: 0,
      inspirationResonance: 0,
      practicalApplication: 0,
      communityConnection: 0
    }
  });

  // Mock data - in production, this would come from APIs
  const mockRecommendedContent: PersonalizedContent[] = [
    {
      id: 'content-1',
      title: 'Understanding Interpreter Burnout: You\'re Not Alone',
      description: 'A comprehensive guide that validates your experiences and explains why burnout is so common in our profession.',
      type: 'article',
      recommendationReason: 'Based on your identified stress levels and psychological concerns',
      emotionalBenefit: 'Validation and understanding of your struggles',
      practicalBenefit: 'Recognition of burnout signs and initial coping strategies',
      estimatedTime: '8 min read',
      difficulty: 'beginner',
      url: '/resources/burnout-guide',
      priority: 'high'
    },
    {
      id: 'content-2',
      title: 'InterpreCoach Demo: See AI Support in Action',
      description: 'Watch how AI assistance can reduce cognitive load during live interpretation sessions.',
      type: 'video',
      recommendationReason: 'Matches your technological concerns and need for practical solutions',
      emotionalBenefit: 'Hope through seeing technology as a supportive ally',
      practicalBenefit: 'Understanding of how AI can reduce session stress',
      estimatedTime: '5 min video',
      difficulty: 'beginner',
      url: '/interprecoach/demo',
      priority: 'high'
    },
    {
      id: 'content-3',
      title: 'Financial Planning Workshop for Interpreters',
      description: 'Interactive workshop addressing the pay disparity and building financial stability.',
      type: 'exercise',
      recommendationReason: 'Addresses your financial stress concerns',
      emotionalBenefit: 'Empowerment through financial control',
      practicalBenefit: 'Concrete strategies for improving income',
      estimatedTime: '30 min workshop',
      difficulty: 'intermediate',
      url: '/workshops/financial-planning',
      priority: 'medium'
    },
    {
      id: 'content-4',
      title: 'Join the Interpreter Support Circle',
      description: 'Connect with interpreters who understand your challenges in a supportive community environment.',
      type: 'community',
      recommendationReason: 'Based on your isolation concerns and need for peer support',
      emotionalBenefit: 'Connection and reduced isolation',
      practicalBenefit: 'Peer advice and professional networking',
      estimatedTime: 'Ongoing',
      difficulty: 'beginner',
      url: '/interprelink/support-circle',
      priority: 'high'
    }
  ];

  const mockSuccessStories: SuccessStory[] = [
    {
      id: 'story-1',
      title: 'From Overwhelmed to Empowered: Sarah\'s AI Journey',
      summary: 'How Sarah overcame technology anxiety and cognitive overload using InterpreLab\'s AI tools.',
      fullStory: 'Sarah was struggling with the cognitive demands of live interpretation...',
      interpreterBackground: {
        experienceLevel: 'intermediate',
        specialization: ['medical', 'legal'],
        challenges: ['technological', 'psychological'],
        demographics: {
          ageRange: '35-45',
          location: 'California',
          languages: ['Spanish', 'English']
        }
      },
      transformation: {
        before: 'Overwhelmed by technology, frequent mistakes, high stress',
        after: 'Confident with AI support, improved accuracy, reduced stress',
        keyMilestones: [
          'Started using InterpreCoach',
          'Completed AI training modules',
          'Landed first premium contract',
          'Became community mentor'
        ],
        timeframe: '6 months',
        toolsUsed: ['InterpreCoach', 'InterpreStudy', 'InterpreLink']
      },
      emotionalJourney: {
        startingPoint: 'Feeling overwhelmed and considering leaving the profession',
        lowPoints: ['Failed important assignment due to tech issues', 'Panic attacks before sessions'],
        breakthroughs: ['First successful AI-assisted session', 'Positive client feedback'],
        currentState: 'Confident, empowered, helping other interpreters'
      },
      quotes: {
        inspirational: 'I never thought technology could be my ally instead of my enemy.',
        practical: 'InterpreCoach reduced my cognitive load by at least 40%.',
        hopeful: 'If I can transform my relationship with technology, anyone can.'
      },
      metrics: {
        earningsImprovement: '60% increase in hourly rate',
        stressReduction: '70% reduction in pre-session anxiety',
        skillImprovement: '85% accuracy improvement',
        careerAdvancement: 'Promoted to senior interpreter role'
      },
      tags: ['technology-anxiety', 'cognitive-overload', 'career-growth', 'ai-adoption'],
      featured: true,
      verified: true
    },
    {
      id: 'story-2',
      title: 'Breaking the Financial Ceiling: Miguel\'s Success',
      summary: 'How Miguel went from struggling with low-paying gigs to landing premium contracts.',
      fullStory: 'Miguel was trapped in the cycle of low-paying interpretation work...',
      interpreterBackground: {
        experienceLevel: 'experienced',
        specialization: ['medical', 'business'],
        challenges: ['financial'],
        demographics: {
          ageRange: '40-50',
          location: 'Texas',
          languages: ['Spanish', 'English']
        }
      },
      transformation: {
        before: 'Struggling with $0.10-$2.00 per minute rates',
        after: 'Earning $4.50+ per minute with premium clients',
        keyMilestones: [
          'Completed advanced certification',
          'Built professional portfolio',
          'Networked through InterpreLink',
          'Established premium client base'
        ],
        timeframe: '8 months',
        toolsUsed: ['InterpreStudy', 'InterpreLink', 'InterpreTrack']
      },
      emotionalJourney: {
        startingPoint: 'Frustrated with financial instability',
        lowPoints: ['Couldn\'t afford professional development', 'Considered career change'],
        breakthroughs: ['First premium contract', 'Client referral network'],
        currentState: 'Financially stable, professionally respected'
      },
      quotes: {
        inspirational: 'I realized I was worth more than the market was paying me.',
        practical: 'The key was positioning myself as a premium service provider.',
        hopeful: 'Financial stability in interpretation is possible with the right strategy.'
      },
      metrics: {
        earningsImprovement: '300% increase in annual income',
        careerAdvancement: 'Established own interpretation agency'
      },
      tags: ['financial-growth', 'premium-contracts', 'business-development'],
      featured: true,
      verified: true
    }
  ];

  const hopeProgressionLevels: HopeProgressionLevel[] = [
    {
      level: 1,
      name: 'Validation & Understanding',
      description: 'Acknowledging your struggles and feeling understood',
      emotionalGoal: 'Feel validated and less alone in your challenges',
      content: {
        validation: ['Your struggles are real and valid', 'Many interpreters face similar challenges'],
        inspiration: ['Stories of others who felt the same way', 'Small steps toward improvement'],
        practical: ['Basic stress management techniques', 'Understanding your pain points'],
        community: ['Introduction to peer support', 'Safe spaces to share']
      },
      milestones: ['Read validation content', 'Identify personal pain points', 'Connect with one peer'],
      nextLevelCriteria: ['Completed 3 validation articles', 'Engaged with community once']
    },
    {
      level: 2,
      name: 'Hope & Possibility',
      description: 'Seeing that change is possible and solutions exist',
      emotionalGoal: 'Develop hope that your situation can improve',
      content: {
        validation: ['Your feelings about change are normal', 'Progress takes time'],
        inspiration: ['Success stories from similar backgrounds', 'Evidence of positive outcomes'],
        practical: ['Introduction to available tools', 'Small actionable steps'],
        community: ['Peer success celebrations', 'Mentor connections']
      },
      milestones: ['Watched success story videos', 'Tried one new tool', 'Set small goals'],
      nextLevelCriteria: ['Engaged with 2 success stories', 'Used one InterpreLab tool']
    },
    {
      level: 3,
      name: 'Action & Growth',
      description: 'Taking concrete steps toward improvement',
      emotionalGoal: 'Feel empowered to make positive changes',
      content: {
        validation: ['Celebrating small wins', 'Acknowledging progress'],
        inspiration: ['Advanced success stories', 'Transformation journeys'],
        practical: ['Skill development resources', 'Career advancement strategies'],
        community: ['Mentorship opportunities', 'Leadership roles']
      },
      milestones: ['Completed training module', 'Improved performance metrics', 'Helped another interpreter'],
      nextLevelCriteria: ['Consistent tool usage', 'Measurable improvement', 'Community contribution']
    }
  ];

  // Content recommendation algorithm
  const getRecommendedContent = useMemo(() => {
    return () => {
      let recommendations = [...mockRecommendedContent];

      // Filter based on journey stage
      if (journeyStage.stage === 'validation') {
        recommendations = recommendations.filter(content =>
          content.emotionalBenefit.toLowerCase().includes('validation') ||
          content.type === 'article'
        );
      } else if (journeyStage.stage === 'hope-building') {
        recommendations = recommendations.filter(content =>
          content.type === 'video' || content.type === 'story'
        );
      } else if (journeyStage.stage === 'action') {
        recommendations = recommendations.filter(content =>
          content.type === 'exercise' || content.type === 'tool'
        );
      }

      // Filter based on pain points
      const painPointKeywords = interpreterProfile.strugglesIdentified.flatMap(struggle => {
        const keywordMap: Record<string, string[]> = {
          'financial': ['financial', 'money', 'income', 'pay'],
          'technological': ['technology', 'ai', 'tech', 'digital'],
          'psychological': ['stress', 'burnout', 'anxiety', 'mental'],
          'isolation': ['community', 'peer', 'support', 'connection'],
          'professional-development': ['training', 'skill', 'career', 'growth']
        };
        return keywordMap[struggle.type] || [];
      });

      recommendations = recommendations.filter(content =>
        painPointKeywords.some(keyword =>
          content.title.toLowerCase().includes(keyword) ||
          content.description.toLowerCase().includes(keyword) ||
          content.recommendationReason.toLowerCase().includes(keyword)
        )
      );

      // Sort by priority and relevance
      return recommendations.sort((a, b) => {
        const priorityOrder = { 'high': 3, 'medium': 2, 'low': 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      });
    };
  }, [interpreterProfile, journeyStage, mockRecommendedContent]);

  // Success story matching
  const getMatchedStories = useMemo(() => {
    return () => {
      const criteria: StoryMatchCriteria = {
        painPoints: interpreterProfile.strugglesIdentified.map(s => s.type),
        experienceLevel: interpreterProfile.experienceLevel,
        specializations: interpreterProfile.specializations,
        currentEmotionalState: emotionalState!,
        journeyStage
      };

      return mockSuccessStories.filter(story => {
        // Match pain points
        const painPointMatch = story.interpreterBackground.challenges.some(challenge =>
          criteria.painPoints.includes(challenge)
        );

        // Match experience level (allow some flexibility)
        const experienceLevels = ['new', 'intermediate', 'experienced', 'veteran'];
        const userLevelIndex = experienceLevels.indexOf(criteria.experienceLevel);
        const storyLevelIndex = experienceLevels.indexOf(story.interpreterBackground.experienceLevel);
        const experienceMatch = Math.abs(userLevelIndex - storyLevelIndex) <= 1;

        // Match specializations
        const specializationMatch = story.interpreterBackground.specialization.some(spec =>
          criteria.specializations.includes(spec)
        );

        return painPointMatch && (experienceMatch || specializationMatch);
      }).sort((a, b) => {
        // Prioritize featured and verified stories
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        if (a.verified && !b.verified) return -1;
        if (!a.verified && b.verified) return 1;
        return 0;
      });
    };
  }, [interpreterProfile, emotionalState, journeyStage, mockSuccessStories]);

  const currentLevel = hopeProgressionLevels.find(level => level.level === contentProgression.currentLevel);
  const recommendedContent = getRecommendedContent();
  const matchedStories = getMatchedStories();

  const getContentTypeIcon = (type: string) => {
    switch (type) {
      case 'article': return <BookOpen className="w-4 h-4" />;
      case 'video': return <Video className="w-4 h-4" />;
      case 'exercise': return <Target className="w-4 h-4" />;
      case 'community': return <Users className="w-4 h-4" />;
      case 'tool': return <TrendingUp className="w-4 h-4" />;
      default: return <BookOpen className="w-4 h-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-foreground">
          Your Personalized Journey to Empowerment
        </h2>
        <p className="text-muted-foreground">
          Content and stories curated specifically for your challenges and goals
        </p>
      </div>

      {/* Hope Progression Tracker */}
      {currentLevel && (
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg flex items-center space-x-2">
                  <Star className="w-5 h-5 text-yellow-500" />
                  <span>Level {currentLevel.level}: {currentLevel.name}</span>
                </CardTitle>
                <CardDescription>{currentLevel.description}</CardDescription>
              </div>
              <Badge className="bg-blue-100 text-blue-800">
                {contentProgression.completedContent.length} completed
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Progress to next level</span>
                  <span>{Math.min(contentProgression.completedContent.length * 20, 100)}%</span>
                </div>
                <Progress value={Math.min(contentProgression.completedContent.length * 20, 100)} />
              </div>
              <p className="text-sm text-muted-foreground">
                <strong>Goal:</strong> {currentLevel.emotionalGoal}
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="recommended">Recommended for You</TabsTrigger>
          <TabsTrigger value="stories">Success Stories</TabsTrigger>
          <TabsTrigger value="progression">Hope Journey</TabsTrigger>
        </TabsList>

        {/* Recommended Content */}
        <TabsContent value="recommended" className="space-y-4">
          {recommendedContent.length === 0 ? (
            <Card>
              <CardContent className="pt-6 text-center">
                <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Building Your Recommendations</h3>
                <p className="text-muted-foreground">
                  We're personalizing content based on your profile. Check back soon for tailored recommendations.
                </p>
              </CardContent>
            </Card>
          ) : (
            recommendedContent.map((content) => (
              <Card
                key={content.id}
                className="cursor-pointer transition-all hover:shadow-md"
                onClick={() => onContentSelect?.(content)}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        {getContentTypeIcon(content.type)}
                        <CardTitle className="text-lg">{content.title}</CardTitle>
                        <Badge className={getPriorityColor(content.priority)}>
                          {content.priority}
                        </Badge>
                      </div>
                      <CardDescription className="text-base mb-3">
                        {content.description}
                      </CardDescription>
                      <div className="text-sm text-muted-foreground mb-2">
                        <strong>Why this helps:</strong> {content.recommendationReason}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <h4 className="font-medium text-sm mb-1 flex items-center">
                        <Heart className="w-4 h-4 mr-1 text-pink-500" />
                        Emotional Benefit
                      </h4>
                      <p className="text-sm text-muted-foreground">{content.emotionalBenefit}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm mb-1 flex items-center">
                        <Target className="w-4 h-4 mr-1 text-green-500" />
                        Practical Benefit
                      </h4>
                      <p className="text-sm text-muted-foreground">{content.practicalBenefit}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {content.estimatedTime}
                      </span>
                      <Badge variant="outline">{content.difficulty}</Badge>
                    </div>
                    <Button size="sm">
                      Start <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        {/* Success Stories */}
        <TabsContent value="stories" className="space-y-4">
          {matchedStories.length === 0 ? (
            <Card>
              <CardContent className="pt-6 text-center">
                <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Finding Your Story Matches</h3>
                <p className="text-muted-foreground">
                  We're finding success stories from interpreters with similar backgrounds and challenges.
                </p>
              </CardContent>
            </Card>
          ) : (
            matchedStories.map((story) => (
              <Card
                key={story.id}
                className="cursor-pointer transition-all hover:shadow-md"
                onClick={() => onStorySelect?.(story)}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <Lightbulb className="w-5 h-5 text-yellow-500" />
                        <CardTitle className="text-lg">{story.title}</CardTitle>
                        {story.featured && (
                          <Badge className="bg-yellow-100 text-yellow-800">Featured</Badge>
                        )}
                        {story.verified && (
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        )}
                      </div>
                      <CardDescription className="text-base mb-3">
                        {story.summary}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Transformation Summary */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium text-sm mb-1 text-red-600">Before</h4>
                        <p className="text-sm text-muted-foreground">{story.transformation.before}</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-sm mb-1 text-green-600">After</h4>
                        <p className="text-sm text-muted-foreground">{story.transformation.after}</p>
                      </div>
                    </div>

                    {/* Key Quote */}
                    <blockquote className="italic text-muted-foreground border-l-4 border-primary pl-4">
                      "{story.quotes.inspirational}"
                    </blockquote>

                    {/* Metrics */}
                    {story.metrics && (
                      <div className="flex flex-wrap gap-2">
                        {Object.entries(story.metrics).map(([key, value]) => (
                          <Badge key={key} variant="secondary" className="text-xs">
                            {value}
                          </Badge>
                        ))}
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-1">
                        {story.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <Button size="sm">
                        Read Full Story <ArrowRight className="w-4 h-4 ml-1" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        {/* Hope Progression */}
        <TabsContent value="progression" className="space-y-4">
          {hopeProgressionLevels.map((level) => (
            <Card
              key={level.level}
              className={`${
                level.level === contentProgression.currentLevel
                  ? 'border-primary bg-primary/5'
                  : level.level < contentProgression.currentLevel
                    ? 'border-green-200 bg-green-50'
                    : 'border-gray-200'
              }`}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg flex items-center space-x-2">
                      {level.level < contentProgression.currentLevel ? (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      ) : level.level === contentProgression.currentLevel ? (
                        <Target className="w-5 h-5 text-primary" />
                      ) : (
                        <div className="w-5 h-5 rounded-full border-2 border-gray-300" />
                      )}
                      <span>Level {level.level}: {level.name}</span>
                    </CardTitle>
                    <CardDescription>{level.description}</CardDescription>
                  </div>
                  {level.level === contentProgression.currentLevel && (
                    <Badge>Current Level</Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Emotional Goal</h4>
                    <p className="text-sm text-muted-foreground">{level.emotionalGoal}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-sm mb-2">Content Focus</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {level.content.validation.slice(0, 2).map((item, index) => (
                          <li key={index}>• {item}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm mb-2">Milestones</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {level.milestones.map((milestone, index) => (
                          <li key={index}>• {milestone}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};
