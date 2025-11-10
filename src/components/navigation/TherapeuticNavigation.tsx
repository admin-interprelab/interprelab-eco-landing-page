import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Heart,
  Lightbulb,
  Target,
  Users,
  Phone,
  MessageCircle,
  Shield,
  TrendingUp,
  BookOpen,
  Sparkles,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  TherapeuticNavigationProps,
  JourneyStage,
  EmpathicMenuItem,
  SupportResource
} from '@/types/navigation';
import { JourneyProgressTracker } from './JourneyProgressTracker';

export const TherapeuticNavigation: React.FC<TherapeuticNavigationProps> = ({
  user,
  currentJourneyStage,
  emotionalState,
  supportResourcesEnabled = true
}) => {
  const location = useLocation();
  const [showProgress, setShowProgress] = useState(false);
  const [showDetailedProgress, setShowDetailedProgress] = useState(false);

  // Show progress animation on mount
  useEffect(() => {
    const timer = setTimeout(() => setShowProgress(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const empathicMenuItems: EmpathicMenuItem[] = [
    {
      label: "I'm Struggling",
      href: '/validation',
      description: 'Find understanding and validation for your interpreter challenges',
      emotionalTone: 'validating',
      icon: Heart,
      painPointsAddressed: ['psychological', 'financial', 'isolation'],
      urgencyLevel: 'immediate'
    },
    {
      label: 'Show Me Solutions',
      href: '/solutions',
      description: 'Discover AI-powered tools that address your specific pain points',
      emotionalTone: 'hopeful',
      icon: Lightbulb,
      painPointsAddressed: ['technological', 'professional-development'],
      urgencyLevel: 'important'
    },
    {
      label: 'Success Stories',
      href: '/success-stories',
      description: 'Read about interpreters who transformed their careers',
      emotionalTone: 'empowering',
      icon: TrendingUp,
      painPointsAddressed: ['psychological', 'professional-development'],
      urgencyLevel: 'helpful'
    },
    {
      label: 'Invest in Myself',
      href: '/premium',
      description: 'Professional development that pays for itself',
      emotionalTone: 'empowering',
      icon: Target,
      painPointsAddressed: ['financial', 'professional-development'],
      urgencyLevel: 'important'
    },
    {
      label: 'Get Support',
      href: '/support',
      description: 'Connect with peers and access immediate help',
      emotionalTone: 'supportive',
      icon: Users,
      painPointsAddressed: ['isolation', 'psychological'],
      urgencyLevel: 'immediate'
    }
  ];

  const crisisSupportResources: SupportResource[] = [
    {
      type: 'crisis-support',
      title: 'Crisis Support',
      description: 'Immediate help for overwhelming stress',
      immediateAccess: true,
      href: '/crisis-support',
      icon: Phone
    },
    {
      type: 'peer-community',
      title: 'Peer Support',
      description: 'Connect with other interpreters right now',
      immediateAccess: true,
      href: '/peer-support',
      icon: MessageCircle
    },
    {
      type: 'self-care',
      title: 'Quick Relief',
      description: 'Immediate stress-relief resources',
      immediateAccess: true,
      href: '/self-care',
      icon: Heart
    }
  ];

  const getJourneyStageMessage = (stage: JourneyStage) => {
    const messages = {
      validation: "You're not alone in your struggles. Let's acknowledge what you're going through.",
      'hope-building': "There is hope. Other interpreters have found their way through similar challenges.",
      'solution-exploration': "Discovering tools and resources that can make a real difference.",
      empowerment: "Building confidence and skills for your professional transformation.",
      action: "Taking concrete steps toward a better future in interpretation."
    };
    return messages[stage.stage] || "Your journey toward professional empowerment continues.";
  };

  const getEmotionalToneClass = (tone: EmpathicMenuItem['emotionalTone']) => {
    const toneClasses = {
      validating: 'border-l-4 border-l-red-400 bg-red-50/50 hover:bg-red-100/50',
      hopeful: 'border-l-4 border-l-blue-400 bg-blue-50/50 hover:bg-blue-100/50',
      empowering: 'border-l-4 border-l-green-400 bg-green-50/50 hover:bg-green-100/50',
      supportive: 'border-l-4 border-l-purple-400 bg-purple-50/50 hover:bg-purple-100/50'
    };
    return toneClasses[tone];
  };

  const getUrgencyBadge = (urgency: EmpathicMenuItem['urgencyLevel']) => {
    const urgencyConfig = {
      immediate: { label: 'Immediate Help', variant: 'destructive' as const },
      important: { label: 'Important', variant: 'default' as const },
      helpful: { label: 'Helpful', variant: 'secondary' as const }
    };
    return urgencyConfig[urgency];
  };

  return (
    <div className="bg-gradient-to-br from-background via-background/95 to-primary/5 border-b border-border/50">
      <div className="container mx-auto px-6 py-6">
        {/* Journey Progress Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                Your Professional Journey
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                {getJourneyStageMessage(currentJourneyStage)}
              </p>
            </div>
            <Badge variant="outline" className="text-xs">
              Stage {currentJourneyStage.stage === 'validation' ? '1' :
                     currentJourneyStage.stage === 'hope-building' ? '2' :
                     currentJourneyStage.stage === 'solution-exploration' ? '3' :
                     currentJourneyStage.stage === 'empowerment' ? '4' : '5'} of 5
            </Badge>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Progress</span>
              <span>{currentJourneyStage.progress}% complete</span>
            </div>
            <Progress
              value={showProgress ? currentJourneyStage.progress : 0}
              className="h-2 transition-all duration-1000 ease-out"
            />
          </div>

          {currentJourneyStage.completedMilestones.length > 0 && (
            <div className="mt-3">
              <p className="text-xs text-muted-foreground mb-2">Recent milestones:</p>
              <div className="flex flex-wrap gap-1">
                {currentJourneyStage.completedMilestones.slice(-3).map((milestone, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    ✓ {milestone}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Crisis Support Bar (Always Visible) */}
        {supportResourcesEnabled && (
          <div className="mb-6 p-4 bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-red-800 flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  Need Immediate Support?
                </h3>
                <p className="text-xs text-red-600 mt-1">
                  You're not alone. Help is available right now.
                </p>
              </div>
              <div className="flex gap-2">
                {crisisSupportResources.map((resource) => {
                  const IconComponent = resource.icon;
                  return (
                    <Button
                      key={resource.href}
                      asChild
                      size="sm"
                      variant="outline"
                      className="min-h-[36px] border-red-300 text-red-700 hover:bg-red-100"
                    >
                      <Link to={resource.href}>
                        {IconComponent && <IconComponent className="w-4 h-4 mr-1" />}
                        {resource.title}
                      </Link>
                    </Button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Empathic Navigation Menu */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {empathicMenuItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = location.pathname === item.href;
            const urgencyBadge = getUrgencyBadge(item.urgencyLevel);

            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "group p-4 rounded-lg transition-all duration-200 hover:shadow-md",
                  getEmotionalToneClass(item.emotionalTone),
                  isActive && "ring-2 ring-primary/50"
                )}
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="p-2 bg-white/80 rounded-lg group-hover:bg-white transition-colors">
                      <IconComponent className="w-5 h-5 text-primary" />
                    </div>
                    <Badge
                      variant={urgencyBadge.variant}
                      className="text-xs"
                    >
                      {urgencyBadge.label}
                    </Badge>
                  </div>

                  <div>
                    <h3 className="font-medium text-foreground group-hover:text-primary transition-colors">
                      {item.label}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                      {item.description}
                    </p>
                  </div>

                  {item.painPointsAddressed.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {item.painPointsAddressed.slice(0, 2).map((painPoint) => (
                        <Badge
                          key={painPoint}
                          variant="outline"
                          className="text-xs bg-white/50"
                        >
                          {painPoint.replace('-', ' ')}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </Link>
            );
          })}
        </div>

        {/* Detailed Progress Toggle */}
        <div className="mt-6 flex justify-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowDetailedProgress(!showDetailedProgress)}
            className="text-xs text-muted-foreground hover:text-foreground"
          >
            {showDetailedProgress ? (
              <>
                <ChevronUp className="w-4 h-4 mr-1" />
                Hide Progress Details
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4 mr-1" />
                View Progress Details
              </>
            )}
          </Button>
        </div>

        {/* Detailed Progress Tracker */}
        {showDetailedProgress && (
          <div className="mt-4">
            <JourneyProgressTracker
              currentStage={currentJourneyStage}
              contextualSupport={crisisSupportResources}
              onMilestoneAchieved={(milestone) => {
                console.log('Milestone achieved:', milestone);
                // In real app, this would trigger analytics, notifications, etc.
              }}
            />
          </div>
        )}

        {/* Next Recommended Action */}
        {currentJourneyStage.nextRecommendedAction && (
          <div className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <BookOpen className="w-4 h-4 text-primary" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-foreground">
                  Recommended Next Step
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                  {currentJourneyStage.nextRecommendedAction}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
