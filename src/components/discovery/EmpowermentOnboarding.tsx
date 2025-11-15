import React, { useState, useEffect } from 'react';
import {
  Heart,
  Target,
  Users,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  Clock,
  Lightbulb,
  MessageCircle,
  TrendingUp,
  Shield,
  Star
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import {
  OnboardingStep,
  OnboardingFlow,
  OnboardingProgress,
  InterpreterProfile
} from '@/types/empathetic-discovery';
import { PainPoint } from '@/types/navigation';

interface EmpowermentOnboardingProps {
  onComplete?: (profile: InterpreterProfile) => void;
  onStepComplete?: (stepId: string, data: any) => void;
  className?: string;
}

export const EmpowermentOnboarding: React.FC<EmpowermentOnboardingProps> = ({
  onComplete,
  onStepComplete,
  className = ''
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [stepData, setStepData] = useState<Record<string, any>>({});
  const [progress, setProgress] = useState<OnboardingProgress>({
    userId: 'temp-user',
    flowId: 'empowerment-onboarding',
    currentStep: 'validation-1',
    completedSteps: [],
    skippedSteps: [],
    personalizedData: {},
    startedAt: new Date(),
    lastActivity: new Date(),
    completed: false
  });

  // Onboarding flow definition
  const onboardingFlow: OnboardingFlow = {
    id: 'empowerment-onboarding',
    name: 'Your Journey to Professional Empowerment',
    description: 'A personalized path that validates your experiences and connects you with the right solutions',
    steps: [
      {
        id: 'validation-1',
        title: 'You Are Not Alone',
        description: 'Let\'s start by acknowledging what you\'re going through',
        type: 'validation',
        emotionalTone: 'validating',
        content: null, // Will be rendered inline
        skipAllowed: false,
        timeEstimate: '2 minutes'
      },
      {
        id: 'assessment-1',
        title: 'Understanding Your Challenges',
        description: 'Help us understand your specific situation',
        type: 'assessment',
        emotionalTone: 'validating',
        content: null,
        skipAllowed: true,
        timeEstimate: '3 minutes'
      },
      {
        id: 'goal-setting-1',
        title: 'Your Vision for Change',
        description: 'What would success look like for you?',
        type: 'goal-setting',
        emotionalTone: 'hopeful',
        content: null,
        skipAllowed: false,
        timeEstimate: '3 minutes'
      },
      {
        id: 'solution-matching-1',
        title: 'Your Personalized Solution Path',
        description: 'Based on your responses, here\'s how we can help',
        type: 'solution-matching',
        emotionalTone: 'empowering',
        content: null,
        skipAllowed: false,
        timeEstimate: '2 minutes'
      },
      {
        id: 'community-connection-1',
        title: 'Connect with Your Tribe',
        description: 'Join interpreters who understand your journey',
        type: 'community-connection',
        emotionalTone: 'hopeful',
        content: null,
        skipAllowed: true,
        timeEstimate: '2 minutes'
      }
    ],
    personalizedPath: true,
    completionRewards: [
      'Personalized dashboard with your solution roadmap',
      'Access to interpreter support community',
      'Free consultation with an AI training specialist',
      'Exclusive resources for your specific challenges'
    ]
  };

  const currentStep = onboardingFlow.steps[currentStepIndex];
  const progressPercentage = ((currentStepIndex + 1) / onboardingFlow.steps.length) * 100;

  // Step content components
  const ValidationStep = () => (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto">
          <Heart className="w-8 h-8 text-pink-600" />
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2">Your Struggles Are Valid</h3>
          <p className="text-muted-foreground">
            The interpretation industry is facing unprecedented challenges. If you're feeling overwhelmed,
            financially stressed, or isolated in your work, you're not alone.
          </p>
        </div>
      </div>

      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="pt-6">
          <h4 className="font-semibold mb-3">What interpreters are telling us:</h4>
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <p className="text-sm">"The pay disparity ($0.10-$4.95/min) makes it impossible to plan financially"</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <p className="text-sm">"Technology failures during sessions create unbearable stress"</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <p className="text-sm">"The emotional toll of difficult cases with no support system"</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <p className="text-sm">"Lack of professional development opportunities under $1000+"</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="text-center">
        <p className="text-muted-foreground mb-4">
          We see you. We understand. And we're here to help you transform these challenges into opportunities.
        </p>
        <div className="flex items-center justify-center space-x-2 text-sm text-green-600">
          <Shield className="w-4 h-4" />
          <span>Your responses are private and secure</span>
        </div>
      </div>
    </div>
  );

  const AssessmentStep = () => {
    const [selectedChallenges, setSelectedChallenges] = useState<string[]>(
      stepData['assessment-1']?.challenges || []
    );
    const [experienceLevel, setExperienceLevel] = useState(
      stepData['assessment-1']?.experienceLevel || ''
    );
    const [specializations, setSpecializations] = useState<string[]>(
      stepData['assessment-1']?.specializations || []
    );
    const [currentSituation, setCurrentSituation] = useState(
      stepData['assessment-1']?.currentSituation || ''
    );

    const challenges = [
      { id: 'financial', label: 'Financial instability and low pay rates', icon: '💰' },
      { id: 'technology', label: 'Technology failures and platform issues', icon: '💻' },
      { id: 'burnout', label: 'Burnout and emotional exhaustion', icon: '😰' },
      { id: 'isolation', label: 'Professional isolation and lack of support', icon: '🏝️' },
      { id: 'development', label: 'Limited professional development opportunities', icon: '📚' },
      { id: 'workload', label: 'Overwhelming cognitive load during sessions', icon: '🧠' }
    ];

    const specializations_list = [
      'Medical', 'Legal', 'Business', 'Educational', 'Mental Health',
      'Court', 'Conference', 'Community', 'Other'
    ];

    useEffect(() => {
      setStepData(prev => ({
        ...prev,
        'assessment-1': {
          challenges: selectedChallenges,
          experienceLevel,
          specializations,
          currentSituation
        }
      }));
    }, [selectedChallenges, experienceLevel, specializations, currentSituation]);

    return (
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
            <Target className="w-8 h-8 text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold">Help Us Understand Your Situation</h3>
          <p className="text-muted-foreground">
            This helps us personalize your experience and connect you with the most relevant solutions.
          </p>
        </div>

        {/* Current Challenges */}
        <div>
          <h4 className="font-semibold mb-3">What challenges are you facing? (Select all that apply)</h4>
          <div className="grid grid-cols-1 gap-3">
            {challenges.map((challenge) => (
              <div key={challenge.id} className="flex items-center space-x-3">
                <Checkbox
                  id={challenge.id}
                  checked={selectedChallenges.includes(challenge.id)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setSelectedChallenges(prev => [...prev, challenge.id]);
                    } else {
                      setSelectedChallenges(prev => prev.filter(c => c !== challenge.id));
                    }
                  }}
                />
                <label htmlFor={challenge.id} className="flex items-center space-x-2 cursor-pointer">
                  <span className="text-lg">{challenge.icon}</span>
                  <span className="text-sm">{challenge.label}</span>
                </label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Experience Level */}
        <div>
          <h4 className="font-semibold mb-3">What's your experience level?</h4>
          <RadioGroup value={experienceLevel} onValueChange={setExperienceLevel}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="new" id="new" />
              <Label htmlFor="new">New to interpretation (0-2 years)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="intermediate" id="intermediate" />
              <Label htmlFor="intermediate">Intermediate (2-5 years)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="experienced" id="experienced" />
              <Label htmlFor="experienced">Experienced (5-10 years)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="veteran" id="veteran" />
              <Label htmlFor="veteran">Veteran (10+ years)</Label>
            </div>
          </RadioGroup>
        </div>

        <Separator />

        {/* Specializations */}
        <div>
          <h4 className="font-semibold mb-3">What are your specializations? (Select all that apply)</h4>
          <div className="grid grid-cols-3 gap-2">
            {specializations_list.map((spec) => (
              <div key={spec} className="flex items-center space-x-2">
                <Checkbox
                  id={spec}
                  checked={specializations.includes(spec)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setSpecializations(prev => [...prev, spec]);
                    } else {
                      setSpecializations(prev => prev.filter(s => s !== spec));
                    }
                  }}
                />
                <Label htmlFor={spec} className="text-sm">{spec}</Label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Current Situation */}
        <div>
          <h4 className="font-semibold mb-3">Tell us about your current situation (optional)</h4>
          <Textarea
            placeholder="Share anything else that would help us understand your challenges and goals..."
            value={currentSituation}
            onChange={(e) => setCurrentSituation(e.target.value)}
            className="min-h-[100px]"
          />
        </div>
      </div>
    );
  };

  const GoalSettingStep = () => {
    const [primaryGoals, setPrimaryGoals] = useState<string[]>(
      stepData['goal-setting-1']?.primaryGoals || []
    );
    const [timeframe, setTimeframe] = useState(
      stepData['goal-setting-1']?.timeframe || ''
    );
    const [successVision, setSuccessVision] = useState(
      stepData['goal-setting-1']?.successVision || ''
    );

    const goals = [
      { id: 'financial', label: 'Improve financial stability and earning potential', icon: '💰' },
      { id: 'skills', label: 'Develop new skills and expertise', icon: '🎯' },
      { id: 'confidence', label: 'Build confidence and reduce session anxiety', icon: '💪' },
      { id: 'technology', label: 'Master technology and AI tools', icon: '🚀' },
      { id: 'network', label: 'Build professional network and community', icon: '🤝' },
      { id: 'balance', label: 'Achieve better work-life balance', icon: '⚖️' }
    ];

    useEffect(() => {
      setStepData(prev => ({
        ...prev,
        'goal-setting-1': {
          primaryGoals,
          timeframe,
          successVision
        }
      }));
    }, [primaryGoals, timeframe, successVision]);

    return (
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <Star className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold">Your Vision for Success</h3>
          <p className="text-muted-foreground">
            Let's focus on what you want to achieve. Your goals will guide our recommendations.
          </p>
        </div>

        {/* Primary Goals */}
        <div>
          <h4 className="font-semibold mb-3">What are your primary goals? (Select up to 3)</h4>
          <div className="grid grid-cols-1 gap-3">
            {goals.map((goal) => (
              <div key={goal.id} className="flex items-center space-x-3">
                <Checkbox
                  id={goal.id}
                  checked={primaryGoals.includes(goal.id)}
                  onCheckedChange={(checked) => {
                    if (checked && primaryGoals.length < 3) {
                      setPrimaryGoals(prev => [...prev, goal.id]);
                    } else if (!checked) {
                      setPrimaryGoals(prev => prev.filter(g => g !== goal.id));
                    }
                  }}
                  disabled={!primaryGoals.includes(goal.id) && primaryGoals.length >= 3}
                />
                <label htmlFor={goal.id} className="flex items-center space-x-2 cursor-pointer">
                  <span className="text-lg">{goal.icon}</span>
                  <span className="text-sm">{goal.label}</span>
                </label>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Selected {primaryGoals.length}/3 goals
          </p>
        </div>

        <Separator />

        {/* Timeframe */}
        <div>
          <h4 className="font-semibold mb-3">What's your timeframe for seeing results?</h4>
          <RadioGroup value={timeframe} onValueChange={setTimeframe}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="immediate" id="immediate" />
              <Label htmlFor="immediate">Immediate (within 1 month)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="short" id="short" />
              <Label htmlFor="short">Short-term (1-3 months)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="medium" id="medium" />
              <Label htmlFor="medium">Medium-term (3-6 months)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="long" id="long" />
              <Label htmlFor="long">Long-term (6+ months)</Label>
            </div>
          </RadioGroup>
        </div>

        <Separator />

        {/* Success Vision */}
        <div>
          <h4 className="font-semibold mb-3">Describe your vision of success</h4>
          <Textarea
            placeholder="What would your ideal professional life look like? How would you feel? What would be different?"
            value={successVision}
            onChange={(e) => setSuccessVision(e.target.value)}
            className="min-h-[100px]"
          />
        </div>
      </div>
    );
  };

  const SolutionMatchingStep = () => {
    const challenges = stepData['assessment-1']?.challenges || [];
    const goals = stepData['goal-setting-1']?.primaryGoals || [];

    const getSolutionRecommendations = () => {
      const recommendations = [];

      if (challenges.includes('technology') || challenges.includes('workload')) {
        recommendations.push({
          tool: 'InterpreCoach',
          reason: 'AI-powered real-time support to reduce cognitive load',
          benefit: 'Reduce session stress by 40-60%',
          url: '/interprecoach'
        });
      }

      if (challenges.includes('development') || goals.includes('skills')) {
        recommendations.push({
          tool: 'InterpreStudy',
          reason: 'Affordable, AI-powered training modules',
          benefit: 'Professional development under $100/month',
          url: '/interprestudy'
        });
      }

      if (challenges.includes('isolation') || goals.includes('network')) {
        recommendations.push({
          tool: 'InterpreLink',
          reason: 'Connect with supportive interpreter community',
          benefit: 'Peer support and professional networking',
          url: '/interprelink'
        });
      }

      if (challenges.includes('financial') || goals.includes('financial')) {
        recommendations.push({
          tool: 'InterpreTrack',
          reason: 'Performance analytics to justify premium rates',
          benefit: 'Data to support 2-3x rate increases',
          url: '/interpretrack'
        });
      }

      return recommendations;
    };

    const recommendations = getSolutionRecommendations();

    return (
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
            <Lightbulb className="w-8 h-8 text-purple-600" />
          </div>
          <h3 className="text-xl font-semibold">Your Personalized Solution Path</h3>
          <p className="text-muted-foreground">
            Based on your challenges and goals, here's how InterpreLab can help transform your career.
          </p>
        </div>

        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
          <CardContent className="pt-6">
            <h4 className="font-semibold mb-3 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
              Your Transformation Roadmap
            </h4>
            <div className="space-y-4">
              {recommendations.map((rec, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-white rounded-lg border">
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <h5 className="font-semibold text-primary">{rec.tool}</h5>
                    <p className="text-sm text-muted-foreground mb-1">{rec.reason}</p>
                    <p className="text-sm font-medium text-green-600">{rec.benefit}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-200 bg-green-50">
          <CardContent className="pt-6">
            <h4 className="font-semibold mb-3 flex items-center text-green-800">
              <CheckCircle className="w-5 h-5 mr-2" />
              What You'll Get After Onboarding
            </h4>
            <ul className="space-y-2 text-sm text-green-700">
              {onboardingFlow.completionRewards.map((reward, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2"></div>
                  <span>{reward}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    );
  };

  const CommunityConnectionStep = () => {
    const [interests, setInterests] = useState<string[]>(
      stepData['community-connection-1']?.interests || []
    );
    const [mentorshipInterest, setMentorshipInterest] = useState(
      stepData['community-connection-1']?.mentorshipInterest || ''
    );

    const communityInterests = [
      { id: 'peer-support', label: 'Peer support groups', icon: '🤝' },
      { id: 'skill-sharing', label: 'Skill sharing sessions', icon: '📚' },
      { id: 'success-stories', label: 'Success story sharing', icon: '⭐' },
      { id: 'crisis-support', label: 'Crisis support network', icon: '🆘' },
      { id: 'professional-dev', label: 'Professional development groups', icon: '🎯' },
      { id: 'social-events', label: 'Social events and networking', icon: '🎉' }
    ];

    useEffect(() => {
      setStepData(prev => ({
        ...prev,
        'community-connection-1': {
          interests,
          mentorshipInterest
        }
      }));
    }, [interests, mentorshipInterest]);

    return (
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto">
            <Users className="w-8 h-8 text-orange-600" />
          </div>
          <h3 className="text-xl font-semibold">Connect with Your Interpreter Community</h3>
          <p className="text-muted-foreground">
            You don't have to face these challenges alone. Join a supportive community of interpreters who understand your journey.
          </p>
        </div>

        {/* Community Interests */}
        <div>
          <h4 className="font-semibold mb-3">What community activities interest you?</h4>
          <div className="grid grid-cols-1 gap-3">
            {communityInterests.map((interest) => (
              <div key={interest.id} className="flex items-center space-x-3">
                <Checkbox
                  id={interest.id}
                  checked={interests.includes(interest.id)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setInterests(prev => [...prev, interest.id]);
                    } else {
                      setInterests(prev => prev.filter(i => i !== interest.id));
                    }
                  }}
                />
                <label htmlFor={interest.id} className="flex items-center space-x-2 cursor-pointer">
                  <span className="text-lg">{interest.icon}</span>
                  <span className="text-sm">{interest.label}</span>
                </label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Mentorship */}
        <div>
          <h4 className="font-semibold mb-3">Are you interested in mentorship?</h4>
          <RadioGroup value={mentorshipInterest} onValueChange={setMentorshipInterest}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="mentor" id="mentor" />
              <Label htmlFor="mentor">I'd like to be a mentor to newer interpreters</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="mentee" id="mentee" />
              <Label htmlFor="mentee">I'd like to find a mentor</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="both" id="both" />
              <Label htmlFor="both">Both - mentor some, learn from others</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="none" id="none" />
              <Label htmlFor="none">Not interested in mentorship right now</Label>
            </div>
          </RadioGroup>
        </div>

        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="pt-6">
            <h4 className="font-semibold mb-3 flex items-center">
              <MessageCircle className="w-5 h-5 mr-2 text-blue-600" />
              Community Benefits
            </h4>
            <ul className="space-y-2 text-sm text-blue-700">
              <li>• Connect with interpreters facing similar challenges</li>
              <li>• Share strategies and resources that work</li>
              <li>• Get emotional support during difficult times</li>
              <li>• Access exclusive community events and workshops</li>
              <li>• Build professional relationships and referral networks</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    );
  };

  const renderStepContent = () => {
    switch (currentStep.id) {
      case 'validation-1':
        return <ValidationStep />;
      case 'assessment-1':
        return <AssessmentStep />;
      case 'goal-setting-1':
        return <GoalSettingStep />;
      case 'solution-matching-1':
        return <SolutionMatchingStep />;
      case 'community-connection-1':
        return <CommunityConnectionStep />;
      default:
        return <div>Step content not found</div>;
    }
  };

  const canProceed = () => {
    switch (currentStep.id) {
      case 'validation-1':
        return true; // Always can proceed from validation
      case 'assessment-1':
        return stepData['assessment-1']?.challenges?.length > 0 && stepData['assessment-1']?.experienceLevel;
      case 'goal-setting-1':
        return stepData['goal-setting-1']?.primaryGoals?.length > 0 && stepData['goal-setting-1']?.timeframe;
      case 'solution-matching-1':
        return true; // Always can proceed from solution matching
      case 'community-connection-1':
        return true; // Always can proceed from community connection
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (currentStepIndex < onboardingFlow.steps.length - 1) {
      onStepComplete?.(currentStep.id, stepData[currentStep.id]);
      setCurrentStepIndex(prev => prev + 1);
      setProgress(prev => ({
        ...prev,
        completedSteps: [...prev.completedSteps, currentStep.id],
        currentStep: onboardingFlow.steps[currentStepIndex + 1].id,
        lastActivity: new Date()
      }));
    } else {
      // Complete onboarding
      const interpreterProfile: InterpreterProfile = {
        id: 'temp-user',
        strugglesIdentified: (stepData['assessment-1']?.challenges || []).map((challenge: string) => ({
          type: challenge as PainPoint['type'],
          severity: 5,
          description: challenge,
          relatedSolutions: []
        })),
        experienceLevel: stepData['assessment-1']?.experienceLevel || 'intermediate',
        specializations: stepData['assessment-1']?.specializations || [],
        currentChallenges: stepData['assessment-1']?.challenges || [],
        successStories: [],
        preferredLearningStyle: 'visual',
        supportPreferences: 'mixed'
      };

      setProgress(prev => ({
        ...prev,
        completed: true,
        completedAt: new Date(),
        completedSteps: [...prev.completedSteps, currentStep.id]
      }));

      onComplete?.(interpreterProfile);
    }
  };

  const handlePrevious = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
      setProgress(prev => ({
        ...prev,
        currentStep: onboardingFlow.steps[currentStepIndex - 1].id,
        lastActivity: new Date()
      }));
    }
  };

  const handleSkip = () => {
    if (currentStep.skipAllowed) {
      setProgress(prev => ({
        ...prev,
        skippedSteps: [...prev.skippedSteps, currentStep.id]
      }));
      handleNext();
    }
  };

  return (
    <div className={`max-w-4xl mx-auto space-y-6 ${className}`}>
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-foreground">
          {onboardingFlow.name}
        </h1>
        <p className="text-muted-foreground">
          {onboardingFlow.description}
        </p>
      </div>

      {/* Progress Bar */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Progress</span>
              <span className="text-sm text-muted-foreground">
                Step {currentStepIndex + 1} of {onboardingFlow.steps.length}
              </span>
            </div>
            <Progress value={progressPercentage} />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Getting Started</span>
              <span>Complete</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Current Step */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl">{currentStep.title}</CardTitle>
              <CardDescription className="text-base mt-1">
                {currentStep.description}
              </CardDescription>
            </div>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>{currentStep.timeEstimate}</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {renderStepContent()}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentStepIndex === 0}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Previous
        </Button>

        <div className="flex items-center space-x-3">
          {currentStep.skipAllowed && (
            <Button variant="ghost" onClick={handleSkip}>
              Skip for now
            </Button>
          )}
          <Button
            onClick={handleNext}
            disabled={!canProceed()}
          >
            {currentStepIndex === onboardingFlow.steps.length - 1 ? 'Complete' : 'Next'}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};
