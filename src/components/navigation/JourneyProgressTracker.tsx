import React, { useState, useEffect, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Sparkles,
  Trophy,
  Heart,
  Target,
  Users,
  BookOpen,
  TrendingUp,
  CheckCircle,
  Star,
  Gift,
  ArrowRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { JourneyStage, SupportResource } from '@/types/navigation';

interface JourneyMilestone {
  id: string;
  title: string;
  description: string;
  stage: JourneyStage['stage'];
  requiredProgress: number;
  celebrationMessage: string;
  encouragementMessage: string;
  icon: React.ComponentType<{ className?: string }>;
  rewards?: string[];
}

interface JourneyProgressTrackerProps {
  currentStage: JourneyStage;
  onMilestoneAchieved?: (milestone: JourneyMilestone) => void;
  showCelebration?: boolean;
  contextualSupport?: SupportResource[];
}

export const JourneyProgressTracker: React.FC<JourneyProgressTrackerProps> = ({
  currentStage,
  onMilestoneAchieved,
  showCelebration = true,
  contextualSupport = []
}) => {
  const [celebratingMilestone, setCelebratingMilestone] = useState<JourneyMilestone | null>(null);
  const [showProgressAnimation, setShowProgressAnimation] = useState(false);

  const journeyMilestones: JourneyMilestone[] = useMemo(() => [
    {
      id: 'acknowledgment',
      title: 'Acknowledged Your Challenges',
      description: 'You took the brave first step of recognizing your struggles',
      stage: 'validation',
      requiredProgress: 20,
      celebrationMessage: '🎉 You\'ve taken the hardest step - acknowledging your challenges!',
      encouragementMessage: 'This awareness is the foundation of positive change.',
      icon: Heart,
      rewards: ['Access to validation resources', 'Peer support community']
    },
    {
      id: 'hope-discovery',
      title: 'Discovered Hope',
      description: 'You\'ve seen that positive change is possible',
      stage: 'hope-building',
      requiredProgress: 40,
      celebrationMessage: '✨ Hope is growing! You\'re seeing new possibilities.',
      encouragementMessage: 'Other interpreters have walked this path successfully.',
      icon: Star,
      rewards: ['Success story access', 'Mentor matching']
    },
    {
      id: 'solution-exploration',
      title: 'Exploring Solutions',
      description: 'You\'re actively seeking tools and resources',
      stage: 'solution-exploration',
      requiredProgress: 60,
      celebrationMessage: '🚀 You\'re taking action! Solutions are within reach.',
      encouragementMessage: 'Each tool you explore brings you closer to transformation.',
      icon: Target,
      rewards: ['Premium tool trials', 'Personalized recommendations']
    },
    {
      id: 'skill-building',
      title: 'Building Confidence',
      description: 'You\'re developing new skills and confidence',
      stage: 'empowerment',
      requiredProgress: 80,
      celebrationMessage: '💪 Your confidence is growing! You\'re becoming empowered.',
      encouragementMessage: 'You\'re developing the skills for lasting success.',
      icon: TrendingUp,
      rewards: ['Advanced features', 'Leadership opportunities']
    },
    {
      id: 'transformation',
      title: 'Taking Action',
      description: 'You\'re implementing positive changes in your career',
      stage: 'action',
      requiredProgress: 100,
      celebrationMessage: '🏆 Transformation complete! You\'re living your potential.',
      encouragementMessage: 'You\'ve become an inspiration for other interpreters.',
      icon: Trophy,
      rewards: ['Mentor status', 'Success story feature', 'Premium benefits']
    }
  ], []);

  // Animate progress on mount
  useEffect(() => {
    const timer = setTimeout(() => setShowProgressAnimation(true), 300);
    return () => clearTimeout(timer);
  }, []);

  // Check for newly achieved milestones
  useEffect(() => {
    const achievedMilestones = journeyMilestones.filter(
      milestone =>
        currentStage.progress >= milestone.requiredProgress &&
        !currentStage.completedMilestones.includes(milestone.title)
    );

    if (achievedMilestones.length > 0 && showCelebration) {
      const latestMilestone = achievedMilestones[achievedMilestones.length - 1];
      setCelebratingMilestone(latestMilestone);
      onMilestoneAchieved?.(latestMilestone);
    }
  }, [currentStage.progress, currentStage.completedMilestones, showCelebration, onMilestoneAchieved, journeyMilestones]);

  const getStageColor = (stage: JourneyStage['stage']) => {
    const colors = {
      validation: 'text-red-600 bg-red-50',
      'hope-building': 'text-blue-600 bg-blue-50',
      'solution-exploration': 'text-purple-600 bg-purple-50',
      empowerment: 'text-green-600 bg-green-50',
      action: 'text-orange-600 bg-orange-50'
    };
    return colors[stage] || 'text-gray-600 bg-gray-50';
  };

  const getStageMessage = (stage: JourneyStage['stage']) => {
    const messages = {
      validation: 'Finding validation and understanding',
      'hope-building': 'Building hope and seeing possibilities',
      'solution-exploration': 'Discovering tools and resources',
      empowerment: 'Building confidence and skills',
      action: 'Taking concrete steps forward'
    };
    return messages[stage] || 'Continuing your journey';
  };

  const nextMilestone = journeyMilestones.find(
    milestone =>
      milestone.requiredProgress > currentStage.progress &&
      !currentStage.completedMilestones.includes(milestone.title)
  );

  return (
    <div className="space-y-6">
      {/* Celebration Modal */}
      {celebratingMilestone && (
        <Card className="border-2 border-primary bg-gradient-to-br from-primary/5 to-primary/10">
          <CardHeader className="text-center">
            <div className="mx-auto p-3 bg-primary/10 rounded-full w-fit">
              <celebratingMilestone.icon className="w-8 h-8 text-primary" />
            </div>
            <CardTitle className="text-lg">
              {celebratingMilestone.celebrationMessage}
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-muted-foreground">
              {celebratingMilestone.encouragementMessage}
            </p>

            {celebratingMilestone.rewards && celebratingMilestone.rewards.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm font-medium">🎁 You've unlocked:</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {celebratingMilestone.rewards.map((reward, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {reward}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <Button
              onClick={() => setCelebratingMilestone(null)}
              className="mt-4"
            >
              Continue Journey
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Current Stage Overview */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={cn('p-2 rounded-lg', getStageColor(currentStage.stage))}>
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <CardTitle className="text-lg">Your Journey Progress</CardTitle>
                <p className="text-sm text-muted-foreground">
                  {getStageMessage(currentStage.stage)}
                </p>
              </div>
            </div>
            <Badge variant="outline">
              {currentStage.progress}% Complete
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Progress Bar */}
          <div className="space-y-2">
            <Progress
              value={showProgressAnimation ? currentStage.progress : 0}
              className="h-3 transition-all duration-2000 ease-out"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Starting Point</span>
              <span>Transformation Complete</span>
            </div>
          </div>

          {/* Completed Milestones */}
          {currentStage.completedMilestones.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                Recent Achievements
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {currentStage.completedMilestones.slice(-4).map((milestone, index) => (
                  <div key={index} className="flex items-center gap-2 p-2 bg-green-50 rounded-lg">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                    <span className="text-sm text-green-800">{milestone}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Next Milestone */}
          {nextMilestone && (
            <div className="p-3 bg-primary/5 border border-primary/20 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-medium flex items-center gap-2">
                  <Gift className="w-4 h-4 text-primary" />
                  Next Milestone
                </h4>
                <Badge variant="outline" className="text-xs">
                  {nextMilestone.requiredProgress - currentStage.progress}% to go
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-2">
                {nextMilestone.title}: {nextMilestone.description}
              </p>
              <div className="flex items-center gap-2 text-xs text-primary">
                <span>Keep going!</span>
                <ArrowRight className="w-3 h-3" />
              </div>
            </div>
          )}

          {/* Next Recommended Action */}
          {currentStage.nextRecommendedAction && (
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="text-sm font-medium text-blue-800 mb-1">
                Recommended Next Step
              </h4>
              <p className="text-sm text-blue-700">
                {currentStage.nextRecommendedAction}
              </p>
            </div>
          )}

          {/* Contextual Support Resources */}
          {contextualSupport.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium flex items-center gap-2">
                <Users className="w-4 h-4 text-purple-600" />
                Support Available
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {contextualSupport.slice(0, 4).map((resource, index) => {
                  const IconComponent = resource.icon;
                  return (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="justify-start h-auto p-2"
                      asChild
                    >
                      <a href={resource.href}>
                        <div className="flex items-center gap-2">
                          {IconComponent && <IconComponent className="w-4 h-4" />}
                          <div className="text-left">
                            <div className="text-xs font-medium">{resource.title}</div>
                            <div className="text-xs text-muted-foreground">{resource.description}</div>
                          </div>
                        </div>
                      </a>
                    </Button>
                  );
                })}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
